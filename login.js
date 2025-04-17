,{
	event.preventDefault(); // Prevent page refresh

	// Get input values
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	// Perform login logic here (e.g., send AJAX request to server)

	// Example: Log input values to console
	console.log(`Username: ${username}, Password: ${password}`);
}

// Add event listener to form
const form = document.getElementById('login-form');
form.addEventListener('submit', handleSubmit);