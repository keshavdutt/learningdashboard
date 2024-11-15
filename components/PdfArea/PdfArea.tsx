
import React, { useRef, useEffect, useState } from 'react';
import styles from './PdfArea.module.css';
import { FaBookmark, FaDownload } from 'react-icons/fa';
import jsPDF from 'jspdf';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const PdfArea = ({ content: selectedNoteContent, copiedText }) => {
  const quillRef = useRef(null);
  const [content, setContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');

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
    // Update editor content if a new note is selected
    if (selectedNoteContent) {
      setContent(selectedNoteContent);
    }
  }, [selectedNoteContent]);

  useEffect(() => {
    if (copiedText && quillRef.current) {
      const quill = quillRef.current.getEditor();
      let currentContent = quill.root.innerHTML;
      if(currentContent == '<p><br></p>') currentContent = "";
      const newContent = currentContent.length > 0 ? currentContent + '<br>' + copiedText : copiedText;
      setContent(newContent);
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNoteTitle(''); // Reset title input after closing
  };

  const saveToLocalStorage = () => {
    const existingNotes = JSON.parse(localStorage.getItem('savedNotes')) || [];

    // Find if a note with the same title already exists
    const noteIndex = existingNotes.findIndex(note => note.title === noteTitle);

    if (noteIndex > -1) {
      // If found, update existing note
      existingNotes[noteIndex].content = content;
    } else {
      // If not found, add as a new note
      existingNotes.push({ title: noteTitle, content });
    }

    localStorage.setItem('savedNotes', JSON.stringify(existingNotes));
    alert('Note saved to local storage!');
    closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.pdfContainer}>

        {copiedText.length > 0 || selectedNoteContent.length > 0 ? (
          <>
            <div className={styles.titleContainer}>
              <span className={styles.title}>Learning Notes</span>
              <div className={styles.iconContainer}>
                <FaBookmark className={styles.bookmarkIcon} onClick={openModal} />
                <FaDownload className={styles.bookmarkIcon} onClick={downloadAsPdf} />
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
            </div></>
        ) : (
          <div className={styles.placeholderContainer}>
           
            <p className={styles.placeholderText}>
              Notes will appear here once you start adding content.
              For adding content, select the text, and click send to notes.
              Or Start a New Note
            </p>
          </div>
        )}
      </div>

      {/* Modal for title input */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Enter Note Title</h3>
            <input
              type="text"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder="Note Title"
              className={styles.titleInput}
            />
            <button onClick={saveToLocalStorage} className={styles.saveButton}>Save</button>
            <button onClick={closeModal} className={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfArea;

// new stuff

// import React, { useRef, useEffect, useState } from 'react';
// import styles from './PdfArea.module.css';
// import { FaBookmark, FaDownload } from 'react-icons/fa';
// import jsPDF from 'jspdf';
// import ReactQuill from 'react-quill-new';
// import 'react-quill-new/dist/quill.snow.css';

// const PdfArea = ({ content: selectedNoteContent, copiedText }) => { // Accept selectedNoteContent as a prop
//   const quillRef = useRef(null);
//   const [content, setContent] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [noteTitle, setNoteTitle] = useState('');

//   const modules = {
//     toolbar: [
//       [{ 'header': [1, 2, 3, false] }],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
//       [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
//       ['link', 'image'],
//       ['clean'],
//     ],
//   };

//   const formats = [
//     'header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
//     'list', 'bullet', 'indent', 'link', 'image'
//   ];

//   useEffect(() => {
//     // Update editor content if a new note is selected
//     if (selectedNoteContent) {
//       setContent(selectedNoteContent);
//     }
//   }, [selectedNoteContent]);

//   useEffect(() => {
//     if (copiedText && quillRef.current) {
//       const quill = quillRef.current.getEditor();
//       let currentContent = quill.root.innerHTML;
//       if (currentContent === '<p><br></p>') currentContent = "";
//       const newContent = currentContent.length > 0 ? currentContent + '<br>' + copiedText : copiedText;
//       setContent(newContent);
//     }
//   }, [copiedText]);

//   const handleChange = (value) => {
//     setContent(value);
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setNoteTitle(''); // Reset title input after closing
//   };

//   const saveToLocalStorage = () => {
//     const existingNotes = JSON.parse(localStorage.getItem('savedNotes')) || [];
//     const noteIndex = existingNotes.findIndex(note => note.title === noteTitle);

//     if (noteIndex > -1) {
//       existingNotes[noteIndex].content = content;
//     } else {
//       existingNotes.push({ title: noteTitle, content });
//     }

//     localStorage.setItem('savedNotes', JSON.stringify(existingNotes));
//     alert('Note saved to local storage!');
//     closeModal();
//   };

//   const downloadAsPdf = () => {
//     const pdf = new jsPDF();
//     pdf.text(content.replace(/<[^>]+>/g, ''), 10, 10); // Strip HTML tags for plain text
//     pdf.save(`${noteTitle || 'untitled'}.pdf`);
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.pdfContainer}>
//         <div className={styles.titleContainer}>
//           <span className={styles.title}>Learning Notes</span>
//           <div className={styles.iconContainer}>
//             <FaBookmark className={styles.bookmarkIcon} onClick={openModal} />
//             <FaDownload className={styles.bookmarkIcon} onClick={downloadAsPdf} />
//           </div>
//         </div>
//         <div className={styles.textContainer}>
//           <ReactQuill
//             ref={quillRef}
//             theme="snow"
//             modules={modules}
//             formats={formats}
//             onChange={handleChange}
//             value={content}
//             className={styles.quillEditor}
//           />
//         </div>
//       </div>

//       {isModalOpen && (
//         <div className={styles.modalOverlay}>
//           <div className={styles.modalContent}>
//             <h3>Enter Note Title</h3>
//             <input
//               type="text"
//               value={noteTitle}
//               onChange={(e) => setNoteTitle(e.target.value)}
//               placeholder="Note Title"
//               className={styles.titleInput}
//             />
//             <button onClick={saveToLocalStorage} className={styles.saveButton}>Save</button>
//             <button onClick={closeModal} className={styles.cancelButton}>Cancel</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PdfArea;
