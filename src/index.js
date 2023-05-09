const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = 3000;

// setting directory
const publicDir = path.join(__dirname, "../public");
const viewDir = path.join(__dirname, "../templates/views");
const partialDir = path.join(__dirname, "../templates/partials");

// setting configuration for template
app.set("view engine", "hbs");
app.set("views", viewDir);
hbs.registerPartials(partialDir);

app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    subtitle: "Get weather forecast of location",
    name: "Vikash",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "vikash",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "no address provided",
    });
  }
  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }
      const { location } = data;
      const { forecast: forecastMessage } = forecastData;
      console.log(location);
      console.log(forecastMessage);

      res.send({
        address: req.query.address,
        forecast: forecastMessage,
        location: location,
      });
    });
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "vikash",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404-page", {
    title: "Help",
    message: "Help article not found",
    name: "Vikash",
  });
});
app.get("*", (req, res) => {
  res.render("404-page", {
    title: "404",
    message: "Page not found",
    name: "vikash",
  });
});

app.listen(port, () => {
  console.log("listening on port  ", port);
});
