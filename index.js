const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/guestbook", require("./routes/guestbook"));
app.use("/newmessage", require("./routes/newmessage"));
app.use("/ajaxmessage", require("./routes/ajaxmessage"));

app.get("/", (req, res) => {
  res.render("pages/index", { active: {home: true } });
});


app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}, you may visit http://localhost:${PORT}`
  );
});
