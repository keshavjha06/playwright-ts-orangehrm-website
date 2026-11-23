import { expect, test } from "@playwright/test";
import { Env } from "@e2e/frameworkConfig/env";
import { faker } from "@faker-js/faker";

test("Add Employee", async ({ page }) => {
  await page.goto(Env.BASE_URL);
  await page.getByPlaceholder("Username").fill(Env.USERNAME);
  await page.getByPlaceholder("Password").fill(Env.PASSWORD);
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("link", { name: "PIM" }).click();
  await page.getByRole("link", { name: "Add Employee" }).click();
  await page.getByPlaceholder("First Name").click();
  await page.getByPlaceholder("First Name").fill("sdfhsd");
  await page.getByPlaceholder("Middle Name").fill("skjdfsf");
  await page.getByPlaceholder("Last Name").fill("sfgdsdf");
  await page
    .locator(".oxd-input-group")
    .filter({ hasText: "Employee Id" })
    .getByRole("textbox")
    .fill(faker.number.int({ min: 100000, max: 9999999 }).toString());
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText(/Successfully Saved/i)).toBeVisible();
});
