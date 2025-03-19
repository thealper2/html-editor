/**
 * Interactive HTML Editor
 * This script handles all the functionality of the HTML editor including:
 * - Rendering HTML code in the output iframe
 * - Resizing the panels
 * - Line numbering
 * - Error handling
 * - Basic syntax highlighting
 */

// DOM elements
const editor = document.getElementById('editor');
const output = document.getElementById('output');
const runBtn = document.getElementById('run-btn');
const refreshBtn = document.getElementById('refresh-btn');
const resizeHandle = document.getElementById('resize-handle');
const container = document.querySelector('.container');
const codeContainer = document.querySelector('.code-container');
const outputContainer = document.querySelector('.output-container');
const errorMessage = document.getElementById('error-message');
const lineNumbers = document.getElementById('line-numbers');
const exampleBtn = document.getElementById('example-btn');
const clearBtn = document.getElementById('clear-btn');

/**
 * Updates the preview with the HTML code from the editor
 * Uses srcdoc attribute to avoid cross-origin issues
 * @returns {void}
 */
function updatePreview() {
    try {
        // Get the HTML code from the editor
        const htmlCode = editor.value;

        // Clear previous error messages
        errorMessage.style.display = 'none';

        // Use srcdoc attribute to avoid cross-origin issues
        output.srcdoc = htmlCode;

        // Listen for any errors that might occur in the iframe
        output.onload = function () {
            output.contentWindow.onerror = function (message, source, lineno, colno, error) {
                showError(`JavaScript error: ${message} at line ${lineno}`);
                return true; // Prevents the error from appearing in the console
            };
        };
    } catch (error) {
        showError(`Error rendering HTML: ${error.message}`);
    }
}

/**
 * Displays an error message
 * @param {string} message - The error message to display
 * @returns {void}
 */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';

    // Auto-hide error after 5 seconds
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

/**
 * Updates the line numbers in the editor
 * @returns {void}
 */
function updateLineNumbers() {
    const lines = editor.value.split('\n');
    const lineCount = lines.length;

    let lineNumbersHTML = '';
    for (let i = 1; i <= lineCount; i++) {
        lineNumbersHTML += i + '<br>';
    }

    lineNumbers.innerHTML = lineNumbersHTML;
}

/**
 * Loads an example HTML code into the editor
 * @returns {void}
 */
function loadExample() {
    editor.value = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Example Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            color: #333;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        h1 {
            color: #2c3e50;
        }
        button {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #2980b9;
        }
        #result {
            margin-top: 20px;
            padding: 10px;
            background-color: #f9f9f9;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Interactive Example</h1>
        <p>This is a sample HTML page with some interactive elements.</p>
        
        <button id="colorBtn">Change Color</button>
        <button id="textBtn">Change Text</button>
        
        <div id="result">
            <p>Click the buttons above to see the changes!</p>
        </div>
    </div>

    <script>
        // Get DOM elements
        const colorBtn = document.getElementById('colorBtn');
        const textBtn = document.getElementById('textBtn');
        const result = document.getElementById('result');
        
        // Change background color on button click
        colorBtn.addEventListener('click', function() {
            const colors = ['#f9f9f9', '#e3f2fd', '#ffebee', '#e8f5e9', '#fff3e0'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            result.style.backgroundColor = randomColor;
        });
        
        // Change text on button click
        textBtn.addEventListener('click', function() {
            const texts = [
                'Hello, World!',
                'Interactive HTML is fun!',
                'You can create amazing things with HTML, CSS and JavaScript!',
                'Web development is powerful!',
                'Keep coding and learning!'
            ];
            const randomText = texts[Math.floor(Math.random() * texts.length)];
            result.innerHTML = '<p>' + randomText + '</p>';
        });
    </script>
</body>
</html>`;
    updateLineNumbers();
    updatePreview();
}

/**
 * Clears the editor content
 * @returns {void}
 */
function clearEditor() {
    if (confirm('Are you sure you want to clear the editor? All your code will be lost.')) {
        editor.value = '';
        updateLineNumbers();
        updatePreview();
    }
}

/**
 * Initialize the resizable panels functionality
 * @returns {void}
 */
function initResizable() {
    let isResizing = false;
    let startX, startWidth;

    resizeHandle.addEventListener('mousedown', function (e) {
        isResizing = true;
        startX = e.clientX;
        startWidth = outputContainer.offsetWidth;

        document.body.style.cursor = 'ew-resize';
        document.addEventListener('mousemove', resizePanel);
        document.addEventListener('mouseup', stopResize);
    });

    /**
     * Handles the panel resizing during mouse move
     * @param {MouseEvent} e - The mouse event
     * @returns {void}
     */
    function resizePanel(e) {
        if (!isResizing) return;

        const containerWidth = container.offsetWidth;
        const delta = startX - e.clientX;
        const newOutputWidth = Math.max(100, Math.min(startWidth + delta, containerWidth - 100));

        // Calculate the percentage width
        const outputPercentage = (newOutputWidth / containerWidth) * 100;
        const codePercentage = 100 - outputPercentage;

        // Set the widths using flex-basis for smooth resizing
        outputContainer.style.flexBasis = `${outputPercentage}%`;
        codeContainer.style.flexBasis = `${codePercentage}%`;
    }

    /**
     * Stops the resize operation
     * @returns {void}
     */
    function stopResize() {
        isResizing = false;
        document.body.style.cursor = '';
        document.removeEventListener('mousemove', resizePanel);
        document.removeEventListener('mouseup', stopResize);
    }
}

// Event listeners
runBtn.addEventListener('click', updatePreview);
refreshBtn.addEventListener('click', updatePreview);
exampleBtn.addEventListener('click', loadExample);
clearBtn.addEventListener('click', clearEditor);

editor.addEventListener('keydown', function (e) {
    // Run code with Ctrl+Enter
    if (e.ctrlKey && e.key === 'Enter') {
        updatePreview();
    }

    // Handle tab key for indentation
    if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;

        // Insert 4 spaces for indentation
        this.value = this.value.substring(0, start) + '\t' + this.value.substring(end);

        // Move cursor position
        this.selectionStart = this.selectionEnd = start + 4;
    }
});

editor.addEventListener('input', updateLineNumbers);

// Handle editor scroll to sync line numbers
editor.addEventListener('scroll', function () {
    lineNumbers.scrollTop = editor.scrollTop;
});

// Initialize the app
window.addEventListener('DOMContentLoaded', function () {
    initResizable();
    updateLineNumbers();
    loadExample(); // Load example code on startup
    updatePreview();
});