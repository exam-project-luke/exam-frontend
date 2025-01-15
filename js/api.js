// api.js

// Function to call the backend API
async function fetchHealthCheck() {
    const url = 'http://localhost:8080/api/health'; // Backend endpoint URL

    try {
        const response = await fetch(url); // Make the GET request
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.text(); // Get response text from the server
    } catch (err) {
        console.error('Error while fetching backend data:', err);
        throw err; // Propagate the error so it can be handled
    }
}