from sqlalchemy import Column, Integer, String
from app.database import Base

class Course(Base):
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(String)
    skill = Column(String)
    source = Column(String)
    source_type = Column(String)
    duration = Column(String)
    mode = Column(String)
    level = Column(String)