# Markdown to HTML Converter

A sleek, GitHub-themed markdown to HTML converter with real-time preview. Convert your markdown content to HTML instantly with a beautiful dark theme interface.

![GitHub](https://img.shields.io/badge/Made%20by-Matt--Anis-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### Core Functionality
- 🔄 **Real-time Conversion** - See your markdown rendered instantly as you type
- 👁️ **Live Preview** - View formatted HTML output in real-time
- 📋 **Copy Buttons** - One-click copy for both markdown and HTML
- 🎨 **GitHub Dark Theme** - Authentic GitHub dark mode styling
- 📱 **Responsive Design** - Works seamlessly on all devices

### Supported Markdown Syntax

#### Text Formatting
- **Bold** - `**text**` or `__text__`
- *Italic* - `*text*` or `_text_`
- ~~Strikethrough~~ - `~~text~~`
- `Inline Code` - `` `code` ``

#### Headings
- H1-H6 - `#` to `######`

#### Lists
- Unordered lists - `-`, `*`, or `+`
- Ordered lists - `1.`, `2.`, etc.
- Nested lists support
- Task lists - `- [ ]` and `- [x]`

#### Links & Images
- Links - `[text](url)` or `[text](url "title")`
- Images - `![alt](url)` or `![alt](url "title")`

#### Code
- Inline code - `` `code` ``
- Code blocks - ` ```language\ncode\n``` `
- Syntax highlighting support

#### Other Elements
- Blockquotes - `> text`
- Horizontal rules - `---`, `***`, or `___`
- Tables - Standard markdown table syntax
- Paragraphs - Automatic wrapping
- Line breaks - Two spaces at end of line

## 🚀 Getting Started

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Matt-Anis/MD2HTML.git
   cd MD2HTML
   ```

2. **Open the application**
   - Simply open `index.html` in your browser
   - No build process or dependencies needed!

3. **Start converting**
   - Type or paste your markdown in the input field
   - Switch between Edit, Preview, and Code views
   - Copy the output with one click

## 🎯 Usage

### Interface Modes

The converter offers three viewing modes accessible via the header buttons:

1. **Edit Mode** (Default)
   - Shows the markdown input field
   - Perfect for writing and editing your markdown

2. **Preview Mode**
   - Displays the rendered HTML output
   - See exactly how your markdown will look

3. **Code Mode**
   - Shows the raw HTML output
   - Copy the generated HTML for use in your projects

### Copy Functionality

- **Copy Markdown** - Located in the markdown input section
- **Copy HTML** - Located in the raw HTML output section
- Both buttons provide visual feedback when clicked

## 🎨 Styling

The application uses a carefully crafted GitHub dark theme with:

- Authentic GitHub color palette
- Smooth transitions and hover effects
- Custom scrollbars
- Professional typography
- Responsive grid layout

### Color Scheme

```css
--bg-color: #0d1117;
--container-bg: #161b22;
--border-color: #30363d;
--text-primary: #c9d1d9;
--text-secondary: #8b949e;
--accent-blue: #58a6ff;
--accent-green: #3fb950;
```

## 📁 Project Structure

```
MD2HTML/
├── index.html          # Main HTML structure
├── styles.css          # GitHub-themed styling
├── script.js           # Conversion logic and interactivity
└── README.md          # Project documentation
```

## 🛠️ Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **Vanilla JavaScript** - No frameworks or dependencies
- **Regex** - Powerful pattern matching for markdown parsing

## 💡 Examples

### Basic Formatting

```markdown
# Hello World

This is **bold** and this is *italic*.

Here's a [link](https://github.com/Matt-Anis).
```


## 👤 Author

**Matt-Anis**

- GitHub: [@Matt-Anis](https://github.com/Matt-Anis)
- Project Link: [MD2HTML](https://github.com/Matt-Anis/MD2HTML)

## 🌟 Acknowledgments

- Inspired by GitHub's markdown renderer
- Dark theme colors from GitHub's design system
- Icons from Phosphor Icons

<div align="center">
Made with ❤️ by <a href="https://github.com/Matt-Anis">Matt-Anis</a>
</div>
