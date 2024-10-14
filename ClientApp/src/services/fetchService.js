const fetchData = async (url, method = 'GET', body = null) => {
    const token = localStorage.getItem('token'); // Get token from local storage (if available)

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }) // Add token if it exists
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    // Handle DELETE requests (which may not return a body)
    if (method === 'DELETE') {
        if (response.ok) {
            return; // No need to parse the body for DELETE
        } else {
            throw new Error('Failed to delete the entry');
        }
    }

    // Check for non-200 status and handle errors
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || `HTTP error! Status: ${response.status}`);
    }

    // Return parsed JSON for other requests
    return await response.json();
};

export default fetchData;
