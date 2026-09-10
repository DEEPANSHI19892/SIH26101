import json
import re
from io import BytesIO
from pypdf import PdfReader
from google import genai
from app.config import settings

client = genai.Client(api_key=settings.GEMINI_API_KEY)


def extract_text_from_pdf(file_bytes: bytes) -> str:
    reader = PdfReader(BytesIO(file_bytes))
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text


def generate_mcqs(text: str, num_questions: int = 5) -> list:
    text = text[:15000]

    prompt = f"""You are an expert assessment creator for India's Official Statistical System.

From the following study material, generate exactly {num_questions} multiple choice questions (MCQs).

REQUIREMENTS:
- Each question must have exactly 4 options
- Only one correct answer per question
- Provide a brief explanation for the correct answer

Return ONLY valid JSON in this exact format (no markdown, no extra text):
[
  {{
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "Option A",
    "explanation": "Brief explanation here"
  }}
]

STUDY MATERIAL:
{text}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )
    raw = response.text.strip()

    raw = re.sub(r"^```json\s*", "", raw)
    raw = re.sub(r"^```\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw)

    try:
        return json.loads(raw)
    except json.JSONDecodeError as e:
        print(f"JSON parse error: {e}")
        print(f"Raw: {raw[:500]}")
        return []