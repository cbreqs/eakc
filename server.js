const express = require('express');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp(); 
const db = getfirestore();

// --- START THE WEB SERVER ---
const app = express();
const port = (process.env.PORT); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// The CRITICAL command: Start listening for HTTP traffic.
app.listen(port, () => {
  console.log(`[SUCCESS] Cloud Run server successfully listening on ${host}:${port}`);
});
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