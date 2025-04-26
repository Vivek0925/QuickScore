import React, { useState } from 'react';
import '../css/Chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');  

        try {
            const response = await fetch('http://localhost:8000/api/chatbot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: input })
            });
            const data = await response.json();

            const botMessage = { sender: 'bot', text: data.answer };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Chatbot API Error:', error);
            setMessages(prev => [...prev, { sender: 'bot', text: "Something went wrong!" }]);
        }

        setInput('');
    };

    return (
        <div className="chatbot-container">
            <div className="chat-header">QuickScore Assistant</div>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            
            <div className="chatbot-input-wrapper">
                <input
                    type="text"
                    placeholder="Ask me about students' performance..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="chatbot-input"
                />
                <button onClick={sendMessage} className="send-button">
                    Send
                </button>
            </div>

        </div>
    );
};

export default Chatbot;
