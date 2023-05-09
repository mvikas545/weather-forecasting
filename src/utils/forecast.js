const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=c734171bc025b405b9b91ac8d56d170b&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Something went wrong please retry!");
    } else if (response.body.error) {
      callback("Result not found");
    } else {
      const currentData = response.body.current;
      callback(undefined, {
        forecast: `It is currently ${currentData.temperature} degree out. There is ${currentData.precip} % chance of rain`,
      });
    }
  });
};

module.exports = forecast;
