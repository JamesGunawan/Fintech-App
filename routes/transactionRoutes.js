import User from '../models/user.js';  // Importing User model to interact with the User table
import Transaction from '../models/transaction.js'; // Importing Transaction model to log transactions
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from './authRoutes.js';

const deposit = async (req, res) => {
  const { amount, description } = req.body;
  const token = req.headers.authorization.split(' ')[1];

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;

    // Parse the amount as a decimal with 2 decimal places
    const depositAmount = parseFloat(amount).toFixed(2);

    // Finding the user by userId
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User  not found' });
    }

    // Adding the deposit amount to the user's balance
    user.balance = (parseFloat(user.balance) + parseFloat(depositAmount)).toFixed(2);
    await user.save();

    // Creating a transaction record for the deposit
    await Transaction.create({
      user_id: userId,
      amount: depositAmount,
      type: 'deposit',
      description,
      date: new Date(),
    });

    res.status(200).json({ message: 'Deposit successful', balance: user.balance });
  } catch (error) {
    console.error('Error in deposit function:', error);
    res.status(500).json({ message: 'Error making deposit', error: error.message });
  }
};

const withdraw = async (req, res) => {
  const { amount, description } = req.body;
  const token = req.headers.authorization.split(' ')[1];

  console.log('Request Body:', req.body); // Log the request body
  console.log('JWT Token:', token); // Log the JWT token

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;

    console.log('Decoded JWT:', decoded); // Log the decoded JWT

    // Finding the user by userId
    const user = await User.findByPk(userId);
    if (!user) {
      console.log('User   not found:', userId); // Log if user is not found
      return res.status(404).json({ message: 'User   not found' });
    }

    // Checking if the user has sufficient balance
    if (user.balance < amount) {
      console.log('Insufficient funds:', user.balance); // Log insufficient funds
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    // Subt racting the withdrawal amount from the user's balance
    user.balance -= amount;
    await user.save();

    // Creating a transaction record for the withdrawal
    await Transaction.create({
      user_id: userId,
      amount,
      type: 'withdraw',
      description,
      date: new Date(),
    });

    console.log('Withdrawal successful:', user.balance); // Log successful withdrawal
    res.status(200).json({ message: 'Withdrawal successful', balance: user.balance });
  } catch (error) {
    console.error('Error in withdraw function:', error); // Log the error
    res.status(500).json({ message: 'Error making withdrawal', error: error.message });
  }
};

// Exporting the routes for use in other parts of the application
export { deposit, withdraw }; 