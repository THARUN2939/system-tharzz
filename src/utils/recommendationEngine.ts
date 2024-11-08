import { Item, UserPreference, RecommendationScore } from '../types';

export class RecommendationEngine {
  private calculateItemScore(item: Item, userPreference: UserPreference): number {
    let score = 0;
    
    // Category weight
    const categoryWeight = userPreference.categoryWeights[item.category] || 1;
    score += categoryWeight * 2;
    
    // Liked/Disliked items
    if (userPreference.likedItems.includes(item.id)) {
      score += 3;
    }
    if (userPreference.dislikedItems.includes(item.id)) {
      score -= 5;
    }
    
    // Rating influence
    score += item.rating / 2;
    
    return score;
  }

  getRecommendations(
    items: Item[],
    userPreference: UserPreference,
    limit: number = 3
  ): RecommendationScore[] {
    const scores: RecommendationScore[] = items
      .map(item => ({
        item,
        score: this.calculateItemScore(item, userPreference)
      }))
      .filter(score => !userPreference.dislikedItems.includes(score.item.id))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return scores;
  }
}