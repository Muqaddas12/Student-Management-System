import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutesR from './router/userRoutes/studentsRoutes.js';

const sms = express();
const PORT = process.env.PORT || 3000;

// Resolve __dirname (since ES modules don't have it by default)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setting up middlewares
sms.use(express.json());
sms.use(express.urlencoded({ extended: true }));

// Set up views
sms.set('view engine', 'ejs');
sms.set('views', path.join(__dirname, 'views'));

// Serve static files (optional)
sms.use(express.static(path.join(__dirname, 'public')));

// Register user routes
sms.use('/api/user', userRoutesR);

// Sample route to render an EJS view
sms.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' });
});

sms.listen(PORT, () => console.log('App is running on', PORT));
