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
    prompt: `Create a short ${genre} story, no more than 120 words, based on the following topic: ${prompt}. 
    The story should align with Joseph Campbell's "Hero's Journey" story structure. 
    Use descriptive, visual words that makes the story easy to be converted to a children's book.`,
    max_tokens: 500,
    temperature: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
  });

  const story = completion.data.choices[0].text;

  res.status(200).json({ story });
}
