import React, { useRef, useEffect, useState } from 'react';
import styles from './PdfArea.module.css';
import { FaBookmark, FaDownload } from 'react-icons/fa';
import jsPDF from 'jspdf';

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const PdfArea = ({ copiedText }) => {
  const quillRef = useRef(null);
  const [content, setContent] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'list', 'bullet', 'indent', 'link', 'image'
  ];

  useEffect(() => {
    if (copiedText && quillRef.current) {
      const quill = quillRef.current.getEditor();
      const currentContent = quill.root.innerHTML;
      if (currentContent.length > 0) {
        const newContent = currentContent + '<br>' + copiedText;
        setContent(newContent);
      } else {
        const newContent = currentContent + copiedText;
        setContent(newContent);
      }


    }
  }, [copiedText]);

  const handleChange = (value) => {
    setContent(value);
  };

const downloadAsPdf = () => {
  if (quillRef.current) {
    const quill = quillRef.current.getEditor();
    const delta = quill.getContents();

    const doc = new jsPDF();
    doc.setFontSize(12);
    const pageHeight = doc.internal.pageSize.getHeight();
    let y = 20; // Starting y-position

    // Function to render a code block
    const renderCodeBlock = (text) => {
      // Split the code text into lines that fit the page width
      const lines = doc.splitTextToSize(text, doc.internal.pageSize.getWidth() - 40);
      lines.forEach((line) => {
        // Check if the current y-position would exceed the page height
        if (y + 12 > pageHeight) {
          // If so, move to the next page and reset the y-position
          y = 20;
          doc.addPage();
        }
        // Render the code line with a light gray background
        doc.setFillColor(240, 240, 240);
        doc.rect(10, y, doc.internal.pageSize.getWidth() - 20, 12, 'F');
        doc.setTextColor(0, 0, 0); // Set the text color to black
        doc.text(line, 20, y);
        y += 12; // Move the y-position down for the next line
      });
    };

    // Function to render an image
    const renderImage = (src) => {
      // Check if there's enough space on the current page to fit the image
      if (y + 100 > pageHeight) {
        // If not, move to the next page and reset the y-position
        y = 20;
        doc.addPage();
      }

      // Load the image and add it to the PDF document
      const imgProps = doc.getImageProperties(src);
      const pdfWidth = doc.internal.pageSize.getWidth() - 40;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(src, 'JPEG', 20, y, pdfWidth, pdfHeight);
      y += pdfHeight + 12; // Move the y-position down below the image
    };

    // Iterate through the Delta operations and render the content
    delta.ops.forEach((op) => {
      if (op.insert) {
        if (typeof op.insert === 'string') {
          // Render plain text
          const lines = doc.splitTextToSize(op.insert, doc.internal.pageSize.getWidth() - 40);
          lines.forEach((line) => {
            // Check if the current y-position would exceed the page height
            if (y + 12 > pageHeight) {
              y = 20;
              doc.addPage(); // Move to the next page and reset the y-position
            }
            doc.setTextColor(0, 0, 0); // Set the text color to black
            doc.text(line, 20, y);
            y += 5; // Move the y-position down for the next line
          });
        } else if (op.insert.image) {
          // Render images
          renderImage(op.insert.image);
        }
      } else if (op.attributes) {
        if (op.attributes.list === 'ordered') {
          // Render ordered list
          const lines = op.insert.split('\n');
          let listIndex = 1;
          lines.forEach((line) => {
            // Check if the current y-position would exceed the page height
            if (y + 12 > pageHeight) {
              y = 20;
              doc.addPage(); // Move to the next page and reset the y-position
            }
            doc.setTextColor(0, 0, 0); // Set the text color to black
            doc.text(`${listIndex}. ${line}`, 20, y);
            y += 12; // Move the y-position down for the next line
            listIndex++;
          });
        } else if (op.attributes.list === 'bullet') {
          // Render bullet list
          const lines = op.insert.split('\n');
          lines.forEach((line) => {
            // Check if the current y-position would exceed the page height
            if (y + 12 > pageHeight) {
              y = 20;
              doc.addPage(); // Move to the next page and reset the y-position
            }
            doc.setTextColor(0, 0, 0); // Set the text color to black
            doc.text(`- ${line}`, 20, y);
            y += 12; // Move the y-position down for the next line
          });
        } else if (op.attributes.code) {
          // Render code block
          const codeText = op.insert.replace(/\n$/, '');
          renderCodeBlock(codeText);
        }
      }
    });

    doc.save('quill-content.pdf');
  }
};

  return (
    <div className={styles.container}>
      <div className={styles.pdfContainer}>
        <div className={styles.titleContainer}>
          <span className={styles.title}>Learning Notes</span>
          <div className={styles.iconContainer}>
            <FaBookmark className={styles.bookmarkIcon} />
            <FaDownload className={styles.bookmarkIcon}  onClick={downloadAsPdf}/>
          </div>
        </div>
        <div className={styles.textContainer}>
          <ReactQuill
            ref={quillRef}
            theme="snow"
            modules={modules}
            formats={formats}
            onChange={handleChange}
            value={content}
            className={styles.quillEditor}
          />
        </div>
      </div>
    </div>
  );
};

export default PdfArea;