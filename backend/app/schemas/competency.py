from pydantic import BaseModel
from typing import List, Dict

class CompetencyItem(BaseModel):
    id: str
    name: str
    description: str
    level: str
    score: int
    baseline: int

class CompetencyListResponse(BaseModel):
    success: bool
    competencies: List[CompetencyItem]

class AssessmentQuestionResponse(BaseModel):
    id: int
    competency: str
    question: str
    options: List[str]

class AssessmentSubmitRequest(BaseModel):
    answers: Dict[str, str]

class SkillGap(BaseModel):
    skill: str
    currentScore: int
    targetScore: int
    gap: int
    priority: str