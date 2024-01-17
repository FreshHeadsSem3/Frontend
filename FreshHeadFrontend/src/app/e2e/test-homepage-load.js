const { Builder, By, Key, until } = require('selenium-webdriver');

async function testHomepageLoad() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:4200/');
        await driver.wait(until.titleIs('FreshHeadFrontend'), 10000);
    } finally {
        await driver.quit();
    }
}

testHomepageLoad();



