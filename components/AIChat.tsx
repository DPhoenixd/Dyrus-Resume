import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface AIChatProps {
  ownerName: string;
  skills: string;
}

export const AIChat: React.FC<AIChatProps> = ({ ownerName, skills }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Hi, I'm ${ownerName}'s AI assistant. Ask me anything about his professional background!` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        throw new Error("API Key not configured");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const systemInstruction = `You are a helpful AI portfolio assistant for ${ownerName}. 
      Here is a summary of ${ownerName}'s skills and experience: ${skills}. 
      Your goal is to impress potential employers or clients. Keep answers concise, professional, yet creative.`;

      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: { systemInstruction }
      });

      // Ideally we replay history here, but for this demo we'll just send the latest message 
      // assuming the system instruction carries the weight of the persona.
      // For a persistent chat we'd build the history array.
      
      const result = await chat.sendMessage({ message: userMsg });
      const text = result.text;

      setMessages(prev => [...prev, { role: 'model', text: text || "I didn't have a response." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm currently offline (API Key missing or error). Please contact Dyrus directly!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
      <div className="p-4 border-b border-zinc-800 flex items-center gap-2 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <Sparkles className="w-5 h-5 text-blue-400" />
        <h3 className="font-semibold text-zinc-100">Dyrus AI Assistant</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-zinc-700' : 'bg-blue-600'}`}>
              {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>
            <div className={`p-3 rounded-2xl text-sm max-w-[80%] ${
              msg.role === 'user' 
                ? 'bg-zinc-800 text-zinc-200 rounded-tr-none' 
                : 'bg-blue-600/20 text-blue-100 border border-blue-500/30 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-zinc-500 text-xs ml-11">
            <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-75"></span>
            <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-150"></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-zinc-800 bg-zinc-900/80">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about my experience..."
            className="w-full bg-zinc-950 border border-zinc-700 rounded-xl py-3 pl-4 pr-12 text-sm text-zinc-200 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600"
          />
          <button 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="absolute right-2 top-2 p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-lg transition-colors disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};