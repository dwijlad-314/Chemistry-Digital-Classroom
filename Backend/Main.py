
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Digital Chemistry Classroom")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Welcome to Digital Chemistry Classroom!",
        "status": "Backend is running"
    }

@app.get("/api/lessons")
def lessons():
    return {
        "lessons": [
            {"id": 1, "title": "Introduction to Atoms"},
            {"id": 2, "title": "The Periodic Table"},
            {"id": 3, "title": "Chemical Bonding"}
        ]
    }
