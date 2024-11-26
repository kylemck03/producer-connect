const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

// Configure Passport Google OAuth Strategy 
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID, // Loaded from .env
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Loaded from .env
            callbackURL: 'http://localhost:5000/auth/google/callback', // redirect URL
            scope: ['profile', 'email']
        },
        async (accessToken, refreshToken, profile, done) => {
            // Handle user information from Google 
            const user = {
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
            };

             // Here, can add logic to store the user in your database
            // For now, just pass the user object to the next middleware
            return done(null, user);
        }
    )
);

console.log('Client ID:', process.env.GOOGLE_CLIENT_ID);
console.log('Callback URL:', 'http://localhost:5000/auth/google/callback');

// Serialize and Deserialize User
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;

