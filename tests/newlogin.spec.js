import { expect, test } from "@playwright/test";
import { LoginPage } from "../pageObjects/login.po"; 
const testData = require('../fixtures/loginFixtures.json');

test.beforeEach(async({page})=>{
    await page.goto('/');
})

test.describe('Valid login tests', () => {
    test('Login using valid usernname and password',async ({page}) => {
        const login=new LoginPage(page);
        await login.login(testData.validLogin.username,testData.validLogin.password);
        await login.verifyValidlogin();
    });
})
test.describe('Invalid login tests', () => {
    test('login using invalid username and valid password',async ({page}) => {
        const login=new LoginPage(page);
        await login.login(testData.invalidLogin.username,testData.validLogin.password);
        await login.verifyInvalidLogin();
    }); 

    test('login using valid username and invalid password',async ({page}) => {
        const login=new LoginPage(page);
        await login.login(testData.validLogin.username,testData.invalidLogin.password);
        await login.verifyInvalidLogin();
    });

    test('login using invalid username and invalid password',async ({page}) => {
        const login=new LoginPage(page);
        await login.login(testData.invalidLogin.username,testData.invalidLogin.password);        
        await login.verifyInvalidLogin();
    });

    test('login using empty username and valid password',async ({page}) => {
        const login=new LoginPage(page);
        await login.login(testData.emptyLogin.username,testData.validLogin.password);
        await login.verifyInvalidLogin();
    });

    test('login using valid username and empty password',async ({page}) => {
        const login=new LoginPage(page);
        await login.login(testData.validLogin.username,testData.emptyLogin.password);        
        await login.verifyInvalidLogin();
    });

    test('login using empty username and empty password',async ({page}) => {
        const login=new LoginPage(page);
        await login.login(testData.emptyLogin.username,testData.emptyLogin.password);        
        await login.verifyInvalidLogin();
    });
})