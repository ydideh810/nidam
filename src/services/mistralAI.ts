import { Message, MistralConfig, ChatResponse } from '../types';

const MISTRAL_API_KEY = import.meta.env.VITE_MISTRAL_API_KEY;
const API_URL = 'https://api.mistral.ai/v1/chat/completions';

const defaultConfig: MistralConfig = {
  model: 'pixtral-12b-2409',
  temperature: 0.3,
  top_p: 1,
  max_tokens: 1000,
  stream: false,
  safe_prompt: false
};

export async function getChatResponse(messages: Message[]): Promise<string> {
  if (!MISTRAL_API_KEY) {
    throw new Error('Mistral API key is not configured');
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MISTRAL_API_KEY}`
      },
      body: JSON.stringify({
        ...defaultConfig,
        messages: messages.map(({ role, content }) => ({ role, content }))
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Mistral AI API Error: ${JSON.stringify(errorData)}`);
    }

    const data: ChatResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Mistral AI API Error:', error);
    throw error;
  }
}