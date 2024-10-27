import React, { useState, useRef, useEffect } from 'react';
import { Send, Image, Code, Bot, User, BookOpen, Database } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { CodeBlock } from './CodeBlock';
import { ImagePreview } from './ImagePreview';
import { Message, ImageGeneration } from '../types';
import { getChatResponse } from '../services/mistralAI';
import { generateImage } from '../services/pollinationsAI';

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([{
    role: 'assistant',
    content: "Hello! I'm NIDAM, your advanced research assistant. I can help you with:\n\n" +
            "📊 Data analysis\n" +
            "💻 Code implementation\n" +
            "📚 Literature review\n" +
            "🔬 Research methodology\n\n" +
            "How can I assist with your research today?"
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageGeneration[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getChatResponse([...messages, userMessage]);
      const assistantMessage: Message = {
        role: 'assistant',
        content: response
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to get response:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "I apologize, but I encountered an error processing your request. Please try again or contact support if the issue persists."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageGeneration = async () => {
    if (!input.trim() || isLoading) return;
    setIsLoading(true);

    try {
      const image = await generateImage(input);
      setImages(prev => [...prev, image]);
      
      const userMessage: Message = {
        role: 'user',
        content: `Generate image: ${input}`
      };
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: `![Generated Image](${image.url})\n\nImage generated based on your prompt: "${input}"`
      };

      setMessages(prev => [...prev, userMessage, assistantMessage]);
      setInput('');
    } catch (error) {
      console.error('Failed to generate image:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "I apologize, but I encountered an error generating the image. Please try again with a different prompt."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-cyber-dark rounded-lg overflow-hidden cyber-border shadow-cyber">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start space-x-2 ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`flex items-start space-x-2 max-w-[80%] ${
                message.role === 'user'
                  ? 'cyber-gradient text-cyber-light'
                  : 'bg-[#1a1a1a] text-cyber-light border border-cyber-primary'
              } rounded-lg p-3 shadow-cyber`}
            >
              {message.role === 'user' ? (
                <User className="w-6 h-6" />
              ) : (
                <Bot className="w-6 h-6" />
              )}
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <CodeBlock
                          language={match[1]}
                          value={String(children).replace(/\n$/, '')}
                        />
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                    img({ src, alt }) {
                      const image = images.find(img => img.url === src);
                      return image ? (
                        <ImagePreview url={src} prompt={image.prompt} />
                      ) : (
                        <img 
                          src={src} 
                          alt={alt} 
                          className="rounded-lg max-w-full border border-cyber-primary shadow-cyber" 
                        />
                      );
                    }
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-cyber-primary bg-[#1a1a1a] p-4">
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your research question..."
              className="flex-1 bg-cyber-dark text-cyber-light rounded-lg px-4 py-2 
                       focus:outline-none focus:ring-2 focus:ring-cyber-primary
                       border border-cyber-primary"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={handleImageGeneration}
              className="p-2 text-cyber-secondary hover:text-cyber-light transition-colors"
              disabled={isLoading}
              title="Generate visualization"
            >
              <Image className="w-6 h-6" />
            </button>
            <button
              type="button"
              className="p-2 text-cyber-secondary hover:text-cyber-light transition-colors"
              disabled={isLoading}
              title="Generate code"
            >
              <Code className="w-6 h-6" />
            </button>
            <button
              type="submit"
              className="p-2 text-cyber-secondary hover:text-cyber-light transition-colors"
              disabled={isLoading}
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
          <div className="flex justify-center space-x-4 text-xs text-cyber-secondary">
            <div className="flex items-center space-x-1">
              <BookOpen className="w-4 h-4" />
              <span>Literature</span>
            </div>
            <div className="flex items-center space-x-1">
              <Database className="w-4 h-4" />
              <span>Data Analysis</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}