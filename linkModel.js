import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortUrl: {
      type: String,
      require: true,
    },
    originalUrl: {
      type: String,
      require: true,
    },
    visit: {
      type: Number,
    },
  },
  { timestamps: true }
);
const UrlModel = mongoose.model("Url", urlSchema);
export default UrlModel;
