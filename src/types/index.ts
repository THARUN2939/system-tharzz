export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  tags: string[];
  rating: number;
}

export interface UserPreference {
  categoryWeights: Record<string, number>;
  likedItems: string[];
  dislikedItems: string[];
}

export interface RecommendationScore {
  item: Item;
  score: number;
}