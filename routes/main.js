// Create a new router
const express = require("express");
const router = express.Router();
// Define our data
var shopData = {
    shopName: "Drinks R Us", productCategories: ["Beer", "Wine", "Soft Drinks", "Hot Drinks"], shops: [
        {
            location: "London",
            manager: "Alisha",
            address: "123 City Center"
        },
        {
            location: "Cambridge",
            manager: "James",
            address: "45 High Street"
        },
        {
            location: "Manchester",
            manager: "Sophie",
            address: "89 Ocean View Road"
        }
    ]
};

// Handle the main routes
// TODO
router.get("/", (req, res) => {
    res.render("index.ejs", shopData)
});

router.get("/about", (req, res) => {
    res.render("about.ejs", shopData)
});

router.get("/search", (req, res) => {
    res.render("search.ejs", shopData)
});

router.get('/search_result', function (req, res) {
    // TODO: search in the database
    res.send("You searched for " + req.query.search_text + " in " + req.query.category);

});

router.get("/register", (req, res) => {
    res.render("register.ejs", shopData);
});

router.post("/registered", (req, res) => {
    res.send(' Hello ' + req.body.first + ' ' + req.body.last + ' you are now registered!. We will send an email to you at' + req.body.email);
});

// Survey form page
router.get("/survey", (req, res) => {
    res.render("survey.ejs", shopData);
});

// Survey result page (after form submission)
router.post("/survey_result", (req, res) => {
    let studentStatus = "No";
    if (req.body.student) {
        studentStatus = "Yes";
    } //checking if the checkbox has been selected on the form for if they are a student or not 

    //An object is created called surveyData that organises all the submitted form data neatly.
    const surveyData = {
        first: req.body.first, //Each of these fields match the name attribute from the inputs in the survey.ejs
        last: req.body.last,
        email: req.body.email,
        age: req.body.age,
        category: req.body.category,
        student: studentStatus
    };

    res.render("survey_result.ejs", { shopName: shopData.shopName, surveyData });
    //After preparing the surveyData, the route renders the EJS template survey_result.ejs.
    //It sends two pieces of data to the template:shopName (from the shopData object), surveyData (the form data that was  just collected)
});



// Export the router object so index.js can access it
module.exports = router;
