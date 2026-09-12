# Samarth Setu

### AI-Enabled Learning & Competency Platform for India's Official Statistical System

**Smart India Hackathon 2026 | Software | Smart Education**

**Problem Statement ID:** SIH26101  
**Organization:** Ministry of Statistics & Programme Implementation (MoSPI)  
**Department:** Data Informatics & Innovation Division (DIID)

---

## Overview

**Samarth Setu** is an AI-powered skill intelligence and learning platform designed for officials working in India's Official Statistical System.

The platform identifies competency gaps, recommends personalized training aligned with the **iGOT Karmayogi** ecosystem and **NSSTA/TPAC** programmes, and generates **MCQs and quizzes from uploaded learning material** using Retrieval-Augmented Generation (RAG) and Large Language Models.

---

## Problem

Officers in India's Official Statistical System require continuous upskilling in modern statistical, technical, and digital skills. Existing learning platforms offer generic courses with:

- No visibility into an officer's own competency profile
- No structured skill-gap assessment for Official Statistics roles
- No personalized learning pathway aligned with job roles
- Manual, slow, and inconsistent MCQ creation for training
- No dashboard to measure how training improves competency over time

---

## Solution

Samarth Setu addresses these gaps through a single integrated platform:

| Module | What It Does |
|--------|--------------|
| **Competency Profiling** | Builds a structured profile per officer across 4 domains |
| **AI-Based Assessment** | Benchmarks current proficiency against role requirements |
| **Skill-Gap Analysis** | Identifies gaps with HIGH / MEDIUM / LOW priority |
| **Personalized Recommendations** | Recommends courses from iGOT Karmayogi and NSSTA/TPAC |
| **AI MCQ Generation** | Generates context-aware MCQs from uploaded PDFs using RAG + LLM |
| **Progress Tracking** | Tracks competency improvement and training history |
| **Dual Dashboards** | Learner view + MoSPI/DIID admin view |

---

## Workflow

```
Officer Login
     ↓
Competency Profile
     ↓
AI-Based Assessment
     ↓
Skill-Gap Analysis
     ↓
Personalized Recommendations (iGOT / NSSTA / TPAC)
     ↓
Course Enrolment
     ↓
Upload Learning Material (PDF)
     ↓
RAG + Gemini LLM
     ↓
AI-Generated MCQs
     ↓
Quiz + Server-Side Scoring
     ↓
Progress & Dashboard Update
```

---

## Architecture

```
                Government Official
                        │
                        ▼
                React Frontend
                        │
                   REST API / JSON
                        │
                        ▼
                FastAPI Backend
                ┌───────┴────────┐
                ▼                ▼
          PostgreSQL          AI Layer
          (Neon.tech)      (Gemini LLM
                            + RAG
                            + FAISS)
                │                │
                └────────┬───────┘
                         ▼
              AI-Generated MCQs / Quiz
                         │
                         ▼
                Progress Update
                         │
                         ▼
                Integration Layer
              (iGOT | NSSTA | TPAC)
```

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js, Vite, Tailwind CSS, Axios |
| Backend | Python 3.11, FastAPI, SQLAlchemy, Pydantic |
| Database | PostgreSQL (Neon.tech) |
| AI / LLM | Google Gemini API, LangChain, RAG |
| Vector Search | FAISS |
| PDF Processing | PyPDF |
| Authentication | JWT, Bcrypt, Role-Based Access Control |
| Deployment | Vercel (Frontend), Render (Backend), Neon (Database) |
| Version Control | Git, GitHub |

---

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/login` | Officer login (JWT) |
| GET | `/api/auth/me` | Current user |
| GET | `/api/profile` | Retrieve profile |
| PUT | `/api/profile` | Update profile |
| GET | `/api/competencies` | Competency data |
| GET | `/api/skill-gaps/{user_id}` | Skill-gap analysis |
| GET | `/api/assessment` | Assessment questions |
| POST | `/api/assessment/submit` | Submit assessment |
| GET | `/api/recommendations/{user_id}` | Personalized recommendations |
| GET | `/api/courses` | Course catalogue |
| POST | `/api/quiz/generate` | AI MCQ generation from PDF |
| GET | `/api/quiz` | Retrieve quiz |
| POST | `/api/quiz/submit` | Submit quiz (server-side scoring) |
| GET | `/api/progress/{user_id}` | Learning progress |
| GET | `/api/dashboard` | Aggregated dashboard data |
| GET | `/api/health` | Health check |

---

## Project Structure

```
SIH26101_SamarthSetu/
│
├── frontend/                # React + Vite UI
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route pages
│   │   ├── data/            # Fallback mock data
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── core/security.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routes/
│   │   └── services/
│   │       ├── ai_service.py
│   │       └── competency_service.py
│   ├── requirements.txt
│   └── .env.example
│
├── docs/
├── .gitignore
├── LICENSE
└── README.md
```

---

## MVP Delivered

| Feature | Status |
|---------|--------|
| Officer Authentication (JWT) | ✅ |
| Competency Profiling | ✅ |
| Skill-Gap Analysis | ✅ |
| Personalized Recommendations | ✅ |
| iGOT Karmayogi Adapter Layer | ✅ |
| PDF Upload + Processing | ✅ |
| AI MCQ Generation (RAG + Gemini) | ✅ |
| Quiz + Server-Side Scoring | ✅ |
| Learner Dashboard | ✅ |
| Admin Dashboard | ✅ |
| Progress Tracking | ✅ |
| Security (JWT + Bcrypt + RBAC) | ✅ |

---

## Local Setup

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

- Frontend: `http://localhost:5173`  
- Backend API Docs: `http://localhost:8000/docs`

---

## Team — Sentinel

| Role | Responsibility |
|------|----------------|
| Team Leader | Coordination, AI architecture, integration |
| Frontend | React UI, dashboards, user flows |
| Backend | FastAPI, REST APIs, database |
| AI/ML | Competency engine, recommendation logic |
| AI/RAG | PDF processing, MCQ generation, LLM integration |
| Documentation | PPT, demo video, technical documentation |

---

## Future Scope

- Authorized iGOT Karmayogi API integration
- NSSTA / TPAC live integration
- Government SSO (NIC)
- Multilingual learning (Hindi + English)
- Adaptive learning pathways
- Virtual labs for emerging technologies
- AI-powered virtual assistant
- Enterprise-scale analytics and reporting
- Meghraj Cloud deployment
- Enhanced auditing and compliance

---

## Disclaimer

This project is developed as a **Smart India Hackathon 2026 prototype**.

Government ecosystem integrations (iGOT Karmayogi, NSSTA, TPAC) are **API-ready**. Mock/sample data is used where official API access or credentials are not yet available.

No claim of live government-system integration is made unless officially authorized.


**Built for India's Official Statistical System — SIH 2026**
```