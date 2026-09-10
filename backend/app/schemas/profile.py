from pydantic import BaseModel
from typing import List

class ProfileResponse(BaseModel):
    name: str
    designation: str | None = None
    department: str | None = None
    jobRole: str | None = None
    experience: str | None = None
    education: str | None = None
    previousTraining: List[str] = []

class ProfileUpdateRequest(BaseModel):
    name: str | None = None
    designation: str | None = None
    department: str | None = None
    jobRole: str | None = None
    experience: str | None = None
    education: str | None = None
    previousTraining: List[str] | None = None