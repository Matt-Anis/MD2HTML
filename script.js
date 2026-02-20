const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

// Container elements
const markdownContainer = document.getElementById("markdown-container");
const htmlContainer = document.getElementById("html-container");
const previewContainer = document.getElementById("preview-container");

// Button elements
const editBtn = document.getElementById("edit");
const previewBtn = document.getElementById("preview-btn");
const viewHtmlBtn = document.getElementById("view-html-btn");
const copyMarkdownBtn = document.getElementById("copy-markdown");
const copyHtmlBtn = document.getElementById("copy-html");

// Guide toggle
const toggleGuideBtn = document.getElementById("toggle-guide");
const guideContent = document.getElementById("guide-content");

// Store the current HTML output for copying
let currentHtmlOutput = "";

// Toggle guide visibility
toggleGuideBtn.addEventListener("click", () => {
  const isVisible = guideContent.style.display !== "none";
  guideContent.style.display = isVisible ? "none" : "block";
  toggleGuideBtn.classList.toggle("active", !isVisible);
});

// Convert markdown on input
markdownInput.addEventListener("input", () => {
  const result = convertMarkdown();
  currentHtmlOutput = result;
  // Display HTML output as a formatted code block
  htmlOutput.innerHTML = `<pre><code class="language-html">${escapeHtml(result)}</code></pre>`;
  preview.innerHTML = result;
});

// Toggle between Edit, Preview, and Raw HTML modes
editBtn.addEventListener("click", () => {
  markdownContainer.style.display = "block";
  htmlContainer.style.display = "none";
  previewContainer.style.display = "none";
  
  setActiveButton(editBtn);
});

previewBtn.addEventListener("click", () => {
  markdownContainer.style.display = "none";
  htmlContainer.style.display = "none";
  previewContainer.style.display = "block";
  
  setActiveButton(previewBtn);
});

viewHtmlBtn.addEventListener("click", () => {
  markdownContainer.style.display = "none";
  htmlContainer.style.display = "block";
  previewContainer.style.display = "none";
  
  setActiveButton(viewHtmlBtn);
});

function setActiveButton(activeBtn) {
  [editBtn, previewBtn, viewHtmlBtn].forEach(btn => {
    btn.classList.remove("active");
  });
  activeBtn.classList.add("active");
}

// Copy functionality for markdown input
copyMarkdownBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(markdownInput.value);
    showCopiedFeedback(copyMarkdownBtn);
  } catch (err) {
    console.error("Failed to copy markdown:", err);
  }
});

// Copy functionality for HTML output
copyHtmlBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(currentHtmlOutput);
    showCopiedFeedback(copyHtmlBtn);
  } catch (err) {
    console.error("Failed to copy HTML:", err);
  }
});

function showCopiedFeedback(button) {
  const originalText = button.querySelector("span").textContent;
  button.classList.add("copied");
  button.querySelector("span").textContent = "Copied!";
  
  setTimeout(() => {
    button.classList.remove("copied");
    button.querySelector("span").textContent = originalText;
  }, 2000);
}

