"use client"

import React, { useState, useEffect, useRef } from 'react';
import { FC, KeyboardEvent } from "react";
import ReactMarkdown from "react-markdown";


import styles from './ChatArea.module.css';
import {
    createParser,
    ParsedEvent,
    ReconnectInterval,
} from "eventsource-parser";

export default function ChatArea({ handleChat, messages, setMessages }) {

    const messagesEndRef = useRef(null);
    const scrollableContainerRef = useRef(null);
    const [didScrollToBottom, setDidScrollToBottom] = useState(true);
    const [sendButtonPosition, setSendButtonPosition] = useState(null);

    function scrollToBottom() {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    }

    useEffect(() => {
        if (didScrollToBottom) {
            scrollToBottom();
        }
    }, [didScrollToBottom, messages]);

    useEffect(() => {
        const el = scrollableContainerRef.current;
        if (!el) return;

        function handleScroll() {
            const { scrollTop, scrollHeight, clientHeight } = el;
            setDidScrollToBottom(scrollTop + clientHeight >= scrollHeight);
        }

        el.addEventListener("scroll", handleScroll);
        return () => el.removeEventListener("scroll", handleScroll);
    }, []);
    const [selectedText, setSelectedText] = useState('');
    const [showSendButton, setShowSendButton] = useState(false);
    const [inputValue, setInputValue] = useState("");

    // State to store the value of the input field

    const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });


    // This function is triggered when text is selected
    const handleTextSelection = () => {
        const selected = window.getSelection();
        if (selected && selected.toString().trim()) {
            setSelectedText(selected.toString());

            // Get the bounding rectangle of the selection
            const range = selected.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            // Calculate the position of the "Send to Notes" button
            setButtonPosition({
                top: rect.top + window.scrollY + rect.height + 5, // Just below the selection
                left: rect.left + window.scrollX, // Align with the selected text
            });

            setShowSendButton(true);
        } else {
            setShowSendButton(false);
        }
    };

    // Listen for selection changes
    useEffect(() => {
        document.addEventListener('selectionchange', handleTextSelection);
        return () => {
            document.removeEventListener('selectionchange', handleTextSelection);
        };
    }, []);

    // Function to handle sending selected text to notes
    const handleSendToNotes = () => {
        console.log('Sending to notes:', selectedText);
        // You can integrate this with your notes functionality here
        // For example, sending it to a server or storing it locally
        alert('Text sent to notes: ' + selectedText);
        setShowSendButton(false); // Hide the button after sending
    };

    // Function to handle input changes
    const handleInputChange = (event) => {
        setMessages(event.target.value);
    };


    // Function to handle Send button click
    const handleSendClick = async () => {
        console.log('Input value:', messages); // Log the input value


    };


    // Added code for input box
    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            if (e.shiftKey) {
                return;
            } else {
                e.preventDefault();
                onSubmit();
            }
        }
    };

    function onSubmit() {
        let latestMessages = [...messages, { role: "user", content: inputValue }];
        setInputValue("");
        setMessages(latestMessages);
        handleChat(latestMessages);
    }


    console.log('This is the message', messages)


    return (
        <div className={styles.container}>
            <div className={styles.chatContainer}>
                {/* Chat Messages Area */}
                <div className={styles.chatMessages}>
                    {/* <div className={`${styles.message} ${styles.botMessage}`}>
                        Hello! How can I assist you with Data Structures and Algorithms today?
                    </div>

                    <p className="ml-auto w-fit rounded-xl bg-blue-500 p-4 font-medium text-white">
                    </p>
                    <div className={`${styles.message} ${styles.userMessage}`}>
                        I'm curious to know more about sorting algorithms. Can you help?
                    </div>
                    <div className={`${styles.message} ${styles.botMessage}`}>
                        Absolutely! Sorting algorithms are fundamental in DSA. Would you like to learn about a specific one, or should I give an overview?
                    </div>
                    <div className={`${styles.message} ${styles.userMessage}`}>
                        An overview sounds great. Please go ahead.
                    </div> */}

                    <div>
                        {messages.slice(2).map((message, index) =>
                            message.role === "assistant" ? (
                                <div key={index}>

                                    <ReactMarkdown className={[styles.botMessage, styles.message].join(" ")}>
                                        {message.content}
                                    </ReactMarkdown>
                                </div>
                            ) : (
                                <p
                                    key={index} className={[styles.userMessage, styles.message].join(" ")}
                                >
                                    {message.content}
                                </p>
                            )
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                </div>
                {/* Typing Area */}
                <div className={styles.typingArea}>
                    {/* <input
                        type="text"
                        placeholder="Type a message..."
                        className={styles.inputField}
                        value={messages} // Bind the input field value to state
                        onChange={handleInputChange} // Handle input change
                    /> */}
                    <textarea
                        placeholder="Follow up question"
                        className={styles.inputField}
                        value={inputValue}
                        onKeyDown={handleKeyDown}
                        required
                        onChange={(e) => setInputValue(e.target.value)}
                        rows={1}
                    />
                    <button className={styles.sendButton} onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}>Send</button>
                </div>

                {/* Send to Notes Option */}
                {showSendButton && (
                    <div
                        className={styles.sendToNotesContainer}
                        style={{
                            position: 'absolute',
                            top: buttonPosition.top,
                            left: buttonPosition.left,
                        }}
                    >
                        <button
                            className={styles.sendToNotesButton}
                            onClick={handleSendToNotes}
                        >
                            Send to Notes
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
