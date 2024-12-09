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

dotenv.config();
const app = express();

// Enable CORS for frontend access
app.use(cors());  // Allows requests from any origin (you can configure it more specifically if needed)

app.use(express.json());  // for parsing application/json

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the fintech-frontend directory
app.use(express.static(path.join(__dirname, 'fintech-frontend')));

// User authentication routes
app.post('/signup', signUp);  // Sign up route
app.post('/login', login);  // Login route

// Transaction routes
app.post('/deposit', deposit);  // Deposit route
app.post('/withdraw', withdraw);  // Withdraw route

// Route for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'fintech-frontend', 'index.html')); // Serve index.html
});

// Sync Sequelize models and start the server
await sequelize.sync();

// Start the server
app.listen(3000, () => {
  console.log('Server running on port http://localhost:3000...');
});