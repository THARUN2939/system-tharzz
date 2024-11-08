import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import { RecommendationList } from './components/RecommendationList';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { UserStats } from './components/UserStats';
import { RecommendationEngine } from './utils/recommendationEngine';
import { items } from './data/items';
import { UserPreference } from './types';
import { debounce } from './utils/helpers';

const recommendationEngine = new RecommendationEngine();
const categories = Array.from(new Set(items.map(item => item.category)));

function App() {
  const [userPreference, setUserPreference] = useState<UserPreference>(() => {
    const saved = localStorage.getItem('userPreference');
    return saved ? JSON.parse(saved) : {
      categoryWeights: {},
      likedItems: [],
      dislikedItems: []
    };
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [recommendedItems, setRecommendedItems] = useState(items);
  const [isLoading, setIsLoading] = useState(false);

  const updateRecommendations = useCallback(
    debounce(async (query: string, category: string | null, preference: UserPreference) => {
      setIsLoading(true);
      
      // Simulate network delay for realistic feel
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredItems = items;
      
      if (query) {
        const queryLower = query.toLowerCase();
        filteredItems = filteredItems.filter(item =>
          item.title.toLowerCase().includes(queryLower) ||
          item.description.toLowerCase().includes(queryLower) ||
          item.tags.some(tag => tag.toLowerCase().includes(queryLower))
        );
      }
      
      if (category) {
        filteredItems = filteredItems.filter(item => item.category === category);
      }
      
      const recommendations = recommendationEngine.getRecommendations(
        filteredItems,
        preference
      );
      
      setRecommendedItems(recommendations.map(r => r.item));
      setIsLoading(false);
    }, 300),
    []
  );

  useEffect(() => {
    localStorage.setItem('userPreference', JSON.stringify(userPreference));
    updateRecommendations(searchQuery, selectedCategory, userPreference);
  }, [userPreference, searchQuery, selectedCategory, updateRecommendations]);

  const handleLike = async (id: string) => {
    setUserPreference(prev => {
      const item = items.find(i => i.id === id);
      if (!item) return prev;

      return {
        ...prev,
        categoryWeights: {
          ...prev.categoryWeights,
          [item.category]: (prev.categoryWeights[item.category] || 1) + 0.5
        },
        likedItems: [...new Set([...prev.likedItems, id])],
        dislikedItems: prev.dislikedItems.filter(i => i !== id)
      };
    });
  };

  const handleDislike = async (id: string) => {
    setUserPreference(prev => {
      const item = items.find(i => i.id === id);
      if (!item) return prev;

      return {
        ...prev,
        categoryWeights: {
          ...prev.categoryWeights,
          [item.category]: Math.max(0, (prev.categoryWeights[item.category] || 1) - 0.5)
        },
        dislikedItems: [...new Set([...prev.dislikedItems, id])],
        likedItems: prev.likedItems.filter(i => i !== id)
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Smart Recommendations</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Discover content tailored just for you. Like or dislike items to improve your recommendations.
          </p>
        </header>

        <div className="mb-8">
          <UserStats userPreference={userPreference} />
        </div>

        <div className="space-y-6 mb-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        <main>
          <RecommendationList
            items={recommendedItems}
            userPreference={userPreference}
            onLike={handleLike}
            onDislike={handleDislike}
            isLoading={isLoading}
          />
        </main>
      </div>
    </div>
  );
}

export default App;