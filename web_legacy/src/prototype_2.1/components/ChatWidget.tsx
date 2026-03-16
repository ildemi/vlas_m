import React, { useState, useRef, useEffect } from 'react';
import { Chat } from "@google/genai";
import { createChatSession, sendMessageToGemini, ChatMessage } from '../services/geminiService';

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', text: 'Hello Officer. I am the VLAS Safety Assistant. How can I help you with your session today?' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatSessionRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chatSessionRef.current) {
            chatSessionRef.current = createChatSession();
        }
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim() || !chatSessionRef.current) return;

        const userMsg = inputValue;
        setInputValue('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsLoading(true);

        try {
            const responseText = await sendMessageToGemini(chatSessionRef.current, userMsg);
            setMessages(prev => [...prev, { role: 'model', text: responseText }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', text: "Error connecting to safety services." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-105 ${
                    isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary-dark'
                }`}
            >
                <span className="material-symbols-outlined text-background-dark text-3xl font-bold">
                    {isOpen ? 'close' : 'smart_toy'}
                </span>
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)] h-[500px] flex flex-col rounded-2xl bg-surface-dark border border-border-dark shadow-2xl animate-fade-in-up overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-border-dark bg-[#15251d]">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
                            <span className="material-symbols-outlined text-lg">smart_toy</span>
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-sm">VLAS AI Assistant</h3>
                            <p className="text-text-muted text-xs">Powered by Gemini 3.0</p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background-dark/50">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                                    msg.role === 'user' 
                                        ? 'bg-primary text-background-dark rounded-br-none font-medium' 
                                        : 'bg-surface-highlight text-white rounded-bl-none border border-border-dark'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-surface-highlight border border-border-dark rounded-2xl rounded-bl-none px-4 py-3 flex gap-1">
                                    <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                    <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t border-border-dark bg-surface-dark">
                        <div className="relative flex items-center">
                            <input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Ask about safety protocols..."
                                className="w-full bg-background-dark text-white text-sm rounded-full pl-4 pr-12 py-3 border border-border-dark focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-text-muted outline-none transition-all"
                            />
                            <button 
                                onClick={handleSend}
                                disabled={isLoading || !inputValue.trim()}
                                className="absolute right-2 p-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-background-dark transition-colors disabled:opacity-50 disabled:hover:bg-primary/10 disabled:hover:text-primary"
                            >
                                <span className="material-symbols-outlined text-[20px]">send</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatWidget;