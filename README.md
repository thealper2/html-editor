# HTML Editor

An interactive web-based HTML editor, featuring a split-pane interface with live previewing of HTML, CSS, and JavaScript.

![HTML Editor](https://raw.githubusercontent.com/thealper2/html-editor/refs/heads/main/images/html-editor.png)

---

## :dart: Features

- **Split-pane Interface**: Code editor on the left, live preview on the right
- **Resizable Panels**: Drag the divider to adjust panel sizes
- **Syntax Highlighting**: Basic color styling for code visibility
- **Line Numbers**: For easier code navigation and debugging
- **Live Preview**: See your code come to life as you type
- **Error Handling**: Clear error messages for debugging
- **Keyboard Shortcuts**:
 - `Ctrl+Enter`: Run the code
 - `Tab`: Smart indentation (4 spaces)
- **Example Template**: Quick-start with a sample interactive page
- **Responsive Design**: Works on different screen sizes

## :joystick: Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js with Express
- **Development**: Nodemon for auto-reloading during development

## :clipboard: Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/thealper2/html-editor.git
cd html-editor
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

4. Open your browser and navigate to:

```bash
http://localhost:3000
```

### Development Mode

For development with automatic server restarts:

```bash
npm run dev
```

## :hammer_and_wrench: How It Works

The application is structured as a Node.js Express server that serves static files from the `public` directory. The HTML editor uses the iframe's `srcdoc` attribute to avoid cross-origin issues that can occur when trying to access the iframe's content.
Key features implemented:

1. Live Preview: Updates the iframe content when you click "Run" or press Ctrl+Enter
2. Resizable Panels: Uses mouse events to track and adjust panel sizes
3. Error Handling: Catches and displays JavaScript errors from the iframe
4. Line Numbers: Dynamically updates as you type or edit code

## :shield: Cross-Origin Issue Solution

The editor avoids cross-origin frame access errors by using the iframe's srcdoc attribute instead of directly manipulating the iframe's document. This approach ensures that the content is treated as same-origin.

## :scroll: License

This project is licensed under the MIT License - see the LICENSE file for details.