require('dotenv').config({ path: "config/.env" });

const app = require('./config/server');
const con = require('./config/dbConfig');

const GoogleStratergy = require('passport-google-oauth').OAuth2Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const express = require('express');

app.set('view engine','ejs');
app.set('views','./views/pages');
app.use(express.static('assets'));
app.use(express.static("views/partials"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET"
}));
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(user, cb) {
    cb(null, user);
});

var userProfile;

passport.use(new GoogleStratergy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `http://localhost:${process.env.SERVER_PORT}/auth/google/callback`
    },

    function(accessToken, refreshToken, profile, done) {
        userProfile = profile;
        return done(null, userProfile);
    }
));

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
}));

app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/error'}),   // If error, redirect to '/error'
    function(req, res) {
        findUser();
        res.redirect('/profile');
    }
);

app.get('/', (err, res) => {
    res.render('home');
});
app.get('/google/signin', (req, res) => {
    console.log("Signing in \n");
    res.redirect('/auth/google');
});

app.post('/signout', (req, res) => {
    req.logOut(function() {
        console.log("Logged out \n");
        res.redirect('/');
    });
});

app.get('/signup/apple', (req, res) => {
    res.send("In future");
});

app.get('/profile', async (req, res) => {
    const details = userProfile._json;

    const username = details.name;
    const emailId = details.email;
    const profilePic = details.picture;

    console.log(`User logged in, Username: ${username}, Email ID: ${emailId} \n`);

    var queryTweets = "SELECT * FROM tweets";
    con.query(queryTweets, (err, results) => {
        if(err)
            console.log(err);

        else
        console.log(results);
            res.render('user', {tweets: results});
    });
});

app.get('/error', (req, res) => res.send("Error logging in."));

app.post('/tweet', (req, res) => {
    const body = req.body;
    const tweet = body.tweet;

    const details = userProfile._json;
    const firstName = details.given_name;
    const lastName = details.family_name;
    const userName = firstName.toLowerCase() + lastName.toLowerCase();

    var addTweet = "INSERT INTO tweets VALUES(?, ?, ?, ?)";
    con.query(addTweet, [userName, firstName, lastName, tweet], (err) => {
        if(err)
            console.log(err);
    });

    res.send({"username": userName, "firstname": firstName, "lastname": lastName, "tweet": tweet});
});




function findUser() {
    const details = userProfile._json;

    const firstName = details.given_name;
    const lastName = details.family_name;
    const username = firstName.toLowerCase() + lastName.toLowerCase();
    const emailId = userProfile.emails[0].value;

    var findUser = "SELECT * FROM user WHERE username = ? and emailId = ?";
    con.query(findUser, [username, emailId], (err, results) => {
        if(err)
            console.log(err);

        if(results.length == 0)
            createUser();
    });
}

function createUser() {
    const details = userProfile._json;

    const firstName = details.given_name;
    const lastName = details.family_name;
    const username = firstName.toLowerCase() + lastName.toLowerCase();
    const emailId = details.email;
    const profilePic = details.picture;

    var addUser = "INSERT INTO user VALUES(?, ?, ?, ?, ?)";
    con.query(addUser, [username, firstName, lastName, emailId, profilePic], (err) => {
        if(err)
            console.log(err);
    });

    console.log(`User added, Username: ${username}, Email ID: ${emailId} \n`);
}