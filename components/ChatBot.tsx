'use client';

import { useState, useRef, useEffect } from 'react';

export default function ChatBot() {
  // State for toggling the chat window
  const [isOpen, setIsOpen] = useState(false);
  // Chat history state
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Construction Site Assistant online. How can I help you today?' }
  ]);
  // Input field state
  const [input, setInput] = useState('');
  // Loading state for "Typing" indicator
  const [loading, setLoading] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever messages update or window opens
  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isOpen]);

  const sendQuery = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'bot', text: data.text }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: 'Connection error. Please check your network.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Helper to render text with clickable email links
  const renderMessage = (text: string) => {
    const email = "test@gmail.com";
    if (text.includes(email)) {
      const parts = text.split(email);
      return (
        <span>
          {parts[0]}
          <a 
            href={`mailto:${email}`} 
            className="text-blue-600 underline font-bold hover:text-blue-800"
          >
            {email}
          </a>
          {parts[1]}
        </span>
      );
    }
    return text;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* --- Chat Window --- */}
      {isOpen && (
        <div className="w-80 md:w-96 bg-white border border-zinc-300 rounded-xl shadow-2xl flex flex-col overflow-hidden mb-4 animate-in slide-in-from-bottom-4 duration-300 ease-out">
          
          {/* Header */}
          <div className="bg-yellow-500 p-4 font-black text-black border-b-2 border-black flex justify-between items-center tracking-tight">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏗️</span>
              <div className="flex flex-col leading-none">
                <span>SITE ASSISTANT</span>
                <span className="text-[10px] font-mono text-black/60 uppercase">System v2.6.0</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:bg-black/10 p-1 rounded-full transition-colors"
              aria-label="Close Chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
          
          {/* Message Area */}
          <div ref={scrollRef} className="h-96 overflow-y-auto p-4 space-y-4 bg-zinc-50 scrollbar-thin scrollbar-thumb-zinc-300">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-lg text-sm max-w-[85%] shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-zinc-800 text-white rounded-tr-none' 
                    : 'bg-white text-zinc-800 border-l-4 border-yellow-500 rounded-tl-none'
                }`}>
                  {renderMessage(m.text)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-zinc-200 text-zinc-500 text-[10px] px-2 py-1 rounded animate-pulse font-bold uppercase tracking-widest">
                  Analyzing Site Logs...
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-zinc-200 flex gap-2 items-center">
            <input 
              className="flex-1 p-2 bg-zinc-100 border border-zinc-300 rounded outline-none focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600 text-sm transition-all"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendQuery()}
              placeholder="Ask a question..."
            />
            <button 
              onClick={sendQuery} 
              disabled={loading || !input.trim()}
              className="bg-yellow-500 text-black px-4 py-2 rounded font-bold hover:bg-yellow-400 active:scale-95 transition-all text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              SEND
            </button>
          </div>
          
          {/* Footer Branding */}
          <div className="bg-zinc-100 py-1 px-3 text-[9px] text-center text-zinc-400 font-mono uppercase">
            Encrypted Site-to-Office Link
          </div>
        </div>
      )}

      {/* --- Floating Action Button (FAB) --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-90 ${
          isOpen ? 'bg-zinc-900 text-white rotate-180' : 'bg-yellow-500 text-black'
        }`}
      >
        {/* Simple Pulse Effect for visibility when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-yellow-400 animate-ping opacity-25"></span>
        )}
        
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 9h10"/><path d="M7 13h10"/><path d="M7 17h6"/><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        )}
      </button>
    </div>
  );
}