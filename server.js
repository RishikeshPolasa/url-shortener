const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./model/shortUrl");

const app = express();

mongoose.connect("mongodb://localhost/urlShortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false })); //to access the parameters from req.body

app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});

app.post("/shortUrls", async (req, res) => {
  console.log(req.body.fullUrl);
  await ShortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");
});

app.listen(process.env.PORT || 5000);
