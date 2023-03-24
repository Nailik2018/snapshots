import {Browser} from "puppeteer";

class PuppeteerImage {

    private _browser: Browser;
    constructor(browser: any) {
        this._browser = browser;
    }

    get browser(): Browser {
        return this._browser;
    }

    set browser(value: Browser) {
        this._browser = value;
    }

    async getScreenshot(url: string, filename: string) {
        const page = await this._browser.newPage();
        await page.goto(url, {waitUntil: 'networkidle2'}); // best result for loaded site
        await page.screenshot({ path: filename });
        await this._browser.close();
    }
}

export {PuppeteerImage};