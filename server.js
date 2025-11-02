import express from 'express';
import * as admin from 'firebase-admin';

// Initialize the Firebase Admin SDK
// This uses the service account credentials automatically provided by Cloud Run.
admin.initializeApp();
const db = admin.firestore();

// --- START THE WEB SERVER ---
const app = express();
const port = parseInt(process.env.PORT) || 8080; 
const host = '0.0.0.0'; 

// Middleware to read data from POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (your HTML, CSS, and client.js) from the 'public' folder.
// You must create this 'public' folder next!
app.use(express.static('public'));

// Define the root route. Cloud Run health check hits here first.
app.get('/', (req, res) => {
  // If the server is running, send a simple response.
  res.send('Server is active and checking for static files.'); 
});

// A placeholder route for your form submission logic.
app.post('/submit-entry', async (req, res) => {
    // You will put your form data processing and Firestore logic here later.
    res.status(200).send('Form route hit successfully!'); 
});

// The CRITICAL command: Start listening for HTTP traffic.
app.listen(port, host, () => {
  console.log(`[SUCCESS] Cloud Run server successfully listening on ${host}:${port}`);
});