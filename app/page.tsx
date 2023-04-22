'use client';

import Image from 'next/image';
import { genres } from '@/utils/consts';
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

export default function IndexPage() {
  const { handleSubmit, isLoading, story, isError, title, genre, url } =
    useMakeStory();
  return (
    <section className="container grid items-center pb-8 pt-6 md:py-10">
      <form onSubmit={handleSubmit}>
        <div className="flex w-full items-center space-x-2 mt-4">
          <Input
            name="prompt"
            type="text"
            placeholder="Enter the title of your story"
            maxLength={100}
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
            {isLoading ? 'Generating...' : 'Make Story'}
          </Button>
        </div>
      </form>
      <div className="my-4" />
      {isLoading && `Generating a ${genre} story: ${title}`}
      {isError && 'Something went wrong. Please try again.'}
      {story && <h2 className="text-lg font-bold">{title}</h2>}
      {story && <h5>{story}</h5>}
      {url && <Image src={url} alt="Story image" width="100" height="100" />}
    </section>
  );
}
