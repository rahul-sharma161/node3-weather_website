const express = require("express");
const path = require("path");

const app = express();

console.log(__dirname);
console.log(path.join(__dirname, "../public"));
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "../public")));

//for hbs

// app.get("", (req, res) => {
//     res.send("root folder");
// });

app.get(" ", (req, res) => {
    res.send("index", {
        title: "Weather",
        name: "Andrew Mead",
    });
});

app.get("/about", (req, res) => {
    res.send("about folder");
});

app.listen(3000);