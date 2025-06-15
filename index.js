import express from "express";
import { v4 as uuidv4 } from "uuid";
import UrlModel from "./linkModel.js";
import connect from "./db.js";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/abc123", async (req, res) => {
  try {
    const originalUrl = "https://example.com/very-long-url";

    console.log("originalUrl", originalUrl);
    const shortId = uuidv4();
    const shortUrl = `http://localhost:${port}/${shortId}`;
    const saveShortLink = await UrlModel.create({
      shortUrl,
      originalUrl,
      visit: 0,
    });
    res.json({
      saveShortLink,
      originalUrl,
    });
  } catch (error) {
    console.log("error", error);
  }
});

app.get("/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;
    const shortUrl = `http://localhost:${port}/${shortId}`;

    const updatedUrlModel = await UrlModel.findOneAndUpdate(
      { shortUrl },
      { $inc: { visit: 1 } },
      { new: true }
    );

    console.log("total visit is", updatedUrlModel.visit);
    const originalUrl = updatedUrlModel.originalUrl;
    res.redirect(originalUrl);
  } catch (error) {
    console.log("error", error);
  }
});
connect();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
