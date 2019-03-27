var path = require("path");
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./../models");

module.exports = function(app) {
    app.get("/", (req, res) => {
    scrape.then(result => {
        var hbsObject = {
            stories: result
        }
        console.log(hbsObject)
        res.render("index", hbsObject)
    })
});

var scrape = new Promise((resolve, reject) => {
    axios.get("https://www.hearthpwn.com/").then(function(response) {
        var respArr = [];

        var $ = cheerio.load(response.data);
    
        $("article").each(function(i, element) {
          var result = {};
    
          var title = $(element).find($(".the-info")).children("h2").children("a").text()
          var summary = $(element).find($(".the-info")).children("p").text();
          var url = $(element).find($(".the-info")).children("h2").children("a").attr("href")
          result.title = title;
          result.summary = summary;
          result.url = url
          respArr.push(result)
        });
        if (respArr) resolve(respArr)
        else reject("Error")
    });
})
};
