import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../css/Chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const sendMessage = async () => {
        if (!input.trim() || isSending) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);
        setIsSending(true);

        try {
            const response = await fetch('http://localhost:8000/api/v1/chat', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question: input })
            });
            const data = await response.json();

            // Simulate natural typing delay
            await new Promise(resolve => setTimeout(resolve, 500));

            const botMessage = { sender: 'bot', text: data.answer };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Chatbot API Error:', error);
            setMessages(prev => [...prev, { sender: 'bot', text: "Something went wrong!" }]);
        } finally {
            setIsTyping(false);
            setIsSending(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!isSending && input.trim()) {
                sendMessage();
            }
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        // Focus input on component mount
        inputRef.current?.focus();
    }, []);

    return (
        <div className="chatbot-container">
            <div className="chat-header">
                <span className="header-title">QuickScore Assistant</span>
                <div className="header-subtitle">Ask me anything about student performance</div>
            </div>

            <div className="chat-messages" role="log" aria-live="polite">
                {messages.length === 0 && (
                    <div className="welcome-message">
                        👋 Hi! I'm your QuickScore Assistant. How can I help you today?
                    </div>
                )}
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat-message ${msg.sender}`}
                        role={msg.sender === 'bot' ? 'status' : 'user'}
                    >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                    </div>
                ))}
                {isTyping && (
                    <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="chatbot-input-wrapper">
                <textarea
                    ref={inputRef}
                    rows="1"
                    placeholder="Ask me about students' performance... (Shift + Enter for new line)"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="chatbot-input"
                    aria-label="Chat input"
                />
                <button
                    onClick={sendMessage}
                    className="send-button"
                    disabled={!input.trim() || isSending}
                    aria-label="Send message"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
