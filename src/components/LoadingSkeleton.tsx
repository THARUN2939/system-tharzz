import React from 'react';

export function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-lg overflow-hidden">
        <div className="h-48 bg-gray-300" />
        <div className="p-4">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-300 rounded w-full mb-4" />
          <div className="flex items-center justify-between">
            <div className="h-6 bg-gray-300 rounded w-24" />
            <div className="flex gap-2">
              <div className="h-8 w-8 bg-gray-300 rounded-full" />
              <div className="h-8 w-8 bg-gray-300 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}