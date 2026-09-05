import assert from "node:assert/strict";
import test from "node:test";

import { formatKey, getAuthenticationAttempts } from "./nfcAuth.ts";

test("QIDI tags try factory-default and vendor key variants before failing auth", () => {
  const attempts = getAuthenticationAttempts(1);

  assert.deepEqual(
    attempts.map(([method, key]) => [method, formatKey(key)]),
    [
      ["A", "ffffffffffff"],
      ["B", "ffffffffffff"],
      ["A", "d3f7d3f7d3f7"],
      ["B", "d3f7d3f7d3f7"],
    ],
  );
});
