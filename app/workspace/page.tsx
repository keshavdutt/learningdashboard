

"use client"
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Header from "@/components/Header/Header";

export default function Workspace() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];
        setNotes(savedNotes);
    }, []);

    return (
        <>
            <Header />
            <div className={styles.mainContainer}>
                <h2 className={styles.header}>Your Notes</h2>
                <div className={styles.notesGrid}>
                    {notes.map((note, index) => (
                        <div className={styles.noteCard} key={index}>
                            <h3 className={styles.noteTitle}>{note.title || "Untitled"}</h3>

                            <div
                                className={styles.noteContent}
                                dangerouslySetInnerHTML={{ __html: note.content.substring(0, 100) }}
                            />


                            <p className={styles.noteDate}>
                                Last edited: {new Date().toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
