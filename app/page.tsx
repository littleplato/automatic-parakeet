'use client';

import { genres } from '@/utils/consts';
import { Loader2 } from 'lucide-react';
import useMakeStory from '@/hooks/useMakeStory';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import StoryCard from '@/components/story-card';

export default function IndexPage() {
  const { makeStory, isLoading, isError, ...story } = useMakeStory();
  return (
    <section className="container grid items-center pb-8 pt-6 md:py-10">
      <form onSubmit={makeStory}>
        <div className="flex w-full items-center space-x-2 mt-4">
          <Input
            name="prompt"
            type="text"
            placeholder="Enter the title of your story"
            maxLength={100}
            autoComplete="off"
          />
          <Select name="genre">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              {genres.map((genre) => (
                <SelectItem key={genre.value} value={genre.value}>
                  {genre.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="min-w-[140px]" type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Generating...' : 'Make Story'}
          </Button>
        </div>
      </form>
      <div className="my-4" />
      {isLoading && `Generating a ${story.genre} story: ${story.title}`}
      {isError && 'Something went wrong. Please try again.'}
      {!isError && story.story && <StoryCard {...story} isNewStory />}
    </section>
  );
}
