const request = require("request");

const forecast = (location, callback) => {
    // const url = 'https://api.darksky.net/forecast/ad48ed42a4msh97b062cfeb5f309p172fddjsnb959a352d8cb/' + latitude + ',' + longitude
    const url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        location +
        "&appid=196f964ee51310f9147feda2b55d9d58";

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined);
        } else if (body.error) {
            callback("Unable to find location", undefined);
        } else {
            callback(
                undefined,

                " It is currently " + body.main.temp + " degress out. "
            );
        }
    });
};

module.exports = forecast;