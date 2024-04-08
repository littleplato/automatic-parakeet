import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Your OpenAI key
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prompt = req.query.prompt;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt missing' });
  }

  const response = await openai.images.generate({
    prompt: `An illustration of the topic: ${prompt}`,
    n: 1,
    size: '1024x1024',
  });
  const url = response.data[0].url;

  res.status(200).json({ url });
}