function convertMarkdown() {
  let rawHtml = markdownInput.value;

  // 1. Code blocks (``` language\ncode\n```) - Process first to protect content
  rawHtml = rawHtml.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre><code class="language-${lang || 'plaintext'}">${escapeHtml(code.trim())}</code></pre>`;
  });

  // 2. Inline code (`code`) - Before other inline formatting
  rawHtml = rawHtml.replace(/`([^`]+)`/g, '<code>$1</code>');

  // 3. Horizontal rules (---, ***, ___) - Must be on their own line
  rawHtml = rawHtml.replace(/^(?:---|\*\*\*|___)\s*$/gm, '<hr>');

  // 4. Headings (# to ######)
  rawHtml = rawHtml.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>');
  rawHtml = rawHtml.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>');
  rawHtml = rawHtml.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
  rawHtml = rawHtml.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
  rawHtml = rawHtml.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
  rawHtml = rawHtml.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');

  // 5. Tables (basic support)
  rawHtml = rawHtml.replace(/^\|(.+)\|\s*\n\|[-:\s|]+\|\s*\n((?:\|.+\|\s*\n?)+)/gm, (match, header, rows) => {
    const headerCells = header.split('|').filter(c => c.trim()).map(c => `<th>${c.trim()}</th>`).join('');
    const bodyRows = rows.trim().split('\n').map(row => {
      const cells = row.split('|').filter(c => c.trim()).map(c => `<td>${c.trim()}</td>`).join('');
      return `<tr>${cells}</tr>`;
    }).join('');
    return `<table><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table>`;
  });

  // 6. Unordered lists (-, *, +)
  rawHtml = rawHtml.replace(/^([*\-+])\s+(.+)$/gm, '<li>$2</li>');
  rawHtml = rawHtml.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
    return `<ul>${match}</ul>`;
  });

  // 7. Ordered lists (1., 2., etc.)
  rawHtml = rawHtml.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');
  // Wrap consecutive <li> that aren't already in <ul> into <ol>
  rawHtml = rawHtml.replace(/(?<!<ul>)(<li>(?:(?!<\/ul>).)*<\/li>)(?:\n<li>(?:(?!<\/ul>).)*<\/li>)*/g, (match) => {
    if (!match.includes('<ul>')) {
      return `<ol>${match}</ol>`;
    }
    return match;
  });

  // 8. Blockquotes (> text)
  rawHtml = rawHtml.replace(/^>\s+(.+)$/gm, '<blockquote>$1</blockquote>');
  // Merge consecutive blockquotes
  rawHtml = rawHtml.replace(/(<\/blockquote>)\s*(<blockquote>)/g, ' ');

  // 9. Images (![alt](url "title")) - Before links to avoid conflict
  rawHtml = rawHtml.replace(/!\[([^\]]*)\]\(([^)"]+)(?:\s+"([^"]+)")?\)/g, (match, alt, url, title) => {
    return title ? `<img alt="${alt}" src="${url}" title="${title}">` : `<img alt="${alt}" src="${url}">`;
  });

  // 10. Links ([text](url "title"))
  rawHtml = rawHtml.replace(/\[([^\]]+)\]\(([^)"]+)(?:\s+"([^"]+)")?\)/g, (match, text, url, title) => {
    return title ? `<a href="${url}" title="${title}">${text}</a>` : `<a href="${url}">${text}</a>`;
  });

  // 11. Strikethrough (~~text~~)
  rawHtml = rawHtml.replace(/~~(.+?)~~/g, '<del>$1</del>');

  // 12. Bold (** or __) - Must be before italic to handle *** correctly
  rawHtml = rawHtml.replace(/(\*\*|__)(?=\S)(.+?)(?<=\S)\1/g, '<strong>$2</strong>');

  // 13. Italic (* or _)
  rawHtml = rawHtml.replace(/(\*|_)(?=\S)(.+?)(?<=\S)\1/g, '<em>$2</em>');

  // 14. Line breaks (two spaces at end of line or explicit <br>)
  rawHtml = rawHtml.replace(/  \n/g, '<br>\n');

  // 15. Task lists (- [ ] and - [x])
  rawHtml = rawHtml.replace(/<li>\s*\[\s\]\s+(.+)<\/li>/g, '<li><input type="checkbox" disabled> $1</li>');
  rawHtml = rawHtml.replace(/<li>\s*\[x\]\s+(.+)<\/li>/gi, '<li><input type="checkbox" checked disabled> $1</li>');

  // 16. Paragraphs - wrap text that isn't already in a block element
  const lines = rawHtml.split('\n');
  const processedLines = [];
  let inParagraph = false;
  let paragraphContent = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const isBlockElement = /^<(h[1-6]|ul|ol|li|blockquote|pre|table|hr|div)/.test(line) || 
                           /<\/(h[1-6]|ul|ol|li|blockquote|pre|table|hr|div|code)>$/.test(line);
    const isEmpty = line === '';

    if (isEmpty) {
      if (inParagraph && paragraphContent.trim()) {
        processedLines.push(`<p>${paragraphContent.trim()}</p>`);
        paragraphContent = '';
      }
      inParagraph = false;
    } else if (isBlockElement) {
      if (inParagraph && paragraphContent.trim()) {
        processedLines.push(`<p>${paragraphContent.trim()}</p>`);
        paragraphContent = '';
        inParagraph = false;
      }
      processedLines.push(line);
    } else {
      if (inParagraph) {
        paragraphContent += ' ' + line;
      } else {
        paragraphContent = line;
        inParagraph = true;
      }
    }
  }

  if (inParagraph && paragraphContent.trim()) {
    processedLines.push(`<p>${paragraphContent.trim()}</p>`);
  }

  rawHtml = processedLines.join('');

  return rawHtml;
}

// Helper function to escape HTML in code blocks
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}