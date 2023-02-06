const express = require("express");
const app = express();
const port = process.env.PORT || 8035;
app.listen(port, () => {
  console.log("The server is running on port " + port);
});

const mongoose = require("mongoose");
const { username, password } = require("./mongo-login.js");
const connectionString = `mongodb+srv://${username}:${password}@cluster0.aisjwrg.mongodb.net/?retryWrites=true&w=majority`;
const connectionCallback = () => {
  console.log("Connected to MongoDB");
};
mongoose.set("strictQuery", false);
mongoose
  .connect(connectionString)
  .then(connectionCallback)
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, _res) => {
  console.log("Requesting the main page", req.url);
});
app.get("/about", (req, _res) => {
  console.log("Requesting the about page", req.url);
});

const Feature = new mongoose.Schema({
  feature: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

app.post("/api/features/new", async (req, res) => {
  const feature = new Feature({
    feature: req.body.feature,
    version: req.body.version,
    year: req.body.year,
  });
  try {
    const response = await feature.save();
    res.json(response);
  } catch (error) {
    res.json({ error });
  }
});
app.get("/api/features", async (req, res) => {
  const features = await Feature.find();
  res.json(features);
})
