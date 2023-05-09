const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibXZpa2FzaDU0NSIsImEiOiJjbGd5anF3c3UwYTJpM3FyejRiNTZvYTRhIn0.WAp0_M7euVw0W7NRr613aw&limit=1`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Something went wrong please retry!");
    } else if (response.body.features.length === 0) {
      callback("Result not found ");
    } else {
      const feature = response.body.features;
      const location = feature[0].place_name;
      const [longitude, latitude] = feature[0].center;
      callback(undefined, {
        longitude,
        latitude,
        location,
      });
    }
  });
};

module.exports = geocode;
