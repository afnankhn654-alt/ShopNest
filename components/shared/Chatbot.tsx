import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../../services/geminiService';
import type { ChatbotResponse } from '../../services/geminiService';
import type { Content } from '@google/genai';
import { NetworkIntelligenceIcon, GoogleIcon, BoltIcon } from '../icons';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  citations?: ChatbotResponse['citations'];
  modelUsed?: ChatbotResponse['modelUsed'];
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm your ShopNest AI assistant. Ask me for product info, order help, or even complex questions!", sender: 'bot', modelUsed: 'fast' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const history: Content[] = messages
        .slice(1) // Exclude the initial greeting
        .map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }],
        }));

    try {
        const botResponse = await geminiService.getChatbotResponse(input, history);
        const botMessage: Message = { 
            text: botResponse.text, 
            sender: 'bot',
            citations: botResponse.citations,
            modelUsed: botResponse.modelUsed,
        };
        setMessages(prev => [...prev, botMessage]);
    } catch (error) {
        const errorMessage: Message = { text: "Sorry, I'm having trouble connecting. Please try again later.", sender: 'bot' };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };
  
  const ModelIndicator: React.FC<{ model?: Message['modelUsed'] }> = ({ model }) => {
    const commonClasses = "w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary";
    switch (model) {
        case 'pro':
            return <div title="Response from Gemini Pro"><NetworkIntelligenceIcon className={commonClasses} /></div>;
        case 'search':
            return <div title="Response from Gemini with Google Search"><GoogleIcon className={commonClasses} /></div>;
        case 'fast':
            return <div title="Fast response from Gemini"><BoltIcon className={commonClasses} /></div>;
        default:
            return null;
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-primary text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-3xl transform hover:scale-110 transition-transform"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? '✕' : '💬'}
      </button>
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-[28rem] bg-light-card dark:bg-dark-card rounded-lg shadow-2xl flex flex-col animate-fade-in">
          <div className="bg-primary text-white p-4 rounded-t-lg">
            <h3 className="font-bold text-lg">ShopNest AI Assistant</h3>
          </div>
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-3`}>
                 <div className={`flex items-start gap-2 max-w-[90%]`}>
                    {msg.sender === 'bot' && <ModelIndicator model={msg.modelUsed} />}
                    <div className={`px-3 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-primary-light text-white' : 'bg-gray-200 dark:bg-secondary text-light-text dark:text-dark-text'}`}>
                        <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
                        {msg.citations && msg.citations.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-gray-300 dark:border-gray-500">
                                <h4 className="text-xs font-bold mb-1">Sources:</h4>
                                <ul className="space-y-1">
                                    {msg.citations.map((citation, i) => (
                                        <li key={i} className="text-xs truncate">
                                            <a href={citation.uri} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600 dark:text-blue-400">
                                                {i + 1}. {citation.title || citation.uri}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
              </div>
            ))}
             {isLoading && (
                <div className="flex justify-start mb-3">
                    <div className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-secondary">
                        <div className="flex items-center space-x-1">
                            <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
	                        <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
	                        <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></span>
                        </div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-grow px-3 py-2 border rounded-l-md dark:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isLoading}
              />
              <button onClick={handleSend} className="bg-primary text-white px-4 rounded-r-md" disabled={isLoading}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
