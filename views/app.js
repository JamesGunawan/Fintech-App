document.getElementById('signUpForm').addEventListener('submit', async function (e) {
    e.preventDefault();  // Prevent the default form submission
  
    // Get form values
    const username = document.getElementById('username').value;
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
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
  
document.getElementById('login_button').addEventListener('click', () => {
    document.querySelector('.flipbox_inner').classList.add('flipped');
});

document.getElementById('signup_button').addEventListener('click', () => {
  document.querySelector('.flipbox_inner').classList.remove('flipped');
});
