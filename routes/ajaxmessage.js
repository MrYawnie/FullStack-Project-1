const express = require("express");
const fs = require("fs");

const router = express.Router();
const path = require('path');

const guestbookPath = path.join(__dirname, '..', 'public', 'guestbook.json');

router.get("/", (req, res) => {
    fs.readFile(guestbookPath, "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .send("An error occurred while reading the file.");
        }
    
        let guestbookData = JSON.parse(data);
        let formParameters = ``;
    
        res.render("pages/ajaxmessage", { guestbookData, active: { ajaxmessage: true }, formParameters: formParameters});
      });
});

router.post("/", (req, res) => {
    fs.readFile(guestbookPath, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("An error occurred while reading the file.");
        }
        var guestbookData = JSON.parse(data);

        var newEntry = {
            id: guestbookData.length + 1,
            username: req.body.username,
            country: req.body.country,
            date: new Date(),
            message: req.body.message,
        };

        guestbookData.push(newEntry);

        fs.writeFile(guestbookPath, JSON.stringify(guestbookData, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("An error occurred while writing the file.");
            }
            res.json(newEntry);
        });
    });
});

module.exports = router;