/*
Min G U29579643
The following program demostrates the different capabilities 
of the Cheerio.js module, its methods, and selectors
The sample website used is that of a finctional bookstore 
imitating teh layout of retail websites like Amazon.com
*/


const axios = require('axios');
const cheerio = require('cheerio');
const pretty = require("pretty");
const url = 'http://quotes.toscrape.com/';


axios.get( url )
  .then(function (response) {
    // handle success
    const $ = cheerio.load(response.data );
		let els = $('.container').children();

    //print ethe names of child elements within container
		els.each(function (idx, el) { 
			console.log( "\nElement #" + idx + " with class:  ");
			console.log( $(el).attr('class') );
		});//end each
     //access first child (in this case, it's the header)
		 let first = els.first();
		 //access next sibling 
		 let next = first.next();
		 console.log("\nHtml of first element: ");
		 console.log( pretty(first.html()) );

		 console.log("\n\nClass of second element: " + next.attr('class') );
		 //access parent
		 console.log("\n\nClass of parent : " + (first.parent()).attr('class'));
    //we can access attributes with .attr() - returns a list of all attrs (class, id, etc )
    
    //we can filter elements
    let allEls = $('*');
    //An element is included in the filtered list only if it contains more than three children.
    let filteredEls = allEls.filter(function (i, el) {
        // this === el
        return $(this).children().length > 3;
    });
    //print filtered items
    let items = filteredEls.get();
    items.forEach(e => {
        console.log( e.name + " with " + $(e).children().length + " children");
    });

  })//end then
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

