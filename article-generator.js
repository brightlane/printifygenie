const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "output/articles");

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function generateArticle(keyword) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const slug = slugify(keyword);
  const filePath = path.join(OUTPUT_DIR, `${slug}.html`);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>${keyword}</title>
  <meta name="description" content="${keyword} guide">
</head>
<body>
  <h1>${keyword}</h1>

  <p>This page is optimized for <strong>${keyword}</strong>.</p>

  <h2>What is it?</h2>
  <p>${keyword} is a trending online business topic in 2026.</p>

  <h2>How to start</h2>
  <ul>
    <li>Research the topic</li>
    <li>Create content or products</li>
    <li>Optimize SEO</li>
    <li>Drive traffic</li>
  </ul>

  <h2>Conclusion</h2>
  <p>Success with ${keyword} depends on consistency and execution.</p>
</body>
</html>
`;

  fs.writeFileSync(filePath, html);
  return filePath;
}

module.exports = { generateArticle };
