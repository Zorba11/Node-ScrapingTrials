const request = require("request-promise");
const cheerio = require("cheerio");

const url = "https://montreal.craigslist.org/d/jobs/search/jjj?lang=en&cc=us";

const scrapeSample = {
  title: "Technical autonomous vehicle technician",
  description: "Long text on job....rquiremtns etc",
  datePosted: new Date(2019 - 02 - 20),
  url:
    "https://montreal.craigslist.org/tch/d/montreal-field-service-technician-canada/6824030751.html?lang=en&cc=us",
  neighberhood: "Montreal,Quebec",
  address: "1927 Rue Dufresne",
  compensation: "18$/hr"
};

const scrapeResults = [];

async function scrapeJobHeader() {
  try {
    //getting the html of the page in string
    const htmlResult = await request.get(url);

    //using cheerio to select different elements

    const $ = await cheerio.load(htmlResult);

    $(".result-info").each((index, element) => {
      const resultTitle = $(element).children(".result-title");
      const title = resultTitle.text();
      const url = resultTitle.attr("href");
      const datePosted = new Date(
        $(element)
          .children("time")
          .attr("datetime")
      );

      const neighberhood = $(element)
        .find(".result-hood")
        .text();

      const scrapeResult = { title, url, datePosted, neighberhood };
      scrapeResults.push(scrapeResult);
    });

    return scrapeResults;
  } catch (err) {
    console.error(err);
  }
}

async function scrapeDescription(jobsWithHeaders) {
  await Promise.all(
    jobsWithHeaders.map(async job => {
      const htmlResult = await request.get(job.url);
   const $ = await cheerio.load(htmlResult);
   $(".print-qrcode-container").remove();
   job.description = $("#postingbody").text();
job.address = 
    })
  );
}

async function scrapeCraigslist() {
  const jobsWithHeaders = await scrapeJobHeader();
  const jobsFullData = await scrapeDescription(jobsWithHeaders);

}

scrapeCraigslist();
