def calculate_safety_tint(hour: int, crowd_density: str, sentiment_score: float) -> str:
    """Calculates dynamic safety status (GREEN, AMBER, RED) for the location."""
    base_score = float(sentiment_score) * 50

    if 6 <= hour <= 19:
        base_score += 30
    else:
        base_score += 10

    if crowd_density == "high":
        base_score += 20
    elif crowd_density == "medium":
        base_score += 10

    if base_score >= 70:
        return "GREEN"
    elif base_score >= 45:
        return "AMBER"
    else:
        return "RED"