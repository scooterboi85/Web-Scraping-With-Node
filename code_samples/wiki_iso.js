/*
Min G U29579643
The follwing program parses a wikipedia page to extract 
information on countries and their corresponding ISO3 codes
It also provides a user interface allowing to save the data 
or obtain the code of a specific country
To imrove structure, teh program is split into different methods 
and all data is saved as jason objects
*/
//include dependencies
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require("fs");
const url = 'https://en.m.wikipedia.org/wiki/ISO_3166-1_alpha-3';

//function to write the data to file 
function saveList(countries)
{
	let str = "";
	for (let i = 0; i < countries.length; i++)
	{
		str += ((i + 1) + ". " + countries[i].name + " code: " + countries[i].iso + "\n");
	}

	fs.writeFile('outut.txt', str, err => {
  if (err) {
    console.error(err);
    return; }
	});
}

//function to get the ISO3 code of a given country 
function getCode(list, name)
{
	for(let i = 0; i < list.length; i++)
  {
		if( name.toLowerCase() == (list[i].name).toLowerCase() )
		  return list[i].iso;
	}
	return "Not Found";
}


axios.get(url)
  .then( function ( resp )
	{ 
    const $ = cheerio.load( resp.data ); // Initialize cheerio 
	  let countries = []

		//retrieve all list items in the plainlist class (in this case, it contains )
    const elements = $(".plainlist ul li");
    elements.each(function (idx, el) 
		{ 
			const country = { name: "", iso: "" };
      //country name i contained within a elements
			//iso code is contained in span elements 
      country.name = $(el).children("a").text();
      country.iso = $(el).children("span").text();
      countries.push(country); 
		});
		
		//write retrieved data to file 
    saveList(countries);
    
		//prompt the user for a country name
		//print back its ISO code (or Not Found for invalid input)
		//loop until the user chooses to quit 
		let done = "";
		while (done.toLowerCase() != "yes")
		{
			var name = prompt("Enter country name: ");
      console.log("The corresponding ISO3 code: " + getCode(countries, name));
			done = prompt("End program? (enter yes to quit): ");
		}
		console.log("Bye!");
  });//end then


