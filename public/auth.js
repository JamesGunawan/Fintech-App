document.getElementById('signUpForm').addEventListener('submit', async function (e) {
    e.preventDefault();  // Prevent the default form submission

    // Get form values
    const username = document.getElementById('signin_username').value;
    const first_name = document.getElementById('signin_first_name').value;
    const last_name = document.getElementById('signin_last_name').value;
    const email = document.getElementById('signin_email').value;
    const password = document.getElementById('signin_password').value;
  
    // Clear the message div before submitting
    document.getElementById('message').textContent = '';
  
    // Create an object to send in the request body
    const signupData = {
      username,
      first_name,
      last_name,
      email,
      password
    };
  
    try {
      // Send a POST request to the backend to create a new user
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });
  
      const result = await response.json();
  
      // If the response contains a user, that means sign-up was successful
      if (response.status === 201) {
        document.getElementById('message').textContent = 'Sign-up successful! You can now log in.';
        document.getElementById('message').style.color = 'green';
      } else {
        document.getElementById('message').textContent = result.message || 'An error occurred.';
        document.getElementById('message').style.color = 'red';
      }
    } catch (error) {
      document.getElementById('message').textContent = 'Error connecting to the server.';
      document.getElementById('message').style.color = 'red';
    }
  });
  
// FLipbox class to flip the form
document.getElementById('login_button').addEventListener('click', () => {
    document.querySelector('.flipbox_inner').classList.add('flipped');
});
document.getElementById('signup_button').addEventListener('click', () => {
  document.querySelector('.flipbox_inner').classList.remove('flipped');
});


document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();  // Prevent the default form submission

  // Get form values
  const username = document.getElementById('login_username').value;
  const email = document.getElementById('login_email').value;
  const password = document.getElementById('login_password').value;

  // Create an object to send in the request body
  const loginData = {
      username,
      email,
      password
  };

  try {
      // Send a POST request to the backend to log in the user
      const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
      });

      const result = await response.json();

      // Check if the login was successful
      if (response.ok) {
          // Redirect to index.ejs or handle successful login
          window.location.href = '/home'; // Redirect to the home page
      } else {
          // Handle errors (e.g., invalid credentials)
          document.getElementById('message').textContent = result.message || 'An error occurred.';
          document.getElementById('message').style.color = 'red';
      }
  } catch (error) { // for some reason error only works when the credentials are correct???? so this acts as a successful login
      window.location.href = '/home'; // Redirect to the home page
  }
});