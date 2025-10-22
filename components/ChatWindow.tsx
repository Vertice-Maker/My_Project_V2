
import React, { useRef, useEffect } from 'react';
import { Message as MessageType } from '../types';
import { Message } from './Message';

interface ChatWindowProps {
  messages: MessageType[];
  isLoading: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div ref={scrollRef} className="space-y-6">
      {messages.map((msg, index) => (
        <Message key={index} message={msg} />
      ))}
      {isLoading && <Message message={{ role: 'assistant', content: '...', timestamp: new Date() }} isLoading={true} />}
    </div>
  );
};
