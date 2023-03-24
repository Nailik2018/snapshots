import {WebsiteSnapshot} from './src/WebsiteSnapshot';
import {MSSnapshot} from './src/MSSnapshot';
import puppeteer from 'puppeteer';
require('dotenv').config();

const pathToChromeExe = process.env.PATH_TO_CHROME_EXE;
const width = 1920;
const height = 1080;

const msSites = [
    { url: 'https://login.live.com/', filename: './images/ms.png', email: process.env.MS_EMAIL_ADDRESS_1, password: process.env.MS_EMAIL_PASSWORD_1}
]

const sites = [
    { url: 'https://www.google.com', filename: './images/google.png' },
    { url: 'https://www.facebook.com', filename: './images/facebook.png' },
    { url: 'https://www.twitter.com', filename: './images/twitter.png' },
    { url: 'https://twitter.com', filename: './images/twitter2.png' },
];

async function run() {
    for (const site of sites) {
        let websiteSnapshot = new WebsiteSnapshot(await puppeteer.launch({executablePath: pathToChromeExe, headless: true, defaultViewport: {width: width, height: height}}));
        await websiteSnapshot.getScreenshot(site.url, site.filename);
    }
    for (const msSite of msSites) {
        let msSnapshot = new MSSnapshot(await puppeteer.launch({executablePath: pathToChromeExe, headless: false, defaultViewport: {width: width, height: height}}));
        msSnapshot.email = msSite.email;
        msSnapshot.password = msSite.password;
        await msSnapshot.getScreenshot(msSite.url, msSite.filename)
    }

    process.exit();
}

run();