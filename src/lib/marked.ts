// Simple marked implementation
export const marked = (markdown: string): string => {
  let html = markdown;

  // Convert headers
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  
  // Convert paragraphs
  html = html.replace(/^\s*(\n)?(.+)/gim, function (m) {
    return /^<(\/)?(h\d|p|ul|ol|li|blockquote|pre|table)/.test(m) ? m : '<p>' + m + '</p>';
  });
  
  // Convert bold and italic
  html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
  html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');
  
  // Convert lists
  html = html.replace(/^\s*\n\* (.*)/gim, '<ul>\n<li>$1</li>\n</ul>');
  html = html.replace(/^\s*\n- (.*)/gim, '<ul>\n<li>$1</li>\n</ul>');
  html = html.replace(/^\s*\n(\d+)\. (.*)/gim, '<ol>\n<li>$2</li>\n</ol>');
  
  // Convert links
  html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>');
  
  // Remove extra list tags
  html = html.replace(/<\/ul>\s*<ul>/g, '');
  html = html.replace(/<\/ol>\s*<ol>/g, '');
  
  // Line breaks
  html = html.replace(/\n/gim, '<br>');
  
  return html;
};