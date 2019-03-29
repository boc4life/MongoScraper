var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./../models");

module.exports = function(app) {

    app.get("/", (req, res) => {
    scrape().then(result => {
      console.log(result)
      let hbsObject = {}
      db.Article.find().sort({_id:-1}).limit(20)
      .populate("notes")
      .then(populated => {
        hbsObject.stories = populated
        res.render("index", hbsObject)
      })
    });
});

};

function scrape() {
  return new Promise((resolve, reject) => {
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

          db.Article.create(result)
          .then(function(dbArticle) {
            console.log(dbArticle);
          })
          .catch(function(err) {
            console.log(err);
          });
        });
        if (respArr) resolve(respArr)
        else reject("Error")
    });
})
}
