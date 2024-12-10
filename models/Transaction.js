// Importing required dependencies
import { DataTypes } from 'sequelize'; // DataTypes for defining the model schema
import sequelize from '../config/config.js';  // Sequelize instance for DB connection

// Defining the 'Transaction' model to log deposits and withdrawals
const Transaction = sequelize.define('Transaction', {
  transaction_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
  },
  amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
  },
  type: {
      type: DataTypes.ENUM('deposit', 'withdrawal'),
      allowNull: false,
  },
  date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      },
  description: {
      type: DataTypes.STRING(255),
      allowNull: false
  },
  user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: 'Users',  // Name of the target model (User)
          key: 'user_id',  // The key (column) to reference in the User model
      },
  },
});

// Exporting the Transaction model to be used elsewhere in the app
export default Transaction;
