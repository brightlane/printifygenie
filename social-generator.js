const fs = require("fs");
const path = require("path");

function createPost(keyword) {
  return {
    keyword,
    twitter: `🚀 ${keyword} in 2026 is a huge opportunity. Start simple, scale smart.`,
    facebook: `Want to learn ${keyword}? Here’s a beginner-friendly breakdown of how people are building income streams.`,
    instagram: `🔥 ${keyword}\n\nStart small. Stay consistent. Build income online step-by-step.`,
    linkedin: `${keyword} is becoming a major digital opportunity. Here’s how beginners are approaching it in 2026.`,
    createdAt: new Date().toISOString()
  };
}

module.exports = { createPost };
