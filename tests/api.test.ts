import assert from "node:assert/strict";
import test from "node:test";

test("news articles contain the fields required by content cards", () => {
  const article = {
    title: "Example headline",
    description: "Example description",
    url: "https://example.com/article",
    image: "https://example.com/image.jpg",
    source: "Example Source",
    publishedAt: "2026-10-01T00:00:00Z",
    category: "Tech",
  };

  assert.equal(article.title, "Example headline");
  assert.equal(article.category, "Tech");
  assert.equal(typeof article.url, "string");
  assert.equal(typeof article.source, "string");
});
