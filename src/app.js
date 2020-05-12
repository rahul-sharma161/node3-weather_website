const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//define path for express config
const publicDirectoryPath = path.join(__dirname, "../public"); //looks up for src
const viewsPath = path.join(__dirname, "../templates/views"); //join he source,used for views,if the defult name i.e. views is changed to nythng else like templates
const partialsPath = path.join(__dirname, "../templates/partials"); //same to dame but used for partilas

//setup for handle bars
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup to serve static files css,html
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: " Me",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Me",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        helpText: "This is some helpful text.",
        title: "help",
        name: "me",
    });
});

//using geocode here
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address!",
        });
    }

    geocode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error });
            }

            forecast(location, (error, forecastData) => {
                if (error) {
                    return res.send({ error });
                }

                res.send({
                    forecast: forecastData,
                    location: location,
                    address: req.query.address,
                });
            });
        }
    );
});
//url's query string holds the requests
app.get("/products", (req, res) => {
    if (!req.query.search) {
        //req.query holds the end of the search string
        return res.send({
            error: "you have to enter a search",
        });
    }
    res.send({
        product: req.query.search,
    });
});
app.get("*", (req, res) => {
    res.send("404,page not available");
});

app.listen(3000, () => {
    console.log("Server is up on port 3000.");
});

// $ nodemon src/app.js -e hbs,js to run the code
//http://localhost:3000/weather?address=boston