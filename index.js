
var webdriver = require('selenium-webdriver');
var momnet = require('moment');

var chrome = require('selenium-webdriver/chrome');
var option = new chrome.Options();

let By = webdriver.By;

// Profile Setting
option.addArguments("--user-data-dir=/home/sys-user/.config/google-chrome/Default");
const url = 'https://people.mookambikainfo.com/smihrms/zp#home/dashboard';

const start = async () => {

    const isCheckIn = momnet().isBetween(momnet().hour(9).minute(30), momnet().hour(9).minute(35));
    const isCheckout = momnet().isBetween(momnet().hour(21).minute(28), momnet().hour(21).minute(33));
    console.clear();
    console.log("Zoho Attendance - Auto Check-in check-out")
    console.log("Last Check at: - " + momnet().format('hh:mm:ss A'));
    if (isCheckout) {
        var driver = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.chrome())
            .setChromeOptions(option.headless()).build();

        await driver.get(url);

        const name = await driver.findElement(By.id('ZPD_Top_Att_Stat')).getText();
        console.log('checkout triggers status: ' + name);

        if (name.includes('Check-out')) {
            console.log('Check-out Completed');
            await driver.findElement(By.id('ZPD_Top_Att_Stat')).click();
        }
        setTimeout(() => {
            driver.close();
        }, 2000);
        return;
    }

    if (isCheckIn) {
        var driver = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.chrome())
            .setChromeOptions(option.headless()).build();

        await driver.get(url);
        const name = await driver.findElement(By.id('ZPD_Top_Att_Stat')).getText();
        console.log('checkIn triggers status: ' + name);

        if (name.includes('Check-in')) {
            console.log('Check-in Completed');

            await driver.findElement(By.id('ZPD_Top_Att_Stat')).click();
        }
        setTimeout(() => {
            driver.close();
        }, 2000);
        return;
    }
}

// Start the Program
setInterval(start, 1000 * 60)
start();