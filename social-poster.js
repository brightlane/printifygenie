const axios = require("axios");

// ======================
// ENV CONFIG
// ======================
const X_BEARER_TOKEN = process.env.X_BEARER_TOKEN;

const FB_PAGE_ID = process.env.FB_PAGE_ID;
const FB_PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;

const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const LINKEDIN_AUTHOR_URN = process.env.LINKEDIN_AUTHOR_URN;

// ======================
// X (TWITTER) POST
// ======================
async function postToX(text) {
  try {
    const res = await axios.post(
      "https://api.twitter.com/2/tweets",
      { text },
      {
        headers: {
          Authorization: `Bearer ${X_BEARER_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ X posted:", res.data.data.id);
  } catch (err) {
    console.error("❌ X error:", err.response?.data || err.message);
  }
}

// ======================
// FACEBOOK PAGE POST
// ======================
async function postToFacebook(message) {
  try {
    const url = `https://graph.facebook.com/${FB_PAGE_ID}/feed`;

    const res = await axios.post(url, null, {
      params: {
        message,
        access_token: FB_PAGE_ACCESS_TOKEN
      }
    });

    console.log("✅ Facebook posted:", res.data.id);
  } catch (err) {
    console.error("❌ Facebook error:", err.response?.data || err.message);
  }
}

// ======================
// LINKEDIN POST
// ======================
async function postToLinkedIn(text) {
  try {
    const url = "https://api.linkedin.com/v2/ugcPosts";

    const body = {
      author: LINKEDIN_AUTHOR_URN,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text
          },
          shareMediaCategory: "NONE"
        }
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
      }
    };

    const res = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      }
    });

    console.log("✅ LinkedIn posted:", res.data.id);
  } catch (err) {
    console.error("❌ LinkedIn error:", err.response?.data || err.message);
  }
}

// ======================
// MASTER POSTER
// ======================
async function postToPlatforms(post) {
  const text = post.twitter || post.content || "";

  console.log("\n🚀 Posting:", post.keyword || "unknown");

  await Promise.all([
    postToX(text),
    postToFacebook(post.facebook || text),
    postToLinkedIn(post.linkedin || text)
  ]);
}

module.exports = { postToPlatforms };
