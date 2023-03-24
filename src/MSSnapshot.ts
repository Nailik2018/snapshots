import {Browser} from 'puppeteer-core';

class MSSnapshot {

    private _browser: Browser;
    private _email?: any;
    private _password?: any;

    constructor(browser: any) {
        this._browser = browser;
    }

    get browser(): Browser {
        return this._browser;
    }


    get email(): any {
        return this._email;
    }

    get password(): any {
        return this._password;
    }

    set browser(value: Browser) {
        this._browser = value;
    }

    set email(value: any) {
        this._email = value;
    }

    set password(value: any) {
        this._password = value;
    }

    async getScreenshot(url: string, filename: string) {

        const EMAIL_SELECTOR = 'input[type="email"]';
        const PASSWORD_SELECTOR = 'input[type="password"]';
        const SIGN_IN_SELECTOR = 'input[type="submit"][value="Sign in"]';
        const NEXT_BUTTON_SELECTOR = '#idSIButton9';

        try{
            const page = await this._browser.newPage();
            await page.goto(url, {waitUntil: 'networkidle2'});

            await page.type(EMAIL_SELECTOR, this._email);
            await page.click(NEXT_BUTTON_SELECTOR);

            // https://stackoverflow.com/questions/50074799/how-to-login-in-puppeteer

            await page.waitForSelector(PASSWORD_SELECTOR);
            await page.type(PASSWORD_SELECTOR, this._password);
            // await page.click(SIGN_IN_SELECTOR);

            await page.screenshot({ path: filename });



            // Warten
            // await page.waitForNavigation();

            await this._browser.close();
        }catch (error){
            console.log('MSPuppeteer Error:', error);
        }


        // const page = await this._browser.newPage();
        // await page.goto(url, {waitUntil: 'networkidle2'}); // best result for loaded site
        // await page.screenshot({ path: filename });
        // await this._browser.close();
        // await page.type('input[name="loginfmt"]', this._email );
        // await page.click('input[type="submit"][value="Next"]');
        //
        // // Fill in the password and click the "Sign in" button
        // await page.waitForSelector('input[name="passwd"]');
        // await page.type('input[name="passwd"]', this._password);
        // await page.click('input[type="submit"][value="Sign in"]');
        //
        // // Wait for the login process to complete
        // await page.waitForNavigation();
        //
        // await page.goto(url, {waitUntil: 'networkidle2'}); // best result for loaded site
        // await this._browser.close();
    }
}

export {MSSnapshot};