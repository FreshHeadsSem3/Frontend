const { Builder, By, Key, until } = require('selenium-webdriver');

async function TestCreateDeal() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:4200/');
        await driver.findElement(By.id('login')).click();
        await driver.findElement(By.id('email')).sendKeys('lacoste@live.nl');
        await driver.findElement(By.id('password')).sendKeys('hoi123');
        await driver.findElement(By.id('submitBT')).click();
        await driver.sleep(1000);
        await driver.findElement(By.id('addDeal')).click();
        await driver.sleep(1000);
        await driver.findElement(By.id('dealNaam')).sendKeys('TestDeal');
        await driver.sleep(1000);
        await driver.findElement(By.id('dealBeschrijving')).sendKeys('TestBeschrijving');
        await driver.sleep(1000);
        await driver.findElement(By.id('dealPrijs')).sendKeys('100');
        await driver.sleep(1000);
        await driver.findElement(By.id('dealVerzendenBT')).click();
        await driver.sleep(1000);
        let currentUrl = await driver.getCurrentUrl();
        if (currentUrl === "http://localhost:4200/alldeals") {
            console.log("Test Passed: deal created.");
        } else {
            console.log("Test Failed: Did not navigate to the correct page.");
        }
    }
    catch (error) {
        console.error("Test Failed:", error);
    } finally {
        await driver.quit();
    }
}