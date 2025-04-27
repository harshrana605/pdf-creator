// Import React library
import React from 'react';

// Import the component from react-pdf needed to create a download link
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'; // Added PDFViewer for the optional preview

// Import the custom component that defines our PDF document's structure
import MyDocument from './MyDocument.jsx';
import { useState } from 'react';

// Import the CSS file for styling the web page elements (button, layout)
import './App.css';

// --- Sample Long Text Content ---
// This is placeholder text. In a real application, this data might come from
// user input, an API call, or state management. The double newlines (\n\n)
// are used by MyDocument.js to split the text into paragraphs.


// The main App component for the web page
function App() {
    // Define the filename for the downloaded PDF file 
    const pdfFileName = "DocumentWithHeader.pdf";
    const [pdfText, setPdfText] = useState('');

    const handleTextChange = (event) => {
      setPdfText(event.target.value); // Update the pdfText state with the new value
  };

  return (
    // Main container for the application's web UI, styled by App.css
    <div className="app-container">

        {/* Web page heading */}
        <h1>React PDF Generator</h1>

        {/* Instructions for the user */}
        <label htmlFor="pdfTextBox" className="input-label">
            Paste or type the text for your PDF below:
        </label>

        {/* --- Textarea Input --- */}
        <textarea
            id="pdfTextBox"
            className="text-input-area" // Add a class for styling
            rows="15" // Suggests a height, but CSS is better for control
            placeholder="Enter the text content for the PDF document here..."
            value={pdfText} // Bind the textarea's value to our state variable
            onChange={handleTextChange} // Call handleTextChange whenever the text changes
        />

        {/* Container for the download button */}
        {/* --- Conditionally Render Download Link --- */}
        {/* Only show the link if there is some text entered */}
        {pdfText.trim() ? ( // Check if pdfText is not just whitespace
            <div className="button-container">
                <PDFDownloadLink
                    // Pass the CURRENT value from the state (pdfText) to the document
                    document={<MyDocument textContent={pdfText} />}
                    fileName={pdfFileName}
                >
                    {({ blob, url, loading, error }) =>
                        loading ? 'Generating PDF...' : 'Download PDF'
                    }
                </PDFDownloadLink>
            </div>
         ) : (
            // Optional: Show a message if no text is entered
            <p style={{ marginTop: '20px', color: '#777' }}>
                Please enter some text above to enable the download button.
            </p>
         )}


        {/* --- Optional: PDF Previewer (Can be useful for debugging) --- */}
        {/* Note: The viewer will update in real-time as you type! */}
        {/* Uncomment if needed
        {pdfText.trim() && ( // Only show viewer if there is text
            <div className="viewer-container">
                 <PDFViewer width="100%" height="600">
                     <MyDocument textContent={pdfText} />
                 </PDFViewer>
            </div>
         )}
        */}

    </div>
);
}

// Export the App component
export default App;