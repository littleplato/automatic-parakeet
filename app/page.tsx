'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function IndexPage() {
  const [quote, setQuote] = useState('');
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteLoadingError, setQuoteLoadingError] = useState(false);
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const prompt = formData.get('prompt')?.toString().trim();

    if (prompt) {
      try {
        setQuote('');
        setQuoteLoadingError(false);
        setQuoteLoading(true);

        const response = await fetch(
          '/api/storymaker?prompt=' + encodeURIComponent(prompt)
        );
        const body = await response.json();
        setQuote(body.quote);
        // console.log(body.original);
      } catch (error) {
        console.error(error);
        setQuoteLoadingError(true);
      } finally {
        setQuoteLoading(false);
      }
    }
  }
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
          <Button
            className="min-w-[140px]"
            type="submit"
            disabled={quoteLoading}
          >
            Create a story!
          </Button>
        </div>
      </form>
      <div className="my-4" />
      {quoteLoading && 'Loading...'}
      {quoteLoadingError && 'Something went wrong. Please try again.'}
      {quote && <h5>{quote}</h5>}
    </section>
  );
}
