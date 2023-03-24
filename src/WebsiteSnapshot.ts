import {Browser} from 'puppeteer';
import {BaseSnapshot} from './BaseSnapshot';

// class WebsiteSnapshot extends Snapshot{
class WebsiteSnapshot{

    private _browser: Browser;
    constructor(browser: any) {
        // super(browser);
        this._browser = browser;
    }

    get browser(): Browser {
        return this._browser;
    }

    set browser(value: Browser) {
        this._browser = value;
    }

    // async getScreenshot(url: string, filename: string){
    //     const getScreenshot = this.getScreenshot(url, filename);
    // }

    async getScreenshot(url: string, filename: string) {
        const page = await this._browser.newPage();
        await page.goto(url, {waitUntil: 'networkidle2'}); // best result for loaded site
        await page.screenshot({ path: filename });
        await this._browser.close();
    }
}

export {WebsiteSnapshot};