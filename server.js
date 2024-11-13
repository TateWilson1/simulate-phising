const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Add this line
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static('public'));

// Store captured credentials in an array
let capturedCredentials = [];

// Serve index.html on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve quiz page
app.get('/quiz', (req, res) => {
    res.sendFile(path.join(__dirname, 'quiz.html'));
});

// Serve email templates
app.get('/templates/template1.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/template1.html'));
});

app.get('/templates/template2.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/template2.html'));
});

// Serve fake bank sign-in page
app.get('/templates/fakebanksignin.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/fakebanksignin.html'));
});

// New route to handle sign-in submissions
app.post('/submit-signin', (req, res) => {
    const { username, password } = req.body;

    // Store the credentials
    capturedCredentials.push({ username, password });

    console.log(`Captured Credentials: `, capturedCredentials);

    // Redirect to a thank you page
    res.send(`<h2>Thank you for signing in!</h2>
              <p>Your credentials have been captured.</p>`);
});

// New route to view captured credentials
app.get('/view-credentials', (req, res) => {
    let html = `<h2>Captured Credentials</h2><ul>`;
    capturedCredentials.forEach((cred, index) => {
        html += `<li>User ${index + 1}: Username: ${cred.username}, Password: ${cred.password}</li>`;
    });
    html += `</ul>`;
    res.send(html);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
