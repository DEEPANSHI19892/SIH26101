from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Course, UserCompetency
from app.services.competency_service import calculate_priority

router = APIRouter(prefix="/api", tags=["recommendation"])


@router.get("/courses")
def get_courses(db: Session = Depends(get_db)):
    courses = db.query(Course).all()
    return {
        "success": True,
        "courses": [
            {
                "id": c.id,
                "title": c.title,
                "description": c.description,
                "skill": c.skill,
                "source": c.source,
                "sourceType": c.source_type,
                "duration": c.duration,
                "mode": c.mode,
                "level": c.level,
            } for c in courses
        ]
    }


@router.get("/courses/{course_id}")
def get_course(course_id: int, db: Session = Depends(get_db)):
    c = db.query(Course).filter(Course.id == course_id).first()
    if not c:
        return {"success": False, "message": "Course not found"}
    return {"success": True, "course": {
        "id": c.id, "title": c.title, "description": c.description,
        "skill": c.skill, "source": c.source, "sourceType": c.source_type,
        "duration": c.duration, "mode": c.mode, "level": c.level,
    }}


@router.get("/recommendations/{user_id}")
def get_recommendations(user_id: int, db: Session = Depends(get_db)):
    user_comps = db.query(UserCompetency).filter(UserCompetency.user_id == user_id).all()
    
    recs = []
    for uc in user_comps:
        gap = uc.target - uc.score
        if gap <= 0:
            continue
        priority = calculate_priority(gap)
        matching = db.query(Course).filter(Course.skill == uc.competency_id).all()
        for c in matching:
            recs.append({
                "id": c.id,
                "title": c.title,
                "source": c.source,
                "priority": priority,
                "duration": c.duration,
                "mode": c.mode,
                "description": c.description,
                "skill": c.skill,
            })
    
    priority_order = {"HIGH": 0, "MEDIUM": 1, "LOW": 2}
    recs.sort(key=lambda x: priority_order.get(x["priority"], 3))
    
    return {"success": True, "recommendations": recs[:5]}