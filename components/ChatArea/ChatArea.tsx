"use client"

import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import ReactMarkdown from "react-markdown";
import styles from './ChatArea.module.css';

const ChatArea = ({ handleChat, messages, setMessages, setCopiedText }) => {
    const messagesEndRef = useRef(null);
    const scrollableContainerRef = useRef(null);
    const chatAreaRef = useRef(null); // Reference for the chat area
    const [didScrollToBottom, setDidScrollToBottom] = useState(true);
    const [selectedText, setSelectedText] = useState('');
    const [showSendButton, setShowSendButton] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });

    // set placeholder content
    const [initialText, setInitialText] = useState('Ask Something')

    // Scroll to the bottom of the chat on new message
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

    // Handle text selection and display "Send to Notes" button
    const handleTextSelection = () => {
        const selected = window.getSelection();
        if (selected && selected.toString().trim()) {
            const range = selected.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            const chatAreaRect = chatAreaRef.current?.getBoundingClientRect();

            if (
                chatAreaRect &&
                rect.top >= chatAreaRect.top &&
                rect.bottom <= chatAreaRect.bottom &&
                rect.left >= chatAreaRect.left &&
                rect.right <= chatAreaRect.right
            ) {
                setSelectedText(selected.toString());
                setButtonPosition({
                    top: rect.top + window.scrollY + rect.height + 5, // Just below the selection
                    left: rect.left + window.scrollX, // Align with the selected text
                });
                setShowSendButton(true);
            }
        } else {
            setShowSendButton(false);
        }
    };

    useEffect(() => {
        document.addEventListener('selectionchange', handleTextSelection);
        return () => {
            document.removeEventListener('selectionchange', handleTextSelection);
        };
    }, []);

    const handleSendToNotes = () => {
        setCopiedText(selectedText)
        // alert('Text sent to notes: ' + selectedText);
        setShowSendButton(false); // Hide the button after sending
    };

    // Handle textarea input and send message
    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        setInitialText('Follow up question')
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

    return (
        <div ref={chatAreaRef} className={styles.container}>
            <div className={styles.chatContainer}>
                {/* Chat Messages Area */}
                <div className={styles.chatMessages}>
                    <div style={{height: '100%'}}>
                        {/* For showing the temp content */}
                        {messages.length > 0 ? (
                            <>
                                {
                                    messages.map((message, index) =>
                                        message.role === "assistant" ? (
                                            <div key={index}>
                                                <ReactMarkdown className={[styles.botMessage, styles.message, styles.markdown].join(" ")}>
                                                    {message.content}
                                                </ReactMarkdown>
                                            </div>
                                        ) : (
                                            <p key={index} className={[styles.userMessage, styles.message].join(" ")}>
                                                {message.content}
                                            </p>
                                        )
                                    )
                                }
                            </>
                        ) : (
                            <div className={styles.placeholderContainer}>

                                <p className={styles.placeholderText}>
                                    Ask the Questions to start Learning
                                </p>
                            </div>
                        )}
                        {/* {messages.map((message, index) =>
                            message.role === "assistant" ? (
                                <div key={index}>
                                    <ReactMarkdown className={[styles.botMessage, styles.message, styles.markdown].join(" ")}>
                                        {message.content}
                                    </ReactMarkdown>
                                </div>
                            ) : (
                                <p key={index} className={[styles.userMessage, styles.message].join(" ")}>
                                    {message.content}
                                </p>
                            )
                        )} */}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Typing Area */}
                <div className={styles.typingArea}>
                    <textarea
                        placeholder={initialText}
                        className={styles.inputField}
                        value={inputValue}
                        onKeyDown={handleKeyDown}
                        required
                        onChange={(e) => setInputValue(e.target.value)}
                        rows={1}
                    />
                    <button
                        className={styles.sendButton}
                        onClick={(e) => {
                            e.preventDefault();
                            onSubmit();
                        }}
                    >
                        Send
                    </button>
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
};

export default ChatArea;
