var db = require("./../models");

module.exports = function(app) {
    app.get("/api/notes/:id", (req, res) => {
        let id = req.params.id;
        db.Article.find({_id: id})
        .populate("notes")
        .then(results => {
            res.json(results)
        })
    });

    app.post("/api/notes/:id", (req, res) => {
        let id = req.params.id;
        console.log(req.body)
        db.Comment.create(req.body)
        .then(dbNote => {
            return db.Article.findOneAndUpdate({_id: id}, { $push: { notes: dbNote._id } }, { new: true });
        })
        .then(article => {
            res.json(article)
        })
    })
};
