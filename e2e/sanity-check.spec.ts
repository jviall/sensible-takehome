import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Nearby Places/);
});

test("code-gen test", async ({ page, browserName, isMobile }) => {
  await page.goto("/");

  await page
    .getByRole("combobox", { name: "Location" })
    .selectOption(
      '{"name":"Malibu, CA","center":{"lat":34.0259,"lng":-118.7798}}'
    );
  await page.getByPlaceholder("Search").click();
  await page.getByPlaceholder("Search").type("Tumby's Pizza", { delay: 10 });
  await page.waitForLoadState("networkidle", { timeout: 3000 });

  await page.screenshot({
    path: `e2e-results/${browserName}/tumbys-pizza-results${
      isMobile ? "-mobile" : ""
    }.png`,
    fullPage: true,
  });
  await page
    .getByRole("listitem")
    .filter({
      hasText: "1041 W Manchester Blvd, Inglewood, CA 90301, USA",
    })
    .locator("summary")
    .click();
});
