import express from 'express';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

// --- START THE WEB SERVER ---
const app = express();
const port = parseInt(process.env.PORT) || 8080; 
const host = '0.0.0.0'; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  // If the server is running, send a simple response.
  res.send('Server is active and checking for static files.'); 
});

// A placeholder route for your form submission logic.
app.post('/submit-entry', async (req, res) => {
    // SECURITY NOTE: This is where you would validate and process req.body securely.
    const formData = req.body; 
    
    try {
        await db.collection("raffleEntries").add({ 
            // Only save fields you expect, like:
            email: formData.email, 
            raffleChoice: formData.raffleChoice,
            submissionTime: admin.firestore.FieldValue.serverTimestamp()
        });
        res.status(200).json({ message: 'Success! Entry submitted to Firestore.' });
    } catch (e) {
        console.error("Firestore Write Error:", e);
        res.status(500).json({ message: `Server error during submission: ${e.message}` });
    } 
});

// The CRITICAL command: Start listening for HTTP traffic.
app.listen(port, host, () => {
  console.log(`[SUCCESS] Cloud Run server successfully listening on ${host}:${port}`);
});