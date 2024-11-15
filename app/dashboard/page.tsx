"use client"

import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/Header/Header";
import Leftsidebar from "@/components/LeftSideBar/Leftsidebar";
import ChatArea from "@/components/ChatArea/ChatArea";
import PdfArea from "@/components/PdfArea/PdfArea";
import { useEffect, useState } from "react";

import {
    createParser,
    ParsedEvent,
    ReconnectInterval,
} from "eventsource-parser";

export default function Dashboard() {

    const [isSwapped, setIsSwapped] = useState(false);

    const [selectedNoteContent, setSelectedNoteContent] = useState(""); // Add state for selected note content



    const [notes, setNotes] = useState([]);

    // useEffect(() => {
    //     const savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];
    //     setNotes(savedNotes);
    // }, []);

    // Function to load notes from localStorage
    const loadNotesFromStorage = () => {
        const savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];
        setNotes(savedNotes);
    };

    useEffect(() => {
        // Initial load of notes
        loadNotesFromStorage();

        // Set up a polling interval to check for changes in localStorage
        const intervalId = setInterval(() => {
            loadNotesFromStorage();
        }, 1000); // Check every second (adjust as needed)

        // Clear interval when component unmounts
        return () => clearInterval(intervalId);
    }, []);



    // State to store the value of the input field
    const [messages, setMessages] = useState<{ role: string; content: string }[]>(
        []
    );


    const [copiedText, setCopiedText] = useState('')

    const handleChat = async (messages) => {
        console.log('I got called up bro')
        const chatRes = await fetch("/api/getChat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ messages }),
        });

        if (!chatRes.ok) {
            throw new Error(chatRes.statusText);
        }

        // This data is a ReadableStream
        const data = chatRes.body;
        console.log('This is the readable data', data)
        if (!data) {
            return;
        }
        let fullAnswer = "";

        const onParse = (event: ParsedEvent | ReconnectInterval) => {
            if (event.type === "event") {
                const data = event.data;
                try {
                    const text = JSON.parse(data).text ?? "";
                    fullAnswer += text;
                    // Update messages with each chunk
                    setMessages((prev) => {
                        const lastMessage = prev[prev.length - 1];
                        if (lastMessage.role === "assistant") {
                            return [
                                ...prev.slice(0, -1),
                                { ...lastMessage, content: lastMessage.content + text },
                            ];
                        } else {
                            return [...prev, { role: "assistant", content: text }];
                        }
                    });
                } catch (e) {
                    console.error('here', e);
                }
            }
        };

        const reader = data.getReader();
        const decoder = new TextDecoder();
        const parser = createParser(onParse);
        let done = false;

        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            parser.feed(chunkValue);
        }


    };
    // Function to handle Send button click
    const handleSendClick = async () => {
        console.log('Input value:', messages); // Log the input value

        const initialMessage = [
            { role: "system", content: 'You are a advanced llm model which can answer anything' },
            { role: "user", content: `${messages}` },
        ];
        setMessages(initialMessage); // Optionally clear the input field after sending
        await handleChat(initialMessage);

    };

    const handleNoteClick = (noteContent) => {
        console.log('kdsds', noteContent)
        setSelectedNoteContent(noteContent); // Set the clicked note's content
    };

    // Function to toggle the swap state
    const toggleSwap = () => {
        setIsSwapped((prev) => !prev);
    };



    return (
        <>
            <Header />
            <div className={styles.mainContainer}>
                <div className={styles.sidebarContainer}>
                    <p className={styles.sidebarTitle}>Previous Conversation</p>
                    <button onClick={toggleSwap} className={styles.swapButton}>
                        Swap Chat and PDF Areas
                    </button>
                    {notes.map((note, index) => (
                        <div className={styles.noteCard} key={index} onClick={() => handleNoteClick(note.content)}>
                            <p className={styles.noteTitle}>{note.title || "Untitled"}</p>
                        </div>
                    ))}
                </div>
                {isSwapped ? (
                    <>
                        <ChatArea handleChat={handleChat} messages={messages} setMessages={setMessages} setCopiedText={setCopiedText} />
                        <PdfArea content={selectedNoteContent} copiedText={copiedText} />
                    </>
                ) : (
                    <>
                        <PdfArea content={selectedNoteContent} copiedText={copiedText} />
                        <ChatArea handleChat={handleChat} messages={messages} setMessages={setMessages} setCopiedText={setCopiedText} />
                    </>
                )}
            </div>
        </>
    );
}
