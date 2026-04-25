const fs = require("fs");
const path = require("path");

const ARTICLES_DIR = path.join(__dirname, "output/articles");
const SITEMAP_FILE = path.join(__dirname, "output/sitemap.xml");

function getUrls() {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  return fs.readdirSync(ARTICLES_DIR)
    .filter(f => f.endsWith(".html"))
    .map(f => `https://your-site.com/articles/${f}`);
}

function buildSitemap(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `
  <url>
    <loc>${u}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
`).join("")}
</urlset>`;
}

function main() {
  const urls = getUrls();

  fs.mkdirSync(path.dirname(SITEMAP_FILE), { recursive: true });
  fs.writeFileSync(SITEMAP_FILE, buildSitemap(urls));

  console.log("Sitemap generated:", urls.length);
}

main();
