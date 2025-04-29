import React from 'react';

import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

import MyDocument from './MyDocument.jsx';
import { useState } from 'react';

import './App.css';


function App() {
  
    const pdfFileName = "DocumentWithHeader.pdf";
    const [pdfText, setPdfText] = useState('');

    const handleTextChange = (event) => {
      setPdfText(event.target.value); 
  };

  return (
    <div className="app-container">

        
        <h1>React PDF Generator</h1>

        
        <label htmlFor="pdfTextBox" className="input-label">
            Paste or type the text for your PDF below:
        </label>

        
        <textarea
            id="pdfTextBox"
            className="text-input-area" 
            rows="15" 
            placeholder="Enter the text content for the PDF document here..."
            value={pdfText} 
            onChange={handleTextChange} 
        />

        
        {pdfText.trim() ? ( 
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
        
        {pdfText.trim() && ( // Only show viewer if there is text
            <div className="viewer-container" style = {{marginTop : '40px'}}>
                 <PDFViewer width="100%" height="600" >
                     <MyDocument textContent={pdfText} />
                 </PDFViewer>
            </div>
         )}
        

    </div>
);
}

// Export the App component
export default App;