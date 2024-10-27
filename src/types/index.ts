export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ImageGeneration {
  prompt: string;
  url: string;
  timestamp: number;
}

export interface MistralConfig {
  model: string;
  temperature: number;
  top_p: number;
  max_tokens: number;
  stream: boolean;
  safe_prompt: boolean;
  random_seed?: number;
}

export interface ChatResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: Message;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}