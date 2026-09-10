def calculate_level(score: int) -> str:
    if score >= 80:
        return "Advanced"
    if score >= 55:
        return "Intermediate"
    return "Beginner"

def calculate_priority(gap: int) -> str:
    if gap >= 30:
        return "HIGH"
    if gap >= 15:
        return "MEDIUM"
    return "LOW"

def calculate_gaps(user_comps):
    gaps = []
    for uc in user_comps:
        gap = uc.target - uc.score
        gaps.append({
            "skill": uc.competency_id,
            "currentScore": uc.score,
            "targetScore": uc.target,
            "gap": gap,
            "priority": calculate_priority(gap),
        })
    gaps.sort(key=lambda x: x["gap"], reverse=True)
    return gaps