
const { Builder, By, Key, until } = require('selenium-webdriver');

async function TestNavigateToLogin() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:4200/');
        await driver.findElement(By.id('login')).click();

        let loginPageElement = By.id('submitBT'); 
        await driver.wait(until.elementLocated(loginPageElement), 10000);

        let currentUrl = await driver.getCurrentUrl();
        if (currentUrl === "http://localhost:4200/login") {
            console.log("Test Passed: Navigated to login page.");
        } else {
            console.log("Test Failed: Did not navigate to the correct page.");
        }
    } catch (error) {
        console.error("Test Failed:", error);
    } finally {
        await driver.quit();
    }
}



async function TestLogin() {
    TestNavigateToLogin();
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:4200/login');
        await driver.findElement(By.id('email')).sendKeys('lacoste@live.nl');
        await driver.findElement(By.id('password')).sendKeys('hoi123');
        await driver.findElement(By.id('submitBT')).click();

        let loginPageElement = By.id('logout'); 
        await driver.wait(until.elementLocated(loginPageElement), 10000);

        let currentUrl = await driver.getCurrentUrl();
        if (currentUrl === "http://localhost:4200/") {
            console.log("Test Passed: Logged in.");
        } else {
            console.log("Test Failed: Did not navigate to the correct page.");
        }
    } catch (error) {
        console.error("Test Failed:", error);
    } finally {
        await driver.quit();
    }
}
TestLogin();