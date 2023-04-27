import { Controller, Get } from '@midwayjs/core';

import puppeteer from 'puppeteer';

@Controller('/')
export class HomeController {
  @Get('/puppeteer')
  async home(): Promise<string> {
    const browser = await puppeteer.launch({
      headless: 'new',
    });
    const page = await browser.newPage();
    await page.goto('https://www.ainavpro.com');
    await page.waitForSelector('.url-body');
    const element = await page.$('.url-body');
    const list = await element.$$('a[data-url]'); // 获取所有 <a> 子元素
    const result = [];
    for (const u of list) {
      const dataProperty = await u.evaluate(t => {
        return {
          dataUrl: t.getAttribute('data-url'),
          dataOriginalTitle: t.getAttribute('data-original-title'),
        };
      });
      result.push({
        href: dataProperty,
      });
    }
    console.log(JSON.stringify(result));
    await browser.close();

    return 'puppeteer!';
  }
}
