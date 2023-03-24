import puppeteer, {executablePath} from 'puppeteer';

require('dotenv').config();

const pathToChromeExe = process.env.PATH_TO_CHROME_EXE;
const width = 1920;
const height = 1080;

const sites = [
    { url: 'https://www.google.com', filename: './images/google.png' },
    { url: 'https://www.facebook.com', filename: './images/facebook.png' },
    { url: 'https://www.twitter.com', filename: './images/twitter.png' },
    { url: 'https://twitter.com', filename: './images/twitter2.png' },
];

async function takeScreenshot(url: string, filename: string) {
    const browser = await puppeteer.launch({executablePath: pathToChromeExe, headless: false, defaultViewport: {width: width, height: height}});
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({ path: filename });
    await browser.close();
}

async function run() {
    for (const site of sites) {
        await takeScreenshot(site.url, site.filename);
    }
    process.exit();
}

run();