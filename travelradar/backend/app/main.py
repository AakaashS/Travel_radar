from fastapi import FastAPI
from app.api import radar
from app.core.config import settings

app = FastAPI(title=settings.PROJECT_NAME, version="1.0.0")

# Register API Router
app.include_router(radar.router, prefix="/api/v1", tags=["Radar"])

@app.get("/")
def read_root():
    return {"status": "TravelRadar API is live!"}