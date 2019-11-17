'use strict';

const puppeteer = require('puppeteer');

(async() => {
  let url = "http://ec2-18-221-228-218.us-east-2.compute.amazonaws.com/shop?load_products=1&min_price=0&max_price=596&filters_applied=1&options=1&options_value=3&Colors%5B%5D=Red&type=desc&limit=15&page_number=1";
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', request => {
    if (request.resourceType() === 'image' || request.resourceType() == 'stylesheet' || request.resourceType() == 'font')
      request.abort();
    else
      request.continue();
  });
  await page.goto(url);
  await page.screenshot({path: 'screen_text.png', fullPage: true});

  let data = await page.evaluate(() => {
        let products = [];
        let productsElms = document.querySelectorAll('div.block-panel');
        productsElms.forEach((productelement => {
            let productJson = {};
            try {
                productJson.description = productelement.querySelector('h2.title').innerText;
                productJson.price = productelement.querySelector('div.price').innerText;
            }
            catch (e) {
                console.log("Exception found:" + e.message);
            }
            products.push(productJson);
        }))
        return products;
    })
    console.log(data);
    debugger;
    await browser.close();
})();

