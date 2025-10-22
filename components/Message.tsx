
import React from 'react';
import { Message as MessageType, Role } from '../types';
import { MarkdownContent } from './MarkdownContent';

interface MessageProps {
  message: MessageType;
  isLoading?: boolean;
}

const UserAvatar: React.FC = () => (
  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
    TÚ
  </div>
);

const AssistantAvatar: React.FC = () => (
  <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-lg flex-shrink-0">
    💃
  </div>
);

const TypingIndicator: React.FC = () => (
    <div className="flex items-center space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
    </div>
);


export const Message: React.FC<MessageProps> = ({ message, isLoading = false }) => {
  const isUser = message.role === Role.USER;

  const messageClasses = isUser
    ? 'bg-indigo-500 text-white rounded-l-2xl rounded-tr-2xl'
    : 'bg-white text-gray-800 rounded-r-2xl rounded-tl-2xl shadow-sm border border-gray-200';

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {isUser ? <UserAvatar /> : <AssistantAvatar />}
      <div className={`p-4 max-w-lg ${messageClasses}`}>
        {isLoading ? (
            <TypingIndicator />
        ) : (
          isUser 
            ? <p className="whitespace-pre-wrap">{message.content}</p> 
            : <MarkdownContent content={message.content} />
        )}
      </div>
    </div>
  );
};
