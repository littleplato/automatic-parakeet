import React from 'react';
import { useStoryStore } from '@/src/store';
import { Plus } from 'lucide-react';
import { Story } from '@/types/story';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function NewStoryCard(story: Story) {
  const { addStory } = useStoryStore();
  return (
    <Card>
      <CardHeader>
        <div className="flex">
          <div className="grow">
            <CardTitle className="mb-1">{story.title}</CardTitle>
            <CardDescription>{`A ${story.genre} story`}</CardDescription>
          </div>
          <Button onClick={() => addStory(story)} variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Save story
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col-reverse md:flex-row space-x-4 ">
          <div className="md:basis-2/3">{story && <h5>{story.story}</h5>}</div>
          <div className="md:basis-1/3">
            {story.url && (
              <img className="rounded-md" src={story.url} alt="Story image" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
