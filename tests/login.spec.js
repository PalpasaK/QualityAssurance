import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.pinterest.com/login');
});

test("login using valid informations", async ({ page }) => {

  await page.locator('//input[@placeholder="Email"]').click();

  await page.locator('//input[@placeholder="Email"]').fill("karmacharyapranav5@gmail.com");

  await page.locator('//input[@placeholder="Password"]').click();
  
  await page.locator('//input[@placeholder="Password"]').fill("pranav123");

  await page.locator('//div[text()="Log in"]').click();

  await expect(page.getByPlaceholder("Search")).toBeVisible();

  await page.getByPlaceholder("Search").click();

  await page.getByPlaceholder("Search").fill("Automation sucessful");

  await page.keyboard.press('Enter');

  await page.pause();
});
test("login using invalid email", async ({page}) => {

  await page.locator('//input[@placeholder="Email"]').click();

  await page.locator('//input[@placeholder="Email"]').fill("HawaEmailho@gmail.com");

  await page.locator('//input[@placeholder="Password"]').click();

  await page.locator('//input[@placeholder="Password"]').fill("pranar123");

  await page.locator('//div[text()="Log in"]').click().click();

  await expect(page.locator('//span[text()="The email you entered does not belong to any account."]')).toBeVisible();
});

test("login using invalid password", async ({page}) => {

  await page.locator('//input[@placeholder="Email"]').click();

  await page.locator('//input[@placeholder="Email"]').fill("karmacharyapranav5@gmail.com");

  await page.locator('//input[@placeholder="Password"]').click();

  await page.locator('//input[@placeholder="Password"]').fill("pranar1234567890");

  await expect(page.locator('//span[text()="The password you entered is incorrect. Try again or "]')).toBeVisible();
});

test("login using invalid email and password", async ({page}) => {

  await page.locator('//input[@placeholder="Email"]').click();

  await page.locator('//input[@placeholder="Email"]').fill("HawaEmailho@gmail.com");

  await page.locator('//input[@placeholder="Password"]').click();

  await page.locator('//input[@placeholder="Password"]').fill("pranar1234567890");

  await page.locator('//div[text()="Log in"]').click();

  await expect(page.locator('//span[text()="The email you entered does not belong to any account."]')).toBeVisible();

});

test("login using empty email", async ({page}) => {

  await page.locator('//input[@placeholder="Email"]').click();

  await page.locator('//input[@placeholder="Email"]').fill("");

  await page.locator('//input[@placeholder="Password"]').click();

  await page.locator('//input[@placeholder="Password"]').fill("pranar123");

  await page.locator('//div[text()="Log in"]').click();

  await expect(page.locator('//span[text()="You missed a spot! Don\'t forget to add your email."]')).toBeVisible()
});

test("login using empty password", async ({page}) => {

  await page.locator('//input[@placeholder="Email"]').click();

  await page.locator('//input[@placeholder="Email"]').fill("karmacharyapranav5@gmail.com");

  await page.locator('//input[@placeholder="Password"]').click();

  await page.locator('//input[@placeholder="Password"]').fill("");

  await page.locator('//div[text()="Log in"]').click();

  await expect(page.locator('//span[text()="The password you entered is incorrect. Try again or Reset your password"]')).toBeVisible()
});

test("login using empty email and password", async ({page}) => {

  await page.locator('//input[@placeholder="Email"]').click();

  await page.locator('//input[@placeholder="Email"]').fill("");

  await page.locator('//input[@placeholder="Password"]').click();

  await page.locator('//input[@placeholder="Password"]').fill("");

  await page.locator('//div[text()="Log in"]').click();

  await expect(page.getByText("Email is empty"));

  await expect(page.locator('//span[text()="You missed a spot! Don\'t forget to add your email."]')).toBeVisible()
});