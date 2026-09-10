from pydantic import BaseModel, EmailStr

class LoginRequest(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    designation: str | None = None
    department: str | None = None
    jobRole: str | None = None
    experience: str | None = None
    education: str | None = None

    class Config:
        from_attributes = True

class LoginResponse(BaseModel):
    success: bool
    message: str
    token: str
    user: UserResponse