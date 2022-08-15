require("dotenv").config();
const axios = require("axios").default;
const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Klima listening at http://localhost:${port}`);
});

app.get("/api/current/:lat/:lon", (req, res, next) => {
  axios
    .get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: req.params.lat,
        lon: req.params.lon,
        units: "metric",
        appid: process.env.OWMKEY,
      },
    })
    .then((weather) => res.status(200).json(weather.data))
    .catch((error) => next(error));
});

app.get("/api/search/:location", (req, res, next) => {
  axios
    .get(`http://api.openweathermap.org/geo/1.0/direct`, {
      params: {
        q: req.params.location,
        limit: 5,
        appid: process.env.OWMKEY,
      },
    })
    .then((results) => {
      res.status(200).json(results.data);
    })
    .catch((error) => next(error));
});
