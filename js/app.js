// app.js

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Get the button and response div by their IDs
    const testButton = document.getElementById('test-connection-btn');
    const responseDiv = document.getElementById('response');

    // Add a click event listener to the test connection button
    testButton.addEventListener('click', async () => {
        try {
            // Show a loading message
            responseDiv.textContent = 'Checking connection...';

            // Call the API function from api.js
            const message = await fetchHealthCheck(); // Perform API request

            // Display the backend response in the response div
            responseDiv.textContent = message;
            responseDiv.classList.add('text-success');
            responseDiv.classList.remove('text-danger');
        } catch (error) {
            // Handle errors and display them in the response div
            responseDiv.textContent = 'Failed to connect to backend!';
            responseDiv.classList.add('text-danger');
            responseDiv.classList.remove('text-success');
        }
    });
});