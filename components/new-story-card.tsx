import React, { useState } from 'react';
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
import { useToast } from './ui/use-toast';

export default function NewStoryCard(story: Story) {
  const { addStory } = useStoryStore();
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  const handleAddStory = () => {
    addStory(story);
    setIsSaved(true);
    toast({
      description: `"${story.title}" is saved to your collection.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex">
          <div className="grow">
            <CardTitle className="mb-1">{story.title}</CardTitle>
            <CardDescription>{`A ${story.genre} story`}</CardDescription>
          </div>
          <Button onClick={handleAddStory} variant="outline" disabled={isSaved}>
            {!isSaved && <Plus className="mr-2 h-4 w-4" />}
            {isSaved ? 'Saved!' : 'Save story'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col-reverse md:flex-row space-x-4 ">
          <div className="md:basis-2/3">{story && <h5>{story.story}</h5>}</div>
          <div className="md:basis-1/3">
            {story.url && (
              <img
                className="rounded-md"
                src={story.url}
                alt="Story image"
                width="500"
                height="500"
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
