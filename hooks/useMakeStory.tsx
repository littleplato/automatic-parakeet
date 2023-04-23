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

  const makeStory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const prompt = formData.get('prompt')?.toString().trim();
    const type = formData.get('genre')?.toString().trim() || 'heroic';
    if (!prompt) {
      return;
    }
    setStory('');
    setTitle(prompt);
    setGenre(type);
    try {
      setIsLoading(true);
      const response = await fetch('/api/story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          genre: type,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = response.body;
      if (!data) {
        return;
      }
      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        setStory((prev) => prev + chunkValue);
      }
      setId(generateUUID());
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // async function handleSubmit(e: FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  // const formData = new FormData(e.target as HTMLFormElement);
  // const prompt = formData.get('prompt')?.toString().trim();
  // const type = formData.get('genre')?.toString().trim() || 'heroic';

  //   if (prompt) {
  //     setTitle(prompt);
  //     setGenre(type);
  //     try {
  //       setStory('');
  //       setUrl('');
  //       setIsError(false);
  //       setIsLoading(true);
  //       const story = await fetch(
  //         generateURL('/api/story', { prompt, genre: type })
  //       );
  //       const body = await story.json();
  //       const summary = body.story.substring(0, body.story.search(/\./g));
  //       const image = await fetch(
  //         generateURL('/api/image', { prompt: summary })
  //       );
  //       const imageUrl = await image.json();
  //       setStory(body.story);
  //       setUrl(imageUrl.url);
  //       setId(generateUUID());
  //     } catch (error) {
  //       console.error(error);
  //       setIsError(true);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  // }
  return { makeStory, isLoading, story, isError, title, genre, url, id };
}
