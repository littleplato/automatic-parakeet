'use client';

import { FormEvent, useState } from 'react';

// import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function IndexPage() {
  const [promptInTyping, setPromptInTyping] = useState('');
  const [promptHistory, setPromptHistory] = useState<string[]>([]);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPromptInTyping('');
    setPromptHistory((prevValue) => [...prevValue, promptInTyping]);
  };
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      {promptHistory.map((p, idx) => (
        <div key={idx}>{p}</div>
      ))}
      <form onSubmit={handleSubmit}>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            onChange={(e) => setPromptInTyping(e.target.value)}
            value={promptInTyping}
            type="text"
            placeholder="Enter your prompt here"
          />
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </section>
  );
}
