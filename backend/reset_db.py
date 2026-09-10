from app.database import SessionLocal, engine
from app.models import User, Profile
from app.core.security import hash_password
from sqlalchemy import text

db = SessionLocal()

print("🧹 Cleaning database...")

# Delete in correct order (children first)
db.execute(text("DELETE FROM user_competencies"))
db.execute(text("DELETE FROM profiles"))
db.execute(text("DELETE FROM users"))
db.commit()

# Reset sequences so IDs start from 1
db.execute(text("ALTER SEQUENCE users_id_seq RESTART WITH 1"))
db.execute(text("ALTER SEQUENCE profiles_id_seq RESTART WITH 1"))
db.execute(text("ALTER SEQUENCE user_competencies_id_seq RESTART WITH 1"))
db.commit()

print("✅ Database cleaned")

# Create fresh user
print("👤 Creating user...")
user = User(
    email="officer@mospi.gov.in",
    password_hash=hash_password("demo123"),
    name="Ananya Sharma",
    designation="Deputy Statistical Officer",
    department="Ministry of Statistics & Programme Implementation",
    job_role="Data & Statistical Analysis",
    experience="6 Years",
    education="M.Sc. Statistics",
    role="learner"
)
db.add(user)
db.commit()
db.refresh(user)
print(f"✅ User created: ID={user.id}, Email={user.email}")

# Create profile
profile = Profile(
    user_id=user.id,
    previous_training=[
        "Official Statistics Fundamentals",
        "Data Quality & Validation",
        "Excel for Government Analytics"
    ]
)
db.add(profile)
db.commit()
print("✅ Profile created")

# Create user competencies
competencies = [
    ("python", 40),
    ("sql", 65),
    ("sampling", 90),
    ("statistics", 65),
    ("visualization", 40),
    ("ai_ml", 40),
]

for comp_id, score in competencies:
    db.execute(
        text("INSERT INTO user_competencies (user_id, competency_id, score, baseline) VALUES (:uid, :cid, :s, :s)"),
        {"uid": user.id, "cid": comp_id, "s": score}
    )
db.commit()
print(f"✅ {len(competencies)} competencies added")

# Verify hash works
from app.core.security import verify_password
test = verify_password("demo123", user.password_hash)
print(f"🔐 Password verification test: {'PASS ✅' if test else 'FAIL ❌'}")

db.close()
print("\n🎉 DONE. Now run: uvicorn app.main:app --reload")