/*
Min G U29579643
The follwing program uses the Puppeteer headless browser module for 
retrieving elements from a dynamic website
In this case, we scrape a a subreddit to retrieve all post titles and 
subsequently print them on the console
*/

//import puppeter module for running a headless browser
const puppeteer = require('puppeteer');

//function to launch the browser and return an instance of it 
async function initBrowser(){
    let browser;

    try {
        console.log("starting up...");
				//create an instance of browser with .launch()    
				//returns a promise, which is why we need the await block
				//enclose in try/catch block to ensure promise resolves
				browser = await puppeteer.launch({
            headless: false,
            args: ["--disable-setuid-sandbox"],
            'ignoreHTTPSErrors': true
        });//end launch
    }	catch (err) {
      console.log("Error launching... " + err);
    }
  return browser;
}

//wrapper function to pass browser instance to the scraper 
//and ensure that it launches properly 
async function scrapeAll(browserObj){
    let browser;
    try {
        browser = await browserObj;
        await scraperObject.scraper(browser);
    }
    catch(err){
        console.log(err);
    }
}

//create object literal 
const scraperObject = {
	  //target url (can be altered)
    url: 'http://reddit.com/r/programing',
    
		//code that performs scraping 
    async scraper(browser){
			  //'open' new browser tab
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
				//navigate newly created tab to target webpage
        await page.goto(this.url);
       
			 //get the outer DOM element
        await page.waitForSelector('#siteTable');
        // Get titles of all posts
        let titles = await page.$$eval('div > p.title > a');
        console.log(titles);
    }
}


//initialize browser, save the returned browser instance in a var
let browserInstance = browserObject.initBrowser();

// pass the returned browser object to the scraper 
scraperController(browserInstance)