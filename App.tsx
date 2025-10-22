
import React, { useState, useCallback } from 'react';
import { Message, Role } from './types';
import { GREETING_MESSAGE } from './constants';
import { ChatWindow } from './components/ChatWindow';
import { PromptInput } from './components/PromptInput';
import { SuggestedPrompts } from './components/SuggestedPrompts';
import { fetchGeminiResponse } from './services/geminiService';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: Role.ASSISTANT, content: GREETING_MESSAGE, timestamp: new Date() },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendMessage = useCallback(async (userInput: string) => {
    if (!userInput.trim()) return;

    const userMessage: Message = {
      role: Role.USER,
      content: userInput,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const aiResponse = await fetchGeminiResponse(userInput, messages);
      const assistantMessage: Message = {
        role: Role.ASSISTANT,
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Failed to fetch Gemini response:", error);
      const errorMessage: Message = {
        role: Role.ASSISTANT,
        content: "Lo siento, tuve un problema para conectarme. Por favor, inténtalo de nuevo más tarde.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 font-sans">
      <header className="bg-white/80 backdrop-blur-sm shadow-md p-4 border-b border-gray-200">
        <div className="max-w-4xl mx-auto flex items-center space-x-3">
          <span className="text-3xl">💃</span>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Agente Turístico IA de Cali</h1>
            <p className="text-sm text-gray-500">Tu guía inteligente para la Capital de la Salsa</p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          <ChatWindow messages={messages} isLoading={isLoading} />
        </div>
      </main>

      <footer className="bg-white/80 backdrop-blur-sm p-4 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          {messages.length <= 1 && <SuggestedPrompts onPromptClick={handleSendMessage} />}
          <PromptInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </footer>
    </div>
  );
};

export default App;
