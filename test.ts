import {PuppeteerImage} from './PuppeteerImage';
import puppeteer from 'puppeteer';
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

async function run() {
    for (const site of sites) {
        let puppeteerImage = new PuppeteerImage(await puppeteer.launch({executablePath: pathToChromeExe, headless: true, defaultViewport: {width: width, height: height}}));
        await puppeteerImage.getScreenshot(site.url, site.filename);
    }
    process.exit();
}

run();