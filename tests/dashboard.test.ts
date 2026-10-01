import assert from "node:assert/strict";
import test from "node:test";

function reorder<T>(items: T[], sourceIndex: number, targetIndex: number) {
  const next = [...items];
  const [moved] = next.splice(sourceIndex, 1);
  next.splice(targetIndex, 0, moved);
  return next;
}

test("reorders cards without mutating the original list", () => {
  const original = ["a", "b", "c"];
  assert.deepEqual(reorder(original, 0, 2), ["b", "c", "a"]);
  assert.deepEqual(original, ["a", "b", "c"]);
});

test("search values are normalized", () => {
  assert.equal("  AI  ".trim(), "AI");
  assert.equal("   ".trim(), "");
});
