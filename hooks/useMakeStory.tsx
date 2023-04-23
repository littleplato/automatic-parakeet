import React, { FormEvent, useState } from 'react';
import { generateURL, generateUUID } from '@/utils/utils';

export default function useMakeStory() {
  const [story, setStory] = useState('');
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [id, setId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [url, setUrl] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const prompt = formData.get('prompt')?.toString().trim();
    const type = formData.get('genre')?.toString().trim() || 'heroic';

    if (prompt) {
      setTitle(prompt);
      setGenre(type);
      try {
        setStory('');
        setUrl('');
        setIsError(false);
        setIsLoading(true);
        const story = await fetch(
          generateURL('/api/story', { prompt, genre: type })
        );
        const body = await story.json();
        const summary = body.story.substring(0, body.story.search(/\./g));
        const image = await fetch(
          generateURL('/api/image', { prompt: summary })
        );
        const imageUrl = await image.json();
        setStory(body.story);
        setUrl(imageUrl.url);
        setId(generateUUID());
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
  }
  return { handleSubmit, isLoading, story, isError, title, genre, url, id };
}
