document.getElementById('transactionForm').addEventListener('submit', async function (e) {
    e.preventDefault();  // Prevent the default form submission

    // Get form values
    const amount = parseFloat(document.getElementById('transactionAmount').value);
    const type = document.getElementById('transactionType').value;
    const description = document.getElementById('transactionDescription').value;

    // Get the user ID from session storage (assuming it's stored after login)
    const userId = sessionStorage.getItem('userId'); // Ensure this is set during login

    if (!userId) {
        alert('User not logged in. Please log in first.');
        return;
    }

    // Create an object to send in the request body
    const transactionData = {
        userId,
        amount,
        description
    };

    try {
        // Determine the endpoint based on the transaction type
        const endpoint = type === 'deposit' ? '/deposit' : '/withdraw';

        // Send a POST request to the backend
        const response = await fetch(`http://localhost:3000${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('jwt')}` // Include JWT token for authentication
            },
            body: JSON.stringify(transactionData),
        });

        const result = await response.json();

        // Handle the response
        if (response.ok) {
            alert(`Transaction successful! New balance: ${result.balance}`);
            // Optionally, update the UI to reflect the new balance
        } else {
            alert(result.message || 'An error occurred.');
        }
    } catch (error) {
        alert('Error connecting to the server.');
    }
});