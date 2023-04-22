'use client';

import React from 'react';
import { useStoryStore } from '@/src/store';
import BasicStoryCard from '@/components/basic-story-card';

export default function SavedBooksPage() {
  const stories = useStoryStore((state) => state.stories);
  return (
    <section className="container grid items-center pb-8 pt-6 md:py-10">
      <div className="flex-col space-y-4">
        <h1 className="text-lg font-bold">Your saved books</h1>
        {stories.map((story) => (
          <BasicStoryCard key={story.id} {...story} />
        ))}
      </div>
    </section>
  );
}
