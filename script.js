document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Stop the form from reloading the page

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const statusDiv = document.getElementById('statusMessage');

    // Basic validation
    if (!username || !password) {
        statusDiv.textContent = 'Please fill in all fields.';
        return;
    }

    statusDiv.textContent = 'Logging in...';

    try {
        // This is where you call your backend
        const response = await fetch('https://api.arconcheats.com/login', { // Your future API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            statusDiv.textContent = 'Login successful! Redirecting...';
            statusDiv.style.color = '#00ff88'; // Green for success
            // Here you would redirect to the dashboard or show the download section
            // window.location.href = '/dashboard';
            setTimeout(() => {
                // Example: Show a download button
                document.querySelector('.login-box').innerHTML = `
                    <h1>Arcon</h1>
                    <p>Welcome, \${username}!</p>
                    <p>Subscription: \${data.subscription}</p>
                    <button onclick="downloadCheat()">