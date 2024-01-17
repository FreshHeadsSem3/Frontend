const { Builder, By, Key, until } = require('selenium-webdriver');

async function TestClaimDeal() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:4200/deal?data=%22857f0b75-9e4f-4cdb-a3a7-1e4eae2d3706%22');
        await driver.sleep(1000);
        await driver.findElement(By.id('IkDoeMeeBT')).click();
        await driver.sleep(1000);
        let email = By.id('Email');
        await driver.wait(until.elementLocated(email), 10000);
        await driver.wait(until.elementIsEnabled(await driver.findElement(email)), 10000);
        await driver.findElement(email).sendKeys('edudeals@outlook.com');
        let dealVerzenden = By.id('dealVerzendenBT');
        await driver.wait(until.elementLocated(dealVerzenden), 10000);
        await driver.wait(until.elementIsEnabled(await driver.findElement(dealVerzenden)), 10000);
        await driver.findElement(dealVerzenden).click();

        

        // Optionally, check if the URL is correct
        await driver.sleep(1000);
        let currentUrl = await driver.getCurrentUrl();
        if (currentUrl === "http://localhost:4200/alldeals") {
            console.log("Test Passed: deal claimed.");
        } else {
            console.log("Test Failed: Did not navigate to the correct page.");
        }
    } catch (error) {
        console.error("Test Failed:", error);
    } finally {
        await driver.quit();
    }
}
TestClaimDeal();