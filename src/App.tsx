import React from 'react';
import { Chat } from './components/Chat';
import { BrainCircuit, Database, Code2 } from 'lucide-react';

export function App() {
  return (
    <div className="min-h-screen bg-cyber-dark text-cyber-light font-tektur">
      <header className="cyber-gradient border-b border-cyber-primary">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BrainCircuit className="w-8 h-8 text-cyber-light" />
              <h1 className="text-2xl font-bold cyber-glitch">NIDAM</h1>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <Database className="w-5 h-5 text-cyber-secondary" />
                <span className="text-sm">Analysis</span>
              </div>
              <div className="flex items-center space-x-1">
                <Code2 className="w-5 h-5 text-cyber-secondary" />
                <span className="text-sm">Implementation</span>
              </div>
            </div>
          </div>
          <p className="text-cyber-secondary text-sm mt-1">Neural Intelligence for Data Analysis and Methodology</p>
        </div>
      </header>
      <main className="container mx-auto px-4 h-[calc(100vh-6rem)]">
        <Chat />
      </main>
    </div>
  );
}