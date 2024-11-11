import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { FaBookmark, FaDownload } from 'react-icons/fa';
// import 'react-quill/dist/quill.snow.css';
import styles from './PdfArea.module.css';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import ReactQuill and disable SSR
// const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const PdfArea = () => {

  let modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }

  let formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  const handleChange = (value) => {
    console.log(value); // Handle change in editor content
  };

  return (
    <div className={styles.container}>
      <div className={styles.pdfContainer}>
        {/* Title Container with Title and Bookmark Icon */}
        <div className={styles.titleContainer}>
          <span className={styles.title}>Data Structures and Algorithms (DSA) Notes</span>
          <div className={styles.iconContainer}>
            <FaBookmark className={styles.bookmarkIcon} />
            <FaDownload className={styles.bookmarkIcon} />
          </div>
        </div>

        {/* Quill Editor Container */}
        <div className={styles.textContainer}>
          {/* Dynamically load Quill Editor */}
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            onChange={handleChange} // Handle change in editor content
            className={styles.quillEditor} // Custom CSS class for the editor
          />
        </div>
      </div>
    </div>
  );
};

export default PdfArea;
