import React from 'react'
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import Headerimg from './assets/Headerimg.jpeg'


const HEADER_HEIGHT = 60; // Example: 60 points high

// Calculate the top margin for the main content area on each page.
// This needs to be at least the header height plus some extra space below it.
 // Header height + 20 points padding

const HEADER_TOP_MARGIN = 20;
const PAGE_MARGIN_TOP = HEADER_TOP_MARGIN + HEADER_HEIGHT + 20;

// Define horizontal margins for the page content.
const PAGE_MARGIN_HORIZONTAL = 40;

// Define the bottom margin for the page content.
const PAGE_MARGIN_BOTTOM = 40;


// --- Styles ---

// Create a StyleSheet object to hold styles for different PDF elements.
// These styles are similar to CSS but use camelCase property names and default to 'pt' units.
const styles = StyleSheet.create({
    // Styles applied to each page.
    page: {
        flexDirection: 'column',    // Arrange child elements vertically (default)
        backgroundColor: '#FFFFFF', // White background for the page
        // --- Crucial for Fixed Header ---
        paddingTop: PAGE_MARGIN_TOP, // Reserve space at the top for the fixed header
        // --------------------------------
        paddingBottom: PAGE_MARGIN_BOTTOM, // Space at the bottom
        paddingHorizontal: PAGE_MARGIN_HORIZONTAL, // Left and right margins
        fontFamily: 'Helvetica',   // Default font (consider embedding fonts for consistency)
    },
    // Styles for the fixed header image.
    headerImage: {
        // --- Crucial for Fixing and Positioning ---
        position: 'absolute',       // Takes the image out of the normal document flow
        top: HEADER_TOP_MARGIN,                     // Positions it at the very top edge of the page
        left: 0,                    // Positions it at the very left edge of the page
        right: 0,                   // Stretches it or positions it at the very right edge (combined with left: 0 and width: '100%' usually stretches)
        height: HEADER_HEIGHT,      // Sets the defined height for the header area
        // Use 'width: 100%' if you want the image *container* to span the full page width,
        // or let the image determine its width based on height and objectFit if you don't set width.
        width: '100%',              // Makes the image container span the full page width
        // ------------------------------------------
        backgroundColor: '#EEEEEE', // Optional: Light grey background behind the image, useful if image has transparency or doesn't fill the height
        objectFit: 'cover',         // How the image should resize: 'cover' fills the area, potentially cropping; 'contain' fits without cropping, possibly leaving gaps.
    },
    // Styles for the main content area (the text).
    contentSection: {
        // No specific position needed - it flows naturally after the paddingTop of the page.
        fontSize: 11,               // Text size for the main content
        lineHeight: 1.5,            // Spacing between lines of text
        textAlign: 'justify',       // Justifies text for a block-like appearance (optional)
    },
    // Styles for individual paragraphs within the content section.
    paragraph: {
        marginBottom: 10,           // Add space below each paragraph
    },
    // Styles for the optional fixed page number text.
    pageNumber: {
        position: 'absolute',       // Positions it relative to the page boundaries
        fontSize: 10,               // Smaller font size for page numbers
        bottom: 20,                 // Position near the bottom of the page
        left: 0,                    // Align relative to the left page edge
        right: PAGE_MARGIN_HORIZONTAL, // Aligns text to the right edge of the content area (Page width - right padding)
        textAlign: 'right',         // Aligns the text itself to the right
        color: 'grey',              // Grey color for subtlety
    },
});

// --- Document Component ---

// This is the React component that defines the entire PDF structure.
// It accepts a `textContent` prop which should be the long string of text for the document.
const MyDocument = ({ textContent }) => (
    // The Document component is the root element. It doesn't render visually but holds the pages.
    <Document
        // Optional meta-data for the PDF properties
        title="My Document Title"
        author="Your Name"
        subject="Document with Fixed Header"
    >
        
        <Page size="A4" style={styles.page}>

            {/* --- 1. Fixed Header Image --- */}
            <Image
                // *** The 'fixed' prop is ESSENTIAL. ***
                // It tells react-pdf to render this element on EVERY page
                // in the same position relative to the page boundaries.
                fixed 
                style={styles.headerImage} // Apply the positioning and sizing styles
                src={Headerimg}     // Source of the image (the imported variable)
            />

            {/* --- 2. Flowing Text Content --- */}
            {/* This View acts as a container for the main text.
               It starts below the header because of the Page's paddingTop. */}
            <View style={styles.contentSection}>
                {/*
                   Process the incoming textContent string.
                   We split it by double newlines ("\n\n") to treat blocks of text
                   separated by empty lines as distinct paragraphs.
                   We then map over each paragraph string to create a Text element.
                */}
                {textContent.split('\n\n').map((paragraph, index) => (
                    // Each paragraph is rendered as a separate Text element.
                    // The `key` prop is important for React's list rendering performance.
                    <Text key={index} style={styles.paragraph}>
                        {paragraph} {/* Render the actual paragraph text */}
                    </Text>
                ))}
            </View>

          
            
            <Text
                style={styles.pageNumber} // Apply positioning and text styles
                                     // Makes it repeat on every page
                // The 'render' prop is a special function for dynamic content per page.
                // It receives the current `pageNumber` and `totalPages`.
                render={({ pageNumber, totalPages }) => (
                    `Page ${pageNumber} / ${totalPages}` // Dynamically display "Page X / Y"
                )}
            />
        </Page>
    </Document>
);

// Export the component so it can be imported and used in App.jsx
export default MyDocument;

