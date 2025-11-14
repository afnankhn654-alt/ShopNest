
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../../services/geminiService';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm your ShopNest AI assistant. How can I help you?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const botResponse = await geminiService.getChatbotResponse(input);
        const botMessage: Message = { text: botResponse, sender: 'bot' };
        setMessages(prev => [...prev, botMessage]);
    } catch (error) {
        const errorMessage: Message = { text: "Sorry, I'm having trouble connecting. Please try again later.", sender: 'bot' };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-primary text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-3xl transform hover:scale-110 transition-transform"
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
                <div className={`px-4 py-2 rounded-lg max-w-[80%] ${msg.sender === 'user' ? 'bg-primary-light text-white' : 'bg-gray-200 dark:bg-secondary text-light-text dark:text-dark-text'}`}>
                  {msg.text}
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
