import React from 'react';

type Props = {
  text: string;
  sender: 'user' | 'bot';
};

const Message: React.FC<Props> = ({ text, sender }) => {
  const isUser = sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg text-white ${
          isUser ? 'bg-blue-600' : 'bg-gray-700'
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default Message;
