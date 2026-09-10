from fastapi import APIRouter, Depends, HTTPException, Header, UploadFile, File, Form
from typing import Optional
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Quiz, QuizQuestion, QuizAttempt
from app.services.ai_service import extract_text_from_pdf, generate_mcqs
from app.core.security import decode_token

router = APIRouter(prefix="/api/quiz", tags=["quiz"])


def get_user(authorization, db):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing token")
    payload = decode_token(authorization.replace("Bearer ", ""))
    user_id = payload.get("sub")
    user = db.query(User).filter(User.id == int(user_id)).first() if user_id else None
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    return user


@router.post("/generate")
async def generate_quiz(
    file: UploadFile = File(...),
    skill: str = Form("General"),
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    user = get_user(authorization, db)
    
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files allowed")
    
    file_bytes = await file.read()
    text = extract_text_from_pdf(file_bytes)
    
    if len(text.strip()) < 100:
        raise HTTPException(status_code=400, detail="PDF has too little text")
    
    mcqs = generate_mcqs(text, num_questions=5)
    if not mcqs:
        raise HTTPException(status_code=500, detail="AI failed to generate questions")
    
    # Store quiz
    quiz = Quiz(
        user_id=user.id, skill=skill,
        source="pdf_generated", document_name=file.filename
    )
    db.add(quiz)
    db.commit()
    db.refresh(quiz)
    
    # Store questions
    for q in mcqs:
        db.add(QuizQuestion(
            quiz_id=quiz.id,
            question=q["question"],
            options=q["options"],
            correct_answer=q["correctAnswer"],
            explanation=q.get("explanation", "")
        ))
    db.commit()
    
    # Fetch stored (to get IDs)
    stored = db.query(QuizQuestion).filter(QuizQuestion.quiz_id == quiz.id).all()
    
    return {
        "success": True,
        "quizId": quiz.id,
        "questionsGenerated": len(stored),
        "questions": [
            {
                "id": q.id,
                "skill": quiz.skill,
                "question": q.question,
                "options": q.options,
            } for q in stored
        ]
    }


@router.get("")
def get_quiz(quiz_id: Optional[int] = None, db: Session = Depends(get_db)):
    query = db.query(QuizQuestion)
    if quiz_id:
        query = query.filter(QuizQuestion.quiz_id == quiz_id)
    questions = query.limit(10).all()
    return {
        "success": True,
        "questions": [
            {
                "id": q.id,
                "question": q.question,
                "options": q.options,
            } for q in questions
        ]
    }


@router.post("/submit")
def submit_quiz(
    payload: dict,
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    user = get_user(authorization, db)
    quiz_id = payload.get("quizId")
    answers = payload.get("answers", {})
    
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    correct = 0
    detailed = []
    for qid_str, user_ans in answers.items():
        q = db.query(QuizQuestion).filter(QuizQuestion.id == int(qid_str)).first()
        if not q:
            continue
        is_correct = q.correct_answer == user_ans
        if is_correct:
            correct += 1
        detailed.append({
            "questionId": q.id,
            "question": q.question,
            "yourAnswer": user_ans,
            "correctAnswer": q.correct_answer,
            "isCorrect": is_correct,
            "explanation": q.explanation,
        })
    
    total = len(detailed)
    wrong = total - correct
    percentage = int((correct / total) * 100) if total > 0 else 0
    
    attempt = QuizAttempt(
        quiz_id=quiz.id, user_id=user.id,
        score=correct, total_questions=total,
        correct_answers=correct, wrong_answers=wrong,
        percentage=percentage,
    )
    db.add(attempt)
    db.commit()
    
    return {
        "success": True,
        "score": correct,
        "totalQuestions": total,
        "correctAnswers": correct,
        "wrongAnswers": wrong,
        "percentage": percentage,
        "skill": quiz.skill,
        "detailedResults": detailed,
    }