import React, { useState, KeyboardEvent } from 'react';
import { useChatStore } from '../hooks/useChatStore';
import Message from './Message';
import Loader from './Loader';
import axios from 'axios';
import { formatDate } from '../utils/formatDate';

const Chat: React.FC = () => {
  const { messages, addMessage } = useChatStore();
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: 'user' as const, 
      text: input,
      timestamp: formatDate(new Date()),
    };
    addMessage(userMessage);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('/api/chat', { message: input });
      const botMessage = {
        sender: 'bot' as const,
        text: response.data.botMessage || "I'm not sure how to respond to that.",
        timestamp: formatDate(new Date()),
      };
      addMessage(botMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage({
        sender: 'bot',
        text: '❌ Oops! Something went wrong. Please try again.',
        timestamp: formatDate(new Date()),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[80vh] p-4 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex-1 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-gray-400">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
        {loading && <Loader />}
      </div>

      <div className="flex mt-2">
        <input
          className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={input}
          aria-label="Chat input"
          placeholder="Ask Reva anything..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className={`px-4 py-2 text-white rounded-r-lg transition ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default Chat;
