import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import games from './api/games.js';
import transactions from './api/transactions.js';
import sellers from './api/sellers.js';
import buyers from './api/buyers.js';
import stocks from './api/stocks.js';
import report from './api/report.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;


// // Middleware to check roles (Define this before using it)
// function checkRole(requiredRole) {
//     return (req, res, next) => {
//         const { rolePassword } = req.headers;

//         if (!rolePassword) {
//             return res.status(401).json({ message: 'Access denied: password missing.' });
//         }

//         // Define role passwords
//         const roles = {
//             admin: '123456',       // Replace with the actual admin password
//             manager: '654321'      // Replace with the actual manager password
//         };

//         // Check if the user has the required role
//         if (requiredRole === 'admin' && rolePassword === roles.admin) {
//             next();  // Admin access
//         } else if (requiredRole === 'manager' && (rolePassword === roles.manager || rolePassword === roles.admin)) {
//             next();  // Manager access (also admin)
//         } else {
//             return res.status(403).json({ message: 'Access denied: insufficient rights.' });
//         }
//     };
// }

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

app.use('/api/games', games);
app.use('/api/transactions', transactions);
app.use('/api/sellers', sellers);
app.use('/api/buyers', buyers);
app.use('/api/stocks', stocks);
app.use('api/report', report);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
