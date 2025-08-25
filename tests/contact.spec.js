import { expect, test } from "@playwright/test";
import { ContactPage } from "../pageObjects/contact.po.js";
import { LoginPage } from "../pageObjects/login.po.js";
const testData = require("../fixtures/contactFixturem.json");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  const login = new LoginPage(page);
  await login.login("pranavkarmacharya@gmail.com", "pranavkarmacharya123");
  await login.verifyValidlogin();
});

test.describe("Valid contact tests", () => {
  test("Valid Contact", async ({ page }) => {
    const contact = new ContactPage(page);

    await contact.addContact(
      testData.validContact.FirstName,
      testData.validContact.LastName,
      testData.validContact.DateofBirth,
      testData.validContact.Email,
      testData.validContact.Phone,
      testData.validContact.StreetAddress1,
      testData.validContact.StreetAddress2,
      testData.validContact.City,
      testData.validContact.StateofProvience,
      testData.validContact.postalCode,
      testData.validContact.Country
    );
    
    await contact.verifyValidContact();
  });
    test('Contact Edit test',async ({page, request}) => {
    constData = {
      "firstName": "John",
      "lastName": "Doe",
      "birthdate": "1980-06-30",
      "email": "johndoe@gmail.com",
      "phone": "9898989898",
      "street1": "Address1",
      "city": "City1",
      "stateProvince": "State1",
      "postalCode": "12345",
      "country": "Nepal"
    };
    const contact = new ContactPage(page);
    accessToken = await authenticateUser(testData.validUser.userName, testData.validLogin.password, {request});
    await createEntity(DataTransfer, accessToken, '/contacts', {request});
    page.reload();
    await contact.viewContact();
    await contact.contctEdit(contactTestData.contactEdit.firstName);
    await contact.validateContactCreated(contactTestData.contactEdit.firstName, contactTestData.contactEdit.lastName, contactTestData.contactEdit.birthdate, contactTestData.contactEdit.email, contactTestData.contactEdit.phone, contactTestData.contactEdit.street1, contactTestData.contactEdit.city, contactTestData.contactEdit.stateProvince, contactTestData.contactEdit.postalCode, contactTestData.contactEdit.country)
  });
  test('Contact Delete test',async ({page, request}) => {
    constData = {
      "firstName": "John",
      "lastName": "Doe",
      "birthdate": "1980-06-30",
      "email": "johndoe@gmail.com",
      "phone": "9898989898",
      "street1": "Address1",
      "city": "City1",
      "stateProvince": "State1",
      "postalCode": "12345",
      "country": "Nepal"
    };
    const contact = new ContactPage(page);
    accessToken = await authenticateUser(testData.validUser.userName, testData.validLogin.password, {request});
    await createEntity(Data, accessToken, '/contacts', {request});
    page.reload();
    await contact.viewContact();
    const id = await getEntity(accessToken, '/contacts', '200', {request});
    await contact.contactDelete(accessToken, `/contacts/${id}`, '404', {request});
  });

  test.afterEach(async({page}) => {
    await page.close();
  })
});