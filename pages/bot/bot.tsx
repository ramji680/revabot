import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import "../../app/styles/chatbot.css"
import Reva from '../../app/images/Reva.svg';
import Image from 'next/image';
import axios from 'axios';

const Chatbot = () => {
    const [showChatbot, setShowChatbot] = useState(false);
    const [messages, setMessages] = useState([{ text: 'Hi there 👋\nHow can I help you today?', incoming: true }]);
    const [input, setInput] = useState('');
    const chatboxRef = useRef<HTMLUListElement | null>(null);

    useEffect(() => {
        const chatbox = chatboxRef.current;
        if (chatbox) {
            chatbox.scrollTop = chatbox.scrollHeight;
        }
    }, [messages]);

    // const handleSend = () => {
    //     console.log("i am in");
    //     if (!input.trim()) return;
    //     setMessages((prev) => [...prev, { text: input, incoming: false }]);
    //     setInput('');
    //     setTimeout(() => {
    //         setMessages((prev) => [...prev, { text: 'The answer is yes', incoming: true }]);
    //     }, 600);
    // };

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMessage = { text: input, incoming: false };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');

        try {
            const response = await axios.post('/api/chat', { message: input });
            const botMessage = { text: response.data.botMessage, incoming: true };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            setMessages((prev) => [...prev, { text: 'Error getting response.', incoming: true }]);
        }
    };

    return (
        <div className={showChatbot ? 'show-chatbot' : ''}>
            <Head>
                <title>Reva Chatbot</title>
            </Head>
            <button className="chatbot-toggler" onClick={() => setShowChatbot(!showChatbot)}>
                {showChatbot ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="13" viewBox="0 0 22 13" fill="none" name="close">
                        <path d="M11 12.5934L0.40625 1.99969L2 0.405945L2.79688 1.20282L11 9.45282L20 0.45282L21.5938 1.99969L11 12.5934Z" fill="white" />
                    </svg>
                    :

                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="32" viewBox="0 0 29 32" fill="none" name="mode_comment">
                        <path d="M28.673 31.452C28.673 31.452 23.949 29.657 20.127 28.219H4.05401C2.15101 28.219 0.609009 26.639 0.609009 24.691V4.01099C0.609009 2.06399 2.15101 0.483994 4.05401 0.483994H25.226C27.129 0.483994 28.672 2.06399 28.672 4.01099V21.822L28.673 21.821V31.452ZM24.525 19.856C24.195 19.462 23.614 19.417 23.23 19.754C23.2 19.78 20.208 22.35 14.639 22.35C9.14101 22.35 6.10301 19.798 6.04801 19.752C5.66301 19.416 5.08501 19.463 4.75501 19.856C4.42401 20.251 4.47001 20.844 4.85501 21.183C4.99801 21.307 8.40101 24.231 14.639 24.231C20.88 24.231 24.284 21.307 24.425 21.183C24.81 20.844 24.856 20.251 24.525 19.856Z" fill="white" />
                    </svg>
                }
            </button>
            <div className="chatbot">
                <header className="">
                    <div className="header_img">
                        <MdKeyboardArrowLeft className="text-2xl cursor-pointer" onClick={() => setShowChatbot(false)} />
                        <div className="">
                            <Image src={Reva} alt="Reva" />
                            <div className="flex flex-col">
                                <span className="bot-name">Reva</span>
                                <span className="bot-status">Active</span>
                            </div>
                        </div>


                    </div>

                </header>

                <ul className="chatbox" ref={chatboxRef}>
                    {messages.map((msg, i) => (
                        <li key={i} className={`chat ${msg.incoming ? 'incoming' : 'outgoing'}`}>
                            {msg.incoming && <Image src={Reva} alt="Reva" width={40} height={40} />}
                            <p>{msg.text}</p>
                        </li>
                    ))}
                </ul>
                <div className="chat-input">
                    <textarea
                        placeholder="Type a reply..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                    />
                    <span id="send-btn"
                        onClick={handleSend}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none" name="send">
                            <path d="M2.53125 0.875L16.3438 6.875C17.3438 7.3125 17.3438 8.71875 16.3438 9.15625L2.53125 15.1562C1.46875 15.625 0.375 14.4375 0.9375 13.4062L3.125 9.375C3.25 9.125 3.5 8.9375 3.8125 8.90625L9.3125 8.21875C9.40625 8.21875 9.5 8.125 9.5 8C9.5 7.90625 9.40625 7.8125 9.3125 7.8125L3.8125 7.125C3.5 7.0625 3.25 6.90625 3.125 6.65625L0.9375 2.625C0.375 1.59375 1.46875 0.40625 2.53125 0.875Z" fill="#010100" />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
