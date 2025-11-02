// script.js

const firebaseConfig = {
  apiKey: "AIzaSyBtucv-cfFaFjR-ffZobUqhXFjhbN7pVVuQ",
  authDomain: "landing-eakc-2025.firebaseapp.com",
  projectId: "landing-eakc-2025",
  storageBucket: "landing-eakc-2025.firebasestorage.app",
  messagingSenderId: "194227019197",
  appId: "1:194227019197:web:ed968e90664d41b2efc6d4",
};

// Initialize Firebase using the global 'firebase' object
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app); // Initialize Firestore using the global 'firebase' object

// Get a reference to the form and message display element
const raffleForm = document.getElementById('raffle-signup-form');
const formMessage = document.getElementById('form-message');

if (raffleForm) { // Ensure the form exists before trying to add listener
    raffleForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Crucial: Prevent default form submission (stops URL change)

        // Check age verification first
        const age21Checkbox = document.getElementById('age-21-check');
        if (!age21Checkbox.checked) {
            formMessage.textContent = 'You must be 21 years or older to participate.';
            formMessage.style.color = 'red';
            return; // Stop the submission
        }

        // Collect form data
        const formData = {
            fullName: raffleForm.fullName.value,
            email: raffleForm.email.value,
            phone: raffleForm.phone.value, // Optional
            newsletterOptIn: raffleForm.newsletter.checked,
            ageVerified: age21Checkbox.checked, // Use the actual checkbox state
            raffleChoice: raffleForm.raffleChoice.value,
            // Use firebase.firestore.FieldValue for server-side timestamp
            submissionTime: firebase.firestore.FieldValue.serverTimestamp()
        };

        try {
            // Add a new document to the "raffleEntries" collection
            const docRef = await db.collection("raffleEntries").add(formData);
            console.log("Document written with ID: ", docRef.id);

            formMessage.textContent = 'Success! You have been entered into the raffle. Good luck!';
            formMessage.style.color = 'var(--lush-cannabis-green)'; // Use your brand green for success (CSS variable)

            raffleForm.reset(); // Clear the form fields
        } catch (e) {
            console.error("Error adding document: ", e);
            formMessage.textContent = `Error submitting your entry: ${e.message}. Please try again.`; // Show specific error
            formMessage.style.color = 'red'; // Use red for errors
        }
    });
} else {
    console.error("Raffle signup form not found!");
}