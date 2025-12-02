document.addEventListener('DOMContentLoaded', function () {
    const bookingForm = document.getElementById('booking-form');
    const confirmationMessage = document.getElementById('booking-confirmation');

    bookingForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = bookingForm.name.value;
        const email = bookingForm.email.value;
        const phone = bookingForm.phone.value;
        const tour = bookingForm.tour.value;
        const date = bookingForm.date.value;
        const guests = bookingForm.guests.value;

        try {
            await firebase.firestore().collection('bookings').add({
                name,
                email,
                phone,
                tour,
                date,
                guests,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            bookingForm.reset();
            confirmationMessage.textContent = 'Thank you for your booking request! We will be in touch shortly to confirm.';
            confirmationMessage.style.color = 'green';
        } catch (error) {
            console.error('Error submitting booking:', error);
            confirmationMessage.textContent = 'There was an error submitting your request. Please try again.';
            confirmationMessage.style.color = 'red';
        }
    });
});
