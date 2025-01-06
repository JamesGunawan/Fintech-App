import bcrypt from 'bcrypt'; // To compare the hashed passwords
import jwt from 'jsonwebtoken'; // To generate JWT tokens
import User from '../models/user.js';  // Importing User model to interact with the User table

// Sign up route handler 
const signUp = async (req, res) => {
  const { username, first_name, last_name, email, password } = req.body;  // Destructuring request body for username, email, and password
  try {
    // Check if the email already exists
    const existingUser  = await User.findOne({ where: { email } });
    if (existingUser ) {
      return res.status(400).json({ message: 'Email already in use' }); // Return error if email exists
    }

    // Creating a new user in the database
    const newUser  = await User.create({ username, first_name, last_name, email, password });
    res.status(201).json(newUser ); // Responding with the newly created user
  } catch (error) {
    // Handle other errors (e.g., database errors)
    console.error('Error signing up user:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error signing up user', error: error.message });  // Return a generic error message
  }
};

const SECRET_KEY = process.env.JWT_SECRET || 'I*enyoinyo*&@YO*@Y'; // Use a strong secret key

// Login user
const login = async (req, res) => {
  const { email, password } = req.body; // Destructuring request body for email and password 

  try {
      // Finding the user by email in the database
      const user = await User.findOne({ where: { email } });
      if (!user) {
          return res.status(404).json({ message: 'User   not found' });  // If user doesn't exist
      }

      // Comparing the provided password with the hashed password in the database
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      // If login is successful, generate a JWT
      const token = jwt.sign({ userId: user.user_id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

      // Respond with the token and userId
      res.json({ token, userId: user.user_id });
  } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
  }
};

// Exporting the routes for use in other parts of the application
export { signUp, login };
