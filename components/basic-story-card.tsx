import React from 'react';
import { Story } from '@/types/story';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function BasicStoryCard(story: Story) {
  return (
    <Card className="flex flex-col-reverse space-y-4 sm:flex-row space-x-4">
      <div className="sm:basis-2/3">
        <CardHeader className="flex">
          <div className="grow">
            <CardTitle className="mb-1">{story.title}</CardTitle>
            <CardDescription>{`A ${story.genre} story`}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>{story && <h5>{story.story}</h5>}</CardContent>
      </div>
      <CardContent className="sm:basis-1/3 items-center justify-center">
        <img className="rounded-md" src={story.url} alt="Story image" />
      </CardContent>
    </Card>
  );
}
