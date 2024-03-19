const express = require("express");
const fs = require("fs");
const router = express.Router();
const path = require('path');

router.get("/", (req, res) => {
    let formParameters = `action=/newmessage method=post`;
    res.render("pages/newmessage", { active: { newmessage: true }, formParameters: formParameters });
});

router.post("/", (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'guestbook.json');

    // Reading the JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("An error occurred while reading the file.");
        }

        var data = JSON.parse(data);

        var newEntry = {
            id: data.length + 1,
            username: req.body.username,
            country: req.body.country,
            date: new Date(),
            message: req.body.message,
        };

        data.push(newEntry);

        // Writing to the JSON file
        fs.writeFile(filePath, JSON.stringify(data, null, 4), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("An error occurred while writing the file.");
            }
            res.send("New entry added to the guestbook.");
        });
    });

    res.redirect("/guestbook");
});

module.exports = router;
