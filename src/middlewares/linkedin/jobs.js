const puppeteer = require('puppeteer');
require('dotenv').config()

// messages.
async function getJob(tech){

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.linkedin.com/home/?originalSubdomain=br');
    await page.waitFor(2000);
    await page.click('[class=nav__button-secondary]');
    await page.waitFor(2000);

    //---------  INSERT YOUR LINKEDIN CREDENTIALS --------------

    await page.type('[name=session_key]',process.env.LINKEDIN_EMAIL);
    await page.type('[type=password]',process.env.LINKEDIN_PASS);
    
    //-------------------------------------------------------------- 

    await page.click('[type=submit]');
    await page.waitFor(2000);
    await page.goto(`https://www.linkedin.com/jobs/search/?geoId=100358611&keywords=${tech}%20&location=Minas%20Gerais%2C%20Brasil`);
    const data  =  await page.evaluate(()=>{
    const list = document.querySelectorAll('#ember4 > div.application-outlet > div.authentication-outlet > section.job-search-ext.job-search-ext--two-pane > div.jobs-search-two-pane__wrapper.jobs-search-two-pane__wrapper--two-pane > div > div > div.jobs-search-two-pane__results.display-flex > div.jobs-search-results.jobs-search-results--is-two-pane > div > ul'); 
    const res  = document.location.href;
      return{
        response : res,
        data : list[0].innerText
      }
    });
    console.log(data);
    await browser.close();
    return(data.data);
}


module.exports = {getJob}