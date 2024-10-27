export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ImageGeneration {
  prompt: string;
  url: string;
  timestamp: number;
}

export interface CodeSnippet {
  language: string;
  code: string;
  timestamp: number;
}