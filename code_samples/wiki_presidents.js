/*
Min G U29579643
The follwong program extracts different pieces of information about
US presidents from a corresponding Wikipedia page, transforms the
data into .json format and saves the results in an external file
*/

//import dependencies
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const url = "https://en.m.wikipedia.org/wiki/List_of_presidents_of_the_United_States";
//full selector for name - #content-collapsible-block-0 > table > tbody > tr:nth-child(2) > td:nth-child(4)

//full selector for date - #content-collapsible-block-0 > table > tbody > tr:nth-child(2) > td:nth-child(2) > span:nth-child(1)

//full selector for party -#content-collapsible-block-0 > table > tbody > tr:nth-child(80) > td:nth-child(6)


// Async function which scrapes the data
async function scrapeInfo() {

  try {
    // Fetch HTML of the page we want to scrape
    const resp = await axios.get(url);
    const $ = cheerio.load(resp.data);
    // Select all cells with names/dates of birth/death
		let presidents = []
		let parties = []

    const name_els = $(".wikitable td:nth-child(4)");
		const party_els = $(".wikitable td:nth-child(6)");

		//extract parties info
    party_els.each( (idx, el) => { 
			parties.push( $(el).children("a").text() ); 
		});

    name_els.each((idx, el) => {
      // create composite object for storing data
      const president = { name: "", dobd: "", party: "" };
      //Retrieve 'b a' element (stores name)
      president.name = $(el).children("b").text();
      president.dobd = $(el).children("span").text();
			president.party = parties[idx];
      presidents.push(president);
    });
    // print array 
    console.dir(presidents);
    // Write presidents array to a json file
    fs.writeFile("presidents.json", JSON.stringify(presidents, null, 2),
		(err) => { if (err) {console.error(err);} });//end write
 
  } //end try
	catch (err) {
    console.error(err);
  }
}
// call function
scrapeInfo();