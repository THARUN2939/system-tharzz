import React from 'react';
import { ItemCard } from './ItemCard';
import { LoadingSkeleton } from './LoadingSkeleton';
import { Item, UserPreference } from '../types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

interface RecommendationListProps {
  items: Item[];
  userPreference: UserPreference;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  isLoading: boolean;
}

export function RecommendationList({
  items,
  userPreference,
  onLike,
  onDislike,
  isLoading,
}: RecommendationListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <TransitionGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <CSSTransition key={item.id} timeout={300} classNames="item">
          <ItemCard
            item={item}
            onLike={onLike}
            onDislike={onDislike}
            isLiked={userPreference.likedItems.includes(item.id)}
            isDisliked={userPreference.dislikedItems.includes(item.id)}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}