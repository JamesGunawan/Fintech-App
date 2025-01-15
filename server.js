// Importing required dependencies
import express from 'express';  // Express for routing
import dotenv from 'dotenv'; // dotenv for loading environment variables
import sequelize from './config/config.js';  // Sequelize instance for DB connection
import { signUp, login } from './routes/authRoutes.js'; // Authentication routes
import { deposit, withdraw } from './routes/transactionRoutes.js'; // Transaction routes
import cors from 'cors';  // Import CORS package
import path from 'path';  // Import path module to resolve directory paths
import { fileURLToPath } from 'url'; // Import fileURLToPath
import { dirname } from 'path'; // Import dirname
import jwt from 'jsonwebtoken'; // Import JSON Web Token package
import User from './models/User.js'; // Import the User model

dotenv.config();
const app = express();

// Enable CORS for frontend access
app.use(cors());  // Allows requests from any origin (you can configure it more specifically if needed)

app.use(express.json());  // for parsing application/json

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the fintech-frontend directory
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set the directory where your EJS files will be located
app.set('views', path.join(__dirname, 'views')); // Create a 'views' folder in your project

// User authentication routes
app.post('/signup', signUp);  // Sign up route
app.post('/login', login);  // Login route

// Transaction routes
app.post('/deposit', deposit);  // Deposit route
app.post('/withdraw', withdraw);  // Withdraw route

// Route for the root path
app.get('/', (req, res) => {
  res.render('auth', { message: '' }); 
});

app.get('/home', async (req, res) => {
  const token = req.query.token; // Get the token from the query parameters

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the JWT token
    const SECRET_KEY = process.env. JWT_SECRET;
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;

    // Find the user by userId
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User    not found' });
    }

    // Render the index.ejs template with the user's balance
    res.render('index.ejs', { balance: user.balance });
  } catch (error) {
    console.error('Error fetching balance:', error);
    res.status(500).json({ message: 'Error fetching balance', error: error.message });
  }
});


// Sync Sequelize models and start the server
await sequelize.sync();


// Start the server
app.listen(3000, () => {
  console.log('Server running on port http://localhost:3000...');
});

