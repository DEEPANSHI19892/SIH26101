# SIH26101 — AI-Enabled Learning & Competency Platform

> **Team: Sentinel**  
> **SIH 2026 | Software | Smart Education**

## Problem Statement

**SIH26101**

Develop an AI-enabled learning platform that identifies competency gaps, recommends personalized training through integration with the **iGoT Karmayogi ecosystem**, and generates **quizzes and multiple-choice questions (MCQs)** from uploaded learning materials to strengthen capacity building in India's Official Statistical System.

## Organization

**Ministry of Statistics & Programme Implementation (MoSPI)**

### Department
**Data Informatics & Innovation Division (DIID)**

### Theme
**Smart Education**

---

# 🎯 Our Solution

We propose an **AI-enabled Skill Intelligence and Learning Platform** for government officials working in the Official Statistical System.

The platform will:

- Build an official's competency profile
- Assess existing competencies
- Identify skill gaps
- Recommend personalized learning paths
- Connect recommended learning with the iGoT Karmayogi ecosystem
- Support NSSTA/TPAC training recommendations
- Generate MCQs and quizzes from uploaded learning materials
- Track learning progress and competency improvement
- Provide learner and administrator dashboards

---

# 🔄 Core Workflow

```text
Official Profile
       ↓
Competency Assessment
       ↓
Skill Gap Analysis
       ↓
Personalized Recommendations
       ↓
Learning / Training
       ↓
Upload Learning Material
       ↓
RAG + LLM
       ↓
AI-Generated MCQs / Quiz
       ↓
Assessment Result
       ↓
Progress & Competency Update

```

---

⭐ Key Features

1. Competency Assessment

Assess an official's knowledge and skills across relevant competency areas.

Examples:

Statistical Competencies

Data Analysis

Python / R / SQL

AI / ML

GIS

Digital Governance

Cybersecurity

Leadership & Management


2. Skill-Gap Analysis

Compare the official's current competency level with the required level for their role.

Current Level → Required Level → Skill Gap

The system prioritizes important competency gaps.

3. Personalized Learning Recommendations

Recommend suitable training based on:

Job role

Current competency

Skill gaps

Previous training

Experience

Required competencies


The platform is designed to support learning recommendations from iGoT Karmayogi and relevant NSSTA/TPAC training programmes.

4. AI-Powered Quiz & MCQ Generation

Officials/trainers can upload learning material such as documents or presentations.

The system processes the content and uses RAG + LLM techniques to generate relevant:

MCQs

Quizzes

Answers

Explanations


5. Progress Tracking

Track:

Assessment scores

Quiz performance

Learning progress

Competency improvement

Completed training


6. Admin Dashboard

Provide organization-level insights such as:

Competency distribution

Common skill gaps

Training requirements

Learning progress

Training effectiveness



---

🤖 AI / RAG Approach

For uploaded learning material:

Uploaded Material
       ↓
Text Extraction
       ↓
Text Chunking
       ↓
Embeddings
       ↓
Vector Search
       ↓
Relevant Content Retrieval
       ↓
LLM
       ↓
MCQs / Quiz / Explanations

The retrieved learning content is used as context to improve the relevance of generated questions.


---

🔗 Government Ecosystem Integration

The solution is designed to integrate with existing government learning ecosystems through APIs.

Target ecosystem:

iGoT Karmayogi

NSSTA

TPAC


Prototype Approach

Where official API access/credentials are not available, the prototype will use mock/sample data through an API-ready integration layer.

Official APIs can replace the mock integration when authorized access is provided.


---

🧩 Prototype / MVP

The initial MVP focuses on demonstrating the complete core workflow.

MVP Modules

1. Official Profile


2. Competency Assessment


3. Skill-Gap Analysis


4. Personalized Recommendations


5. Learning Material Upload


6. RAG-based Content Retrieval


7. AI MCQ / Quiz Generation


8. Quiz Evaluation


9. Progress Dashboard


10. Basic Admin Dashboard



MVP Demo Flow

Profile
   ↓
Assessment
   ↓
Skill Gap
   ↓
Recommendation
   ↓
Upload PDF
   ↓
Generate AI Quiz
   ↓
Attempt Quiz
   ↓
View Result & Progress


---

🏗️ System Architecture

                Government Official
                          │
                          ▼
                   React Frontend
                          │
                       REST API
                          │
                          ▼
                    FastAPI Backend
                    /            \
                   /              \
                  ▼                ▼
           PostgreSQL          AI Layer
                                 │
                           ┌─────┴─────┐
                           ▼           ▼
                          RAG         LLM
                           │           │
                           └─────┬─────┘
                                 ▼
                          AI Quiz / MCQ
                                 │
                                 ▼
                           Result & Progress

                                 │
                                 ▼
                         Integration Layer
                          /      |       \
                       iGoT    NSSTA     TPAC


---

🛠️ Technology Stack

Frontend

React.js

HTML

CSS

JavaScript


Backend

Python

Java

FastAPI

REST APIs


Database

PostgreSQL


AI

Large Language Model (LLM)

Embeddings

Retrieval-Augmented Generation (RAG)


Document Processing

PyMuPDF


Vector Search

FAISS


Authentication

JWT

Role-Based Access Control (RBAC)


Development & Deployment

Git

GitHub

VS Code

Vercel / Render or suitable cloud platform



---

📁 Project Structure

SIH26101/
│
├── frontend/          # React frontend
├── backend/           # FastAPI backend
├── ai/                # AI, RAG and recommendation modules
├── database/          # Database schema and SQL
├── docs/              # Architecture and documentation
│
├── .gitignore
└── README.md


---

👥 Team

Team: Sentinel

Role	Responsibility

Team Leader	Coordination, integration & overall system
Frontend	React UI and dashboards
Backend	FastAPI, APIs and database
AI/ML	Competency and recommendation engine
AI/RAG	Document processing, RAG and MCQ generation
Documentation	Documentation, presentation and demo



---

🚧 Current Status

Status: Under Development

Current focus:

Project architecture

MVP development

Frontend and backend setup

Competency assessment

Skill-gap analysis

AI/RAG pipeline

Quiz generation



---

🔮 Future Scope

After the MVP, the platform can be extended with:

Authorized iGoT Karmayogi API integration

NSSTA/TPAC integration

Government SSO

Multilingual learning

Adaptive learning

Advanced competency prediction

More learning formats

Enterprise-scale analytics

Cloud-scale deployment

Enhanced security and auditing



---

📌 Disclaimer

This project is being developed as an SIH 2026 prototype.

Government ecosystem integrations will depend on the availability of authorized APIs, credentials, datasets and access permissions.

No claim of live government-system integration is made unless officially implemented and authorized.
