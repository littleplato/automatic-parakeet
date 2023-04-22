'use client';

import { genres } from '@/utils/consts';
import { Loader2, Plus } from 'lucide-react';
import useMakeStory from '@/hooks/useMakeStory';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Generating...' : 'Make Story'}
          </Button>
        </div>
      </form>
      <div className="my-4" />
      {isLoading && `Generating a ${genre} story: ${title}`}
      {isError && 'Something went wrong. Please try again.'}
      {!isLoading && !isError && story && (
        <Card>
          <CardHeader>
            <div className="flex">
              <div className="grow">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{`A ${genre} story`}</CardDescription>
              </div>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Save story
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col-reverse space-y-4 md:flex-row space-x-4">
              <div className="md:basis-2/3">{story && <h5>{story}</h5>}</div>
              <div className="md:basis-1/3">
                {url && (
                  <img src={url} alt="Story image" width="500" height="500" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
