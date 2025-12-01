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
    // Carousel is handled by CSS animations
}

function initializeCalendar() {
    const tourTypes = {
        'HLT': { name: 'Holiday Lights Tour', color: '#E5A00D', url: 'https://www.eventbrite.com/e/holiday-light-tour-tickets-1971504759808?aff=oddtdtcreator' },
        'PVT-B': { name: 'Private Tour (Booked)', color: '#6c757d' },
        'C&C': { name: 'Tasting Table Experience', days: [2, 4, 6], time: '6:00 PM - 9:00 PM', color: 'var(--calendar-event-c-and-c)', url: 'https://www.eventbrite.com/e/holiday-light-tour-tickets-1971504759808?aff=oddtdtcreator' },
        'KCH': { name: 'The Timeless Tour', days: [3, 5], time: '6:00 PM - 9:00 PM', color: 'var(--calendar-event-kch)', url: 'https://www.eventbrite.com/e/holiday-light-tour-tickets-1971504759808?aff=oddtdtcreator' },
        'H&H': { name: 'Hops & Hemp Experience', days: [0], time: '2:00 PM - 5:00 PM', color: 'var(--calendar-event-h-and-h)', url: 'https://www.eventbrite.com/e/holiday-light-tour-tickets-1971504759808?aff=oddtdtcreator' },
        'C&S': { name: 'PRIVATE GROUP TOUR', days: [6], time: '8:00 PM - 11:00 PM', color: 'var(--calendar-event-c-and-s)', url: 'https://www.eventbrite.com/e/holiday-light-tour-tickets-1971504759808?aff=oddtdtcreator' },
        'PVT': { name: 'Private Group Tour', time: 'Flexible', color: 'var(--calendar-event-pvt)', url: 'mailto:hello@elevatedadventureskc.com' }
    };

    const specificEvents = {
        "2025-12-06": [
            { tourKey: 'HLT', time: '6:00 PM' },
            { tourKey: 'HLT', time: '8:00 PM' }
        ],
        "2025-12-13": [
            { tourKey: 'PVT-B', time: '6:00 PM' },
            { tourKey: 'HLT', time: '8:00 PM' }
        ],
        "2025-12-20": [
            { tourKey: 'HLT', time: '6:00 PM' },
            { tourKey: 'HLT', time: '8:00 PM' }
        ]
    };

    let currentDate = new Date(2025, 11, 1); // Start in December 2025

    const monthYearDisplay = document.getElementById('month-year-display');
    const calendarGrid = document.querySelector('.calendar-grid');
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');
    const legendContainer = document.getElementById('tour-legend-container');

    function getEventsForDay(year, month, day) {
        const events = [];
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        if (specificEvents[dateString]) {
            events.push(...specificEvents[dateString]);
        }

        if (year === 2026 && month === 0) { // January 2026
            const dayOfWeek = new Date(year, month, day).getDay();
            for (const tourKey in tourTypes) {
                const tour = tourTypes[tourKey];
                if (tour.days && tour.days.includes(dayOfWeek)) {
                    events.push({ tourKey: tourKey, time: tour.time.split(' ')[0] });
                }
            }
        }
        return events;
    }

    function renderCalendar() {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        calendarGrid.innerHTML = '';
        const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        dayNames.forEach(day => {
            const dayNameCell = document.createElement('div');
            dayNameCell.classList.add('calendar-day-name');
            dayNameCell.textContent = day;
            calendarGrid.appendChild(dayNameCell);
        });

        monthYearDisplay.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const dayOffset = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;

        for (let i = 0; i < dayOffset; i++) {
            calendarGrid.appendChild(document.createElement('div')).classList.add('calendar-day', 'other-month');
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('calendar-day');
            dayCell.innerHTML = `<div class="day-number">${i}</div>`;

            const dayEvents = getEventsForDay(year, month, i);
            if (dayEvents.length > 0) {
                dayEvents.forEach(eventData => {
                    const tour = tourTypes[eventData.tourKey];
                    const eventElement = document.createElement('div');
                    eventElement.classList.add('event');
                    eventElement.style.backgroundColor = tour.color;
                    eventElement.textContent = `${eventData.tourKey.replace('-B','')} @ ${eventData.time}`;

                    if (eventData.tourKey.includes('-B')) {
                        eventElement.classList.add('booked');
                    } else {
                        eventElement.addEventListener('click', (e) => {
                            e.stopPropagation();
                            window.open(tour.url, '_blank');
                        });
                    }
                    dayCell.appendChild(eventElement);
                });
            }
            calendarGrid.appendChild(dayCell);
        }
        updateNavButtons();
    }

    function updateNavButtons() {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        prevMonthBtn.disabled = (year === 2025 && month === 11);
        nextMonthBtn.disabled = (year === 2026 && month === 0);
    }

    function renderLegend() {
        legendContainer.innerHTML = '<h3>Tour Calendar Legend</h3>';
        for (const tourKey in tourTypes) {
            const tour = tourTypes[tourKey];
            const legendItem = document.createElement('div');
            legendItem.classList.add('legend-item');
            legendItem.innerHTML = `<div class="legend-color-box" style="background-color: ${tour.color};"></div><span>${tour.name}</span>`;
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
