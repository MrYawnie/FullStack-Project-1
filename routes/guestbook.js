const express = require("express");
const fs = require("fs");
const path = require("path"); // Require the path module

const router = express.Router();
router.use(express.json());

router.get("/", (req, res) => {
  // Construct the path to guestbook.json relative to this file's location
  const guestbookPath = path.join(__dirname, "..", "public", "guestbook.json");

  fs.readFile(guestbookPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .send("An error occurred while reading the file.");
    }

    let guestbookData = JSON.parse(data);

    res.render("pages/guestbook", { guestbookData, active: { guestbook: true } });
  });
});

module.exports = router;
