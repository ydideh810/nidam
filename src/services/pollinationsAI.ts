import { ImageGeneration } from '../types';

const POLLINATIONS_API_URL = 'https://image.pollinations.ai/prompt';

export async function generateImage(prompt: string): Promise<ImageGeneration> {
  const encodedPrompt = encodeURIComponent(prompt);
  const imageUrl = `${POLLINATIONS_API_URL}/${encodedPrompt}`;

  return {
    prompt,
    url: imageUrl,
    timestamp: Date.now()
  };
}