from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, UserCompetency, QuizAttempt, AssessmentAttempt, Competency

router = APIRouter(prefix="/api/progress", tags=["progress"])


@router.get("/{user_id}")
def get_progress(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Quiz attempts
    quiz_attempts = db.query(QuizAttempt).filter(QuizAttempt.user_id == user_id).all()
    assessment_attempts = db.query(AssessmentAttempt).filter(AssessmentAttempt.user_id == user_id).all()

    # Competency progress
    user_comps = db.query(UserCompetency).filter(UserCompetency.user_id == user_id).all()
    competency_progress = []
    for uc in user_comps:
        comp = db.query(Competency).filter(Competency.id == uc.competency_id).first()
        competency_progress.append({
            "skill": comp.name if comp else uc.competency_id,
            "previousScore": uc.baseline,
            "currentScore": uc.score,
            "improvement": uc.score - uc.baseline,
        })

    return {
        "success": True,
        "progress": {
            "trainingHistory": [
                {
                    "course": f"Quiz #{qa.quiz_id}",
                    "date": qa.attempted_at.isoformat() if qa.attempted_at else "",
                    "score": f"{qa.percentage}%",
                    "status": "Completed",
                }
                for qa in quiz_attempts
            ],
            "competencyProgress": competency_progress,
            "quizAttempts": len(quiz_attempts),
            "assessmentAttempts": len(assessment_attempts),
        },
    }