from sqlalchemy import Column, Integer, String, ForeignKey, JSON, DateTime
from sqlalchemy.sql import func
from app.database import Base

class Competency(Base):
    __tablename__ = "competencies"
    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(String)

class UserCompetency(Base):
    __tablename__ = "user_competencies"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    competency_id = Column(String, ForeignKey("competencies.id"))
    score = Column(Integer, default=40)
    baseline = Column(Integer, default=40)
    target = Column(Integer, default=70)
    level = Column(String, default="Beginner")
    updated_at = Column(DateTime, server_default=func.now())

class AssessmentQuestion(Base):
    __tablename__ = "assessment_questions"
    id = Column(Integer, primary_key=True)
    competency_id = Column(String, ForeignKey("competencies.id"))
    question = Column(String, nullable=False)
    options = Column(JSON, nullable=False)
    correct_answer = Column(String, nullable=False)

class AssessmentAttempt(Base):
    __tablename__ = "assessment_attempts"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    score = Column(Integer)
    attempted_at = Column(DateTime, server_default=func.now())