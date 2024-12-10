import { DataTypes } from 'sequelize';  // DataTypes for defining the model schema
import sequelize from '../config/config.js'; // Sequelize instance for DB connection
import bcrypt from 'bcrypt'; // For hashing passwords securely

const User = sequelize.define('User', {
  user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  first_name: {
      type: DataTypes.STRING(25),
      allowNull: false,
  },
  last_name: {
      type: DataTypes.STRING(25),
      allowNull: false,
  },
  email: {
      type: DataTypes.STRING(50),         
      unique: true,
      allowNull: false,
  },
  password: {
      type: DataTypes.STRING(255),
      allowNull: false,
  },
  balance: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0.00,
      allowNull: false,
      },
});


// Hook before creating a user to hash the password securely
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10); // Generate salt for password hashing
  user.password = await bcrypt.hash(user.password, salt);  // Hash the password
});

// Exporting the User model to be used elsewhere in the appx
export default User; 