const axios = require('axios');
const cheerio = require('cheerio');

const museumUrl = 'https://fotokino.org/en/studio-fotokino/';

const text = {
  bold: "\x1b[1m",
  stop: "\x1b[0m"
}

axios.get(museumUrl)
  .then(response => {
    const $ = cheerio.load(response.data);

    // Locate and extract relevant information
    const events = $('.event');

    console.log("Event Photokino")
    events.each((index, element) => {
      const date = $(element)
        .find('.evoet_dayblock ')
        .text();
      const from = $(element)
        .find('.evo_start')
        .text()
      const to = $(element)
        .find('.evo_end')
        .text()
      const title = $(element)
        .find('.evoet_title')
        .text();
      const tags = $(element)
        .find('.evcal_desc')
        .text()

      // Add the data to your calendar or store it in a preferred format
      console.log(`${text.bold}${title}${text.stop} \n\tDate: ${from} -> ${to}\n\tTags: ${tags}\n`);
    });
  })
  .catch(error => console.error('Error fetching data:', error));
