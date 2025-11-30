dconst express = require('express');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp(); 
const db = getFirestore();

// --- START THE WEB SERVER ---
const app = express();
// FIX: Use the PORT environment variable if available, otherwise default to 8081
const port = process.env.PORT || 8081; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// The CRITICAL command: Start listening for HTTP traffic.
app.listen(port, () => {
  // The log message will now show the correct port
  console.log(`[SUCCESS] Server is listening on port ${port}`);
});

app.get('/', (req, res) => {
  // This just sends the index.html file from the 'public' folder.
  res.sendFile(__dirname + '/public/index.html');
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
