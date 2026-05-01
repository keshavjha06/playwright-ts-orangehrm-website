import { test, expect } from "@playwright/test";

test("GET /users", async ({ request }) => {
  const response = await request.get("https://jsonplaceholder.typicode.com/users");
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body[0].id).toBe(1);
});
