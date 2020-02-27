const puppeteer = require('puppeteer');
require('dotenv').config()


async function mandaNude(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.xvideos.com/');
      
    let url  = await page.evaluate(()=>{
      var images  = document.getElementsByTagName('img')
       return(images[0].src);
    })
    await browser.close();
    return(url);
}


module.exports = {mandaNude}