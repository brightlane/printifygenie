const fs = require("fs");
const path = require("path");
const { generateArticle } = require("./article-generator");

const KEYWORDS_FILE = path.join(__dirname, "keywords.json");

function loadKeywords() {
  return JSON.parse(fs.readFileSync(KEYWORDS_FILE, "utf-8"));
}

function main() {
  const keywords = loadKeywords();

  const generatedFiles = [];

  for (const keyword of keywords) {
    const file = generateArticle(keyword);
    generatedFiles.push(file);
    console.log("Generated:", keyword);
  }

  console.log("\nDONE. Total:", generatedFiles.length);
}

main();
