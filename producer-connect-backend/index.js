const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('./auth'); 
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(
    session({
        secret: 'your_secret_key',
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/projects', projectRoutes);

// Google Authentication Routes
app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Redirect or send a response after successful login
        res.redirect('/dashboard');
    }
);

app.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        // Return user data if authenticated
        res.send(`
            <h1>Welcome, ${req.user.name}</h1>
            <p>Email: ${req.user.email}</p>
            <a href="/auth/logout">Logout</a>
        `);
    } else {
        res.redirect('/'); // Redirect unauthenticated users
    }
});

// Check Login Status
app.get('/auth/status', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user });
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

// Logout
app.get('/auth/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
