from fastapi import APIRouter, Depends, HTTPException, Header
from typing import Optional
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Competency, UserCompetency, AssessmentQuestion, AssessmentAttempt
from app.schemas.competency import (
    CompetencyItem, CompetencyListResponse, AssessmentQuestionResponse,
    AssessmentSubmitRequest, SkillGap
)
from app.services.competency_service import calculate_level, calculate_gaps
from app.core.security import decode_token

router = APIRouter(prefix="/api", tags=["competency"])


def get_user(authorization, db):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing token")
    payload = decode_token(authorization.replace("Bearer ", ""))
    user_id = payload.get("sub")
    user = db.query(User).filter(User.id == int(user_id)).first() if user_id else None
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    return user


@router.get("/competencies", response_model=CompetencyListResponse)
def get_competencies(authorization: Optional[str] = Header(None), db: Session = Depends(get_db)):
    user = get_user(authorization, db)
    user_comps = db.query(UserCompetency).filter(UserCompetency.user_id == user.id).all()
    comps = []
    for uc in user_comps:
        comp = db.query(Competency).filter(Competency.id == uc.competency_id).first()
        comps.append(CompetencyItem(
            id=uc.competency_id,
            name=comp.name if comp else uc.competency_id,
            description=comp.description if comp else "",
            level=calculate_level(uc.score),
            score=uc.score,
            baseline=uc.baseline,
        ))
    return CompetencyListResponse(success=True, competencies=comps)


@router.get("/skill-gaps/{user_id}")
def get_skill_gaps(user_id: int, db: Session = Depends(get_db)):
    user_comps = db.query(UserCompetency).filter(UserCompetency.user_id == user_id).all()
    return {"success": True, "gaps": calculate_gaps(user_comps)}


@router.get("/assessment")
def get_assessment(db: Session = Depends(get_db)):
    questions = db.query(AssessmentQuestion).limit(20).all()
    return {
        "success": True,
        "questions": [
            AssessmentQuestionResponse(
                id=q.id, competency=q.competency_id,
                question=q.question, options=q.options
            ) for q in questions
        ]
    }


@router.post("/assessment/submit")
def submit_assessment(payload: AssessmentSubmitRequest, authorization: Optional[str] = Header(None), db: Session = Depends(get_db)):
    user = get_user(authorization, db)
    
    correct = 0
    total = len(payload.answers)
    
    for qid_str, ans in payload.answers.items():
        q = db.query(AssessmentQuestion).filter(AssessmentQuestion.id == int(qid_str)).first()
        if q and q.correct_answer == ans:
            correct += 1
    
    score = int((correct / total) * 100) if total > 0 else 0
    
    attempt = AssessmentAttempt(user_id=user.id, score=score)
    db.add(attempt)
    db.commit()
    
    return {
        "success": True,
        "score": score,
        "correctAnswers": correct,
        "totalQuestions": total,
        "level": calculate_level(score),
    }