const request = require("request");

const geocode = (address, callback) => {
    const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        address +
        ".json?access_token=pk.eyJ1IjoibWFudHViYW50dTEyIiwiYSI6ImNrOTB2MTZqYTA1NmMzbmxoZzV5eWdhc28ifQ.0ZUe29eumb91NRX2VlCGQg";

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location services!", undefined);
        } else if (body.features.length == 0) {
            callback("Unable to find location. Try another search.", undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            });
        }
    });
};

module.exports = geocode;

// const request = require('request')

// // const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/37.8267,-112'

// // request({ url: url, json: true }, (error, response) => {
// //     if (error) {
// //         console.log('Unable to connect to weather service!')
// //     } else if (response.body.error) {
// //         console.log('Unable to find location')
// //     } else {
// //         console.log(response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
// //     }
// // })
// const geocode = (adress, callback) => {

//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + adress + '.json?access_token=pk.eyJ1IjoibWFudHViYW50dTEyIiwiYSI6ImNrOTB2MTZqYTA1NmMzbmxoZzV5eWdhc28ifQ.0ZUe29eumb91NRX2VlCGQg'

//     request({ url: url, json: true }, (error, response) => {
//         if (error) {
//             callback('Unable to connect to location services!', undefined)
//         } else if (response.body.features.length === 0) {
//             callback('Unable to find location. Try another search.', undefined)
//         } else {
//             callback(undefined, {
//                 latitude: response.body.features[0].center[0],
//                 longitude: response.body.features[0].center[1]
//             })
//         }
//     })

// }

// module.exports = geocode