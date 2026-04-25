const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "output/articles");

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function metaDescription(keyword) {
  return `Complete guide on ${keyword}. Learn strategies, tips, and step-by-step methods to rank and earn online.`;
}

function generateSEOPage(keyword) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const slug = slugify(keyword);
  const filePath = path.join(OUTPUT_DIR, `${slug}.html`);

  const title = `${keyword} | Complete 2026 Guide`;

  const description = metaDescription(keyword);

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>

  <!-- BASIC SEO -->
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="keywords" content="${keyword}">
  <meta name="robots" content="index, follow">

  <!-- OPEN GRAPH (Facebook, LinkedIn, WhatsApp) -->
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="article">

  <!-- TWITTER CARD -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">

  <!-- CANONICAL -->
  <link rel="canonical" href="https://yourdomain.com/articles/${slug}.html">

  <!-- JSON-LD (GOOGLE RICH RESULT) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${title}",
    "description": "${description}",
    "author": {
      "@type": "Organization",
      "name": "SEO Engine"
    }
  }
  </script>

</head>

<body>

  <h1>${keyword}</h1>

  <p>
    This page is optimized for <strong>${keyword}</strong> and structured for global search engines.
  </p>

  <h2>Overview</h2>
  <p>${keyword} is a high-demand topic in online business and SEO markets.</p>

  <h2>Strategy</h2>
  <ul>
    <li>Keyword optimization</li>
    <li>Content structure</li>
    <li>Traffic generation</li>
    <li>Conversion setup</li>
  </ul>

  <h2>Conclusion</h2>
  <p>Ranking for ${keyword} requires consistent SEO optimization and content updates.</p>

</body>
</html>
`;

  fs.writeFileSync(filePath, html);
}

module.exports = { generateSEOPage };
