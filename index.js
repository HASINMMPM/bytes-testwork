// long koduthal short return kodukkum
// short koduthal long return kodukkannam and visit +1
// 2.20
import express from "express";
import { v4 as uuidv4 } from "uuid";
import UrlModel from "./linkModel.js";
import connect from "./db.js";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/shorten", async (req, res) => {
  const  originalUrl ="https://example.com/very-long-url"

  console.log("originalUrl", originalUrl);
  const shortId = uuidv4();
  const shortUrl = `http://localhost:${port}/${shortId}`;
  const saveShortLink = await UrlModel.create({
    shortUrl,
    visit: 0,
  });

  res.json({
    saveShortLink,
    originalUrl,
  });
});

app.get("/:shortId", (req, res) => {
  const { shortId } = req.params;
  const originalUrl = urlDatabase[shortId];

  if (originalUrl) {
    console.log("originalUrl", originalUrl);
    return res.redirect(originalUrl);
  }

  res.status(404).json({ error: "Short URL not found" });
});
connect()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
