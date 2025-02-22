# FinTech-App

A full-stack web application for tracking financial transactions like deposits and withdrawals. Users can create an account, log in, and manage their balance through deposits and withdrawals, with a focus on secure authentication and data storage.

### Features
- **User  Authentication**: Users can sign up, log in, and manage their account.
- **Secure Authentication**: Passwords are securely hashed using bcrypt, and JWT tokens are used for authentication.
- **Deposit and Withdrawal**: Users can deposit and withdraw funds from their account.
- **Session-Based Authentication**: JWT tokens are stored in sessionStorage for authentication, but please note that this makes the application vulnerable to XSS attacks.

### Layout

- **Backend**
  - JavaScript (Node.js)
  - Express.js
  - Sequelize (for mySQL database interaction)
  - mySQL (database)
  - JWT (for authentication)
  - bcrypt (for password hashing)
- **Frontend**
  - HTML
  - CSS
  - JavaScript (using Fetch API to interact with the backend)
- **Dev Tools**
  - Nodemon (for hot reloading the server during development)
  - dotenv (for managing environment variables)
  - CORS (for enabling cross-origin resource sharing)

### Getting Started

### Prerequisites
- **Node.js**: Make sure you have Node.js installed on your local machine.
- **MySQL**: You will need to have MySQL set up on your local machine. Alternatively, you can use a remote MySQL database.

### Installing
1. **Clone the repository**: 
- `git clone https://github.com/your-username/Fintech-App.git`
- `cd fintech`
2. **Install dependencies**:
- `npm install mysql2 sequelize dotenv bcrypt jsonwebtoken`
### Sidenote
- If you want live server reload, you can install nodemon by running `npm install nodemon` and then run the server with `nodemon server.js`

3. **Seting up the database**: 
- Create a new MySQL database.
- Create a new MySQL tab and create a new database by executing 
```MySQL
CREATE DATABASE fintech;
```
- In the .env file, configure the database connection:
```plaintext
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=fintech
```
4. **Run the backend server: npm start**

## Usage
Enter a username, email, and password, then click "Sign Up" to create an account.
Check mySQL to confirm data upload
(more features soon)

# Project Structure
```plaintext
fintech/
│
├── config/
│   └── config.js                    # Database connection setup
### Cors (Cross Origin Resource Sharing)
│
├── models/
│   ├── Transaction.js            # Transaction model
│   └── User.js                   # User model
│
├── routes/
│   ├── authRoutes.js             # Authentication routes (signup, login)
│   └── transactionRoutes.js      # Transaction routes (deposit, withdraw)
│
├── .env                          # Environment variables
├── index.js                      # Main entry point of the backend
├── package.json                  # Project metadata and dependencies
└── package-lock.json             # Locked dependencies version
```

# Notes

1. Database Setup
Make sure you create a MySQL database (e.g., fintech_db) before running the backend. You can update the .env file with the appropriate database credentials.
2. JWT Authentication
When logging in, a JWT (JSON Web Token) is returned. You can use this token to access protected routes or implement additional features like token expiration and refresh tokens.
3. Security Considerations
Please note that storing JWT tokens in sessionStorage makes the application vulnerable to XSS attacks. This is a personal project and not intended for public deployment.
4. Future Development
Additional features and security measures will be implemented in future updates.
```plaintext
Note that I've added a section on security considerations to highlight the potential vulnerability of storing JWT tokens in sessionStorage. I've also updated the features section to include deposit and withdrawal functionality.
```
