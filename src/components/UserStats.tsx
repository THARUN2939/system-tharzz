import React from 'react';
import { Heart, ThumbsDown, Gauge } from 'lucide-react';
import { UserPreference } from '../types';

interface UserStatsProps {
  userPreference: UserPreference;
}

export function UserStats({ userPreference }: UserStatsProps) {
  const topCategory = Object.entries(userPreference.categoryWeights)
    .sort(([, a], [, b]) => b - a)[0];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="flex items-center gap-3">
        <Heart className="text-rose-500" size={24} />
        <div>
          <p className="text-sm text-gray-600">Liked Items</p>
          <p className="text-xl font-semibold">{userPreference.likedItems.length}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ThumbsDown className="text-gray-500" size={24} />
        <div>
          <p className="text-sm text-gray-600">Disliked Items</p>
          <p className="text-xl font-semibold">{userPreference.dislikedItems.length}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Gauge className="text-blue-500" size={24} />
        <div>
          <p className="text-sm text-gray-600">Top Category</p>
          <p className="text-xl font-semibold">{topCategory?.[0] || 'None'}</p>
        </div>
      </div>
    </div>
  );
}