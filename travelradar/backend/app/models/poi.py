from sqlalchemy import Column, Integer, String, Numeric
from geoalchemy2 import Geography
from app.core.db import Base

class POI(Base):
    __tablename__ = "pois"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    category = Column(String(100))
    estimated_cost = Column(Numeric(10, 2))
    rating = Column(Numeric(2, 1))
    sentiment_score = Column(Numeric(3, 2), default=0.8)
    location = Column(Geography(geometry_type="POINT", srid=4326))