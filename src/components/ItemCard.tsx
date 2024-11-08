import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Item } from '../types';

interface ItemCardProps {
  item: Item;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  isLiked: boolean;
  isDisliked: boolean;
}

export function ItemCard({ item, onLike, onDislike, isLiked, isDisliked }: ItemCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
        <p className="text-gray-600 mb-4">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
            {item.category}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onLike(item.id)}
              className={`p-2 rounded-full ${
                isLiked
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <ThumbsUp size={20} />
            </button>
            <button
              onClick={() => onDislike(item.id)}
              className={`p-2 rounded-full ${
                isDisliked
                  ? 'bg-red-100 text-red-600'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <ThumbsDown size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}