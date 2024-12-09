# Interaction Between Frontend and Backend with Sequelize

## Overview
In the application, the interaction between the frontend (`index.html`/`app.js`) and the backend (`index.js`, `authRoutes.js`, `transactionRoutes.js`, and Sequelize) occurs through HTTP requests. Here's a detailed breakdown:

---

## Workflow

### 1. **User Input in `index.html`**
   - The user fills out the sign-up form in `index.html` with fields like `username`, `email`, and `password`.

---

### 2. **Event Listener in `app.js`**
   - **Code**:  
     ```javascript
     const response = await fetch('http://localhost:3000/signup', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
         },
         body: JSON.stringify(data), // Line where data is sent to the backend
     });
     ```
   - **Details**:
     - An event listener prevents the default form submission behavior using `e.preventDefault()`.
     - The form data is collected, structured into an object, and sent to the backend using the `fetch` API.

---

### 3. **Backend Request Handling in `index.js`**
   - **Code**:
     ```javascript
     app.post('/signup', signUp); // Line that routes the POST request to the signUp function
     ```
   - **Details**:
     - The Express server receives the POST request and routes it to the `signUp` function defined in `authRoutes.js`.

---

### 4. **Processing in `authRoutes.js`**
   - **Code**:
     ```javascript
     const newUser = await User.create({ username, email, password }); // Line where Sequelize interacts with the database
     ```
   - **Details**:
     - The `signUp` function extracts the user input (username, email, password) from the request body.
     - Sequelize is used to store the user data in the database with `User.create()`.

---

### 5. **Database Interaction with Sequelize**
   - **Details**:
     - Sequelize, an ORM, converts JavaScript objects into SQL queries to interact with the database.
     - In this case, the `User.create()` method creates a new entry in the database.

---

### 6. **Response to the Frontend**
   - **Details**:
     - After successful user creation, the server responds with the user data or an error message.
     - The frontend displays appropriate messages based on the server's response.

---

### 7. **Similar Process for Transactions**
   - **Deposit Example**:
     - **Code**:
       ```javascript
       await Transaction.create({ userId, amount, type: 'deposit' }); // Line where a deposit transaction is created
       ```
   - **Withdrawal Example**:
     - **Code**:
       ```javascript
       await Transaction.create({ userId, amount, type: 'withdraw' }); // Line where a withdrawal transaction is created
       ```
   - **Details**:
     - Transaction requests are routed to the appropriate endpoint (e.g., `/deposit` or `/withdraw`).
     - The corresponding function in `transactionRoutes.js` processes the request and uses Sequelize to update the database.

---

## Summary of Specific Interaction Lines

### Frontend (`app.js`)
- **Interaction Line**:  
  `body: JSON.stringify(data)` — Data sent to the backend.

### Backend (`index.js`)
- **Interaction Line**:  
  `app.post('/signup', signUp);` — Routes the POST request.

### Backend (`authRoutes.js`)
- **Interaction Line**:  
  `const newUser = await User.create({ username, email, password });` — Sequelize creates a user.

### Backend (`transactionRoutes.js`)
- **Deposit Interaction Line**:  
  `await Transaction.create({ userId, amount, type: 'deposit' });`
- **Withdrawal Interaction Line**:  
  `await Transaction.create({ userId, amount, type: 'withdraw' });`

---

## Conclusion
The interaction between the frontend and Sequelize is mediated through HTTP requests. Frontend actions trigger requests to the backend, where Sequelize is used to manipulate the database based on user input.
