def generate_rationale(poi_name: str, cost: float, remaining_budget: float, distance_m: float) -> str:
    """Generates a contextual 'Why this place' rationale."""
    return (
        f"Fits comfortably inside your remaining daily budget of ₹{remaining_budget:.2f}. "
        f"At only {int(distance_m)}m away, {poi_name} offers high value without overspending."
    )