import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt, genre } = req.query;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt missing' });
  }

  if (prompt.length > 100) {
    return res.status(400).json({ error: 'Prompt too long' });
  }

  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Create a short ${genre} story based on the following topic: ${prompt}. 
    This story should align to principles of Joseph Campbell's "Hero's Journey" structure. 
    Use descriptive, visual words that would make it easy to convert into a children's book.
    Keep the story to no more than 200 words.`,
    max_tokens: 500,
    temperature: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
  });

  const story = completion.data.choices[0].text;

  res.status(200).json({ story });
}
