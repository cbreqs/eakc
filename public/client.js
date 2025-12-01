document.addEventListener('DOMContentLoaded', function() {
    initializeRaffleForm();
    initializeCarousel();
    initializeCalendar();
});

function initializeRaffleForm() {
    const form = document.getElementById('raffle-signup-form');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const newsletter = document.getElementById('newsletter').checked;
        const age21 = document.getElementById('age-21-check').checked;
        const formMessage = document.getElementById('form-message');

        if (!age21) {
            formMessage.textContent = 'You must be 21 or older to sign up.';
            formMessage.style.color = 'red';
            return;
        }

        // Dummy success message. Replace with actual form submission logic (e.g., to Firebase)
        formMessage.textContent = 'Thank you for signing up! You have been entered into the raffle.';
        formMessage.style.color = 'var(--lush-cannabis-green)';
        form.reset();
    });
}

function initializeCarousel() {
    // The carousel is handled by CSS animations, so no extra JS is needed for the basic functionality.
    // If controls or other features are added, they would be initialized here.
}

function initializeCalendar() {
    const tourData = {
        'C&C': { name: 'Tasting Table Experience', days: [2, 4, 6], time: '6:00 PM - 9:00 PM', capacity: 10, color: 'var(--calendar-event-c-and-c)', url: 'https://www.eventbrite.com/e/holiday-light-tour-tickets-1971504759808?aff=oddtdtcreator' },
        'KCH': { name: 'The Timeless Tour', days: [3, 5], time: '6:00 PM - 9:00 PM', capacity: 10, color: 'var(--calendar-event-kch)', url: 'https://www.eventbrite.com/e/holiday-light-tour-tickets-1971504759808?aff=oddtdtcreator' },
        'H&H': { name: 'Hops & Hemp Experience', days: [0], time: '2:00 PM - 5:00 PM', capacity: 10, color: 'var(--calendar-event-h-and-h)', url: 'https://www.eventbrite.com/e/holiday-light-tour-tickets-1971504759808?aff=oddtdtcreator' },
        'C&S': { name: 'PRIVATE GROUP TOUR', days: [6], time: '8:00 PM - 11:00 PM', capacity: 10, color: 'var(--calendar-event-c-and-s)', url: 'https://www.eventbrite.com/e/holiday-light-tour-tickets-1971504759808?aff=oddtdtcreator' },
        'PVT': { name: 'Private Group Tour', days: [], time: 'Flexible', capacity: 'Varies', color: 'var(--calendar-event-pvt)', url: 'mailto:hello@elevatedadventureskc.com' } 
    };

    let currentDate = new Date(2026, 0, 1); // Start in January 2026

    const monthYearDisplay = document.getElementById('month-year-display');
    const calendarGrid = document.querySelector('.calendar-grid');
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');
    const legendContainer = document.getElementById('tour-legend-container');

    function renderCalendar() {
        calendarGrid.innerHTML = '';
        // Add day names header again for when grid is cleared
        const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        dayNames.forEach(day => {
            const dayNameCell = document.createElement('div');
            dayNameCell.classList.add('calendar-day-name');
            dayNameCell.textContent = day;
            calendarGrid.appendChild(dayNameCell);
        });

        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        monthYearDisplay.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Adjust for Monday start
        const dayOffset = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;

        for (let i = 0; i < dayOffset; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('calendar-day', 'other-month');
            calendarGrid.appendChild(emptyCell);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('calendar-day');

            const dayNumber = document.createElement('div');
            dayNumber.classList.add('day-number');
            dayNumber.textContent = i;
            dayCell.appendChild(dayNumber);

            const dayOfWeek = new Date(year, month, i).getDay();

            for (const tourKey in tourData) {
                const tour = tourData[tourKey];
                if (tour.days.includes(dayOfWeek)) {
                    const eventElement = document.createElement('div');
                    eventElement.classList.add('event', tourKey.replace('&','-and-'));
                    eventElement.textContent = tourKey;
                    eventElement.style.backgroundColor = tour.color;
                    eventElement.addEventListener('click', () => {
                        window.open(tour.url, '_blank');
                    });
                    dayCell.appendChild(eventElement);
                }
            }
            calendarGrid.appendChild(dayCell);
        }
    }

    function renderLegend() {
        legendContainer.innerHTML = '<h3>Tour Calendar Legend</h3>';
        for (const tourKey in tourData) {
            const tour = tourData[tourKey];
            const legendItem = document.createElement('div');
            legendItem.classList.add('legend-item');

            const colorBox = document.createElement('div');
            colorBox.classList.add('legend-color-box');
            colorBox.style.backgroundColor = tour.color;

            const legendText = document.createElement('span');
            legendText.textContent = `${tourKey}: ${tour.name} (${tour.time})`;

            legendItem.appendChild(colorBox);
            legendItem.appendChild(legendText);
            legendContainer.appendChild(legendItem);
        }
    }

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
    renderLegend();
}

