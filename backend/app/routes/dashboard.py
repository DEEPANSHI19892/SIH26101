from fastapi import APIRouter, Depends, HTTPException, Header
from typing import Optional
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, UserCompetency, Competency, QuizAttempt, Course
from app.services.competency_service import calculate_level, calculate_gaps, calculate_priority
from app.core.security import decode_token

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


@router.get("")
def get_dashboard(authorization: Optional[str] = Header(None), db: Session = Depends(get_db)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing token")
    payload = decode_token(authorization.replace("Bearer ", ""))
    user_id = payload.get("sub")
    user = db.query(User).filter(User.id == int(user_id)).first() if user_id else None
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")

    # Competencies
    user_comps = db.query(UserCompetency).filter(UserCompetency.user_id == user.id).all()
    competencies = []
    for uc in user_comps:
        comp = db.query(Competency).filter(Competency.id == uc.competency_id).first()
        competencies.append({
            "id": uc.competency_id,
            "name": comp.name if comp else uc.competency_id,
            "description": comp.description if comp else "",
            "level": calculate_level(uc.score),
            "score": uc.score,
            "baseline": uc.baseline,
        })

    # Gaps
    gaps = calculate_gaps(user_comps)

    # Recommendations
    recommendations = []
    for gap in gaps[:3]:
        courses = db.query(Course).filter(Course.skill == gap["skill"]).limit(2).all()
        for c in courses:
            recommendations.append({
                "id": c.id,
                "title": c.title,
                "source": c.source,
                "priority": gap["priority"],
                "duration": c.duration,
                "mode": c.mode,
                "description": c.description,
                "skill": c.skill,
            })

    # Recent activity
    recent_quizzes = db.query(QuizAttempt).filter(QuizAttempt.user_id == user.id).order_by(QuizAttempt.attempted_at.desc()).limit(5).all()
    recent_activity = [
        {
            "type": "quiz",
            "description": f"Completed Quiz #{qa.quiz_id}",
            "score": f"{qa.percentage}%",
            "date": qa.attempted_at.isoformat() if qa.attempted_at else "",
        }
        for qa in recent_quizzes
    ]

    return {
        "success": True,
        "user": {
            "name": user.name,
            "designation": user.designation,
            "department": user.department,
        },
        "competencies": competencies,
        "competencyGaps": gaps,
        "recommendations": recommendations[:5],
        "recentActivity": recent_activity,
    }