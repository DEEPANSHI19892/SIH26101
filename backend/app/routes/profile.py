from fastapi import APIRouter, Depends, HTTPException, Header
from typing import Optional
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Profile
from app.schemas.profile import ProfileResponse, ProfileUpdateRequest
from app.core.security import decode_token

router = APIRouter(prefix="/api/profile", tags=["profile"])


def get_current_user(authorization: Optional[str], db: Session):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing token")
    token = authorization.replace("Bearer ", "")
    payload = decode_token(token)
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.get("", response_model=ProfileResponse)
def get_profile(authorization: Optional[str] = Header(None), db: Session = Depends(get_db)):
    user = get_current_user(authorization, db)
    profile = db.query(Profile).filter(Profile.user_id == user.id).first()
    return ProfileResponse(
        name=user.name,
        designation=user.designation,
        department=user.department,
        jobRole=user.job_role,
        experience=user.experience,
        education=user.education,
        previousTraining=profile.previous_training if profile else [],
    )


@router.put("", response_model=ProfileResponse)
def update_profile(payload: ProfileUpdateRequest, authorization: Optional[str] = Header(None), db: Session = Depends(get_db)):
    user = get_current_user(authorization, db)
    profile = db.query(Profile).filter(Profile.user_id == user.id).first()

    if payload.name is not None:
        user.name = payload.name
    if payload.designation is not None:
        user.designation = payload.designation
    if payload.department is not None:
        user.department = payload.department
    if payload.jobRole is not None:
        user.job_role = payload.jobRole
    if payload.experience is not None:
        user.experience = payload.experience
    if payload.education is not None:
        user.education = payload.education
    if payload.previousTraining is not None and profile:
        profile.previous_training = payload.previousTraining

    db.commit()
    db.refresh(user)
    if profile:
        db.refresh(profile)

    return ProfileResponse(
        name=user.name,
        designation=user.designation,
        department=user.department,
        jobRole=user.job_role,
        experience=user.experience,
        education=user.education,
        previousTraining=profile.previous_training if profile else [],
    )