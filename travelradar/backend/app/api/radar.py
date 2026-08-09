from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.core.db import get_db
from app.models.poi import POI
from app.services.safety import calculate_safety_tint
from app.services.llm_service import generate_rationale

router = APIRouter()

@router.get("/radar")
def get_radar_recommendations(
    lat: float = Query(..., description="User Latitude"),
    lng: float = Query(..., description="User Longitude"),
    remaining_budget: float = Query(..., description="Remaining Daily Budget in INR"),
    hour_of_day: int = Query(14, description="Current Hour (0-23)"),
    db: Session = Depends(get_db)
):
    # Construct PostGIS spatial point (Longitude first, Latitude second)
    user_point = func.ST_SetSRID(func.ST_MakePoint(lng, lat), 4326)

    # Query POIs within budget sorted by spatial distance
    results = (
        db.query(
            POI,
            func.ST_Distance(POI.location, user_point).label("distance_meters")
        )
        .filter(POI.estimated_cost <= remaining_budget)
        .order_by("distance_meters")
        .all()
    )

    recommendations = []
    for poi, distance in results:
        safety_color = calculate_safety_tint(
            hour=hour_of_day,
            crowd_density="medium",
            sentiment_score=float(poi.sentiment_score or 0.8)
        )
        rationale = generate_rationale(
            poi_name=poi.name,
            cost=float(poi.estimated_cost),
            remaining_budget=remaining_budget,
            distance_m=distance
        )

        recommendations.append({
            "id": poi.id,
            "name": poi.name,
            "category": poi.category,
            "cost": float(poi.estimated_cost),
            "rating": float(poi.rating) if poi.rating else None,
            "distance_meters": round(distance, 1),
            "safety_tint": safety_color,
            "why_this_place": rationale
        })

    return {
        "user_context": {
            "remaining_budget": remaining_budget,
            "location": {"lat": lat, "lng": lng}
        },
        "recommendations": recommendations
    }