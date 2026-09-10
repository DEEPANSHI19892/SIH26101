from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routes import auth, profile, competency, recommendation, quiz, progress, dashboard

app = FastAPI(title="Samarth Setu API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(profile.router)
app.include_router(competency.router)
app.include_router(recommendation.router)
app.include_router(quiz.router)
app.include_router(progress.router)
app.include_router(dashboard.router)

@app.get("/api/health")
def health():
    return {"status": "ok", "service": "samarth-setu"}