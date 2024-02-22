const listSeat = document.getElementById('seatsList');
const singleSeat = document.getElementsByClassName('single-seat');
const seatTaken = document.getElementById('seat-taken');
const applyBtn = document.getElementById('apply-btn');
const nextBtn = document.getElementById('next-btn');
let seatSelect = 0;
let isSelected = false;
let totalPriceUpdate = 0;

const selectedSeats = new Set();

for (const seat of singleSeat) {
    seat.addEventListener('click', function () {
        if (!selectedSeats.has(seat)) {
            // Seat is not selected, proceed with selection
            if (seatSelect < 4) {
                seat.classList.add('bg-[#1DD100]');
                seat.classList.remove('bg-[#F7F8F8]');
                seat.style.color = 'white';
                seatSelect = seatSelect + 1;
                setTextElementValueById('booked-seat', seatSelect);

                // Add the seat to the selectedSeats set
                selectedSeats.add(seat);

                const seatsLeft = getTextElementValueById('seats-left');
                const seatUpdate = seatsLeft - 1;
                setTextElementValueById('seats-left', seatUpdate);

                const div = document.createElement('div');
                div.classList.add('font-inter', 'text-base', 'flex', 'justify-between', 'p-4', 'text-[#03071299]');

                const ticketPrice = getTextElementValueById('ticket-price');

                const para = document.createElement('p');
                const text = seat.innerText;
                para.innerText = text;

                const para2 = document.createElement('p');
                para2.innerText = 'Economy';

                const para3 = document.createElement('p');
                para3.innerText = ticketPrice;

                div.append(para, para2, para3);
                seatTaken.appendChild(div);

                totalPriceUpdate = seatSelect * ticketPrice;
                setTextElementValueById('total-price', totalPriceUpdate);
                const grandTotal = totalPriceUpdate;
                setTextElementValueById('grand-total', grandTotal);

                isSelected = true;

                nextBtn.removeAttribute('disabled');
                nextBtn.style.backgroundColor = '#1DD100';

                // Enable the next button and change its color
                nextBtn.removeAttribute('disabled');
                nextBtn.style.backgroundColor = '#1DD100';

                if (seatSelect === 4) {
                    applyBtn.removeAttribute('disabled');
                } else {
                    applyBtn.setAttribute('disabled', true);
                }
            } else {
                alert('Cannot select more than 4 seats');
            }
        } else {
            alert('Seat already selected');
        }
    });
}

const couponApply = document.getElementById('coupon-apply');

applyBtn.addEventListener('click', function () {
    const new15 = getInputTextById('new15');
    const couple20 = getInputTextById('couple20');
    const insertCoupon = getInputValueById('insert-coupon');

    if (insertCoupon === new15) {
        const newTotal = totalPriceUpdate * 0.15;
        const grandTotal = totalPriceUpdate - newTotal;
        setTextElementValueById('grand-total', grandTotal);
        couponApply.classList.add('hidden');
        setValueElementById('insert-coupon', '');
        applyBtn.setAttribute('disabled', true);
    } else if (insertCoupon === couple20) {
        const coupleTotal = totalPriceUpdate * 0.20;
        const grandTotal = totalPriceUpdate - coupleTotal;
        setTextElementValueById('grand-total', grandTotal);
        couponApply.classList.add('hidden');
        setValueElementById('insert-coupon', '');
        applyBtn.setAttribute('disabled', true);
    } else {
        alert('Invalid Coupon');
    }
});

function validatePhoneAndProceed() {
    const phoneInput = document.getElementById('phoneInput');

    // Remove any existing error messages
    removeErrorMessage();

    // Validate if at least one seat is selected
    if (!isSelected) {
        alert("Please select at least one seat.");
        return;
    }

    // Validate if the phone number is not empty
    if (phoneInput.value.trim() === "") {
        displayErrorMessage("Phone number must be provided.");
    } 
    else {
        // Enable the next button and change its color
        nextBtn.removeAttribute('disabled');
        nextBtn.style.backgroundColor = '#1DD100';

        // Next
        next();
    }
}

function displayErrorMessage(message) {
    // Create a new div for displaying the error message
    const errorMessageDiv = document.createElement('div');
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.color = 'red';
    errorMessageDiv.classList.add('error-message'); // Add a class for styling

    // Append the error message div next to the phoneInput element
    const phoneInput = document.getElementById('phoneInput');
    phoneInput.parentNode.insertBefore(errorMessageDiv, phoneInput.nextSibling);
}

function removeErrorMessage() {
    // Remove any existing error message divs
    const existingErrorMessages = document.querySelectorAll('.error-message');
    existingErrorMessages.forEach(message => message.remove());
}

function next() {
    console.log('Proceeding to the next step...');
    my_modal_1.showModal();
}

// Assuming you have a dialog element with id 'my_modal_1'
const myModal = document.getElementById('my_modal_1');

// Add an event listener to the form inside the dialog
myModal.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();  // Prevent the default form submission behavior

  // Your logic for continuing the process without page refresh

  // Close the modal
  my_modal_1.close();

  // Reload the page
  window.location.reload();
});

// Assuming you have a button inside the form with class 'btn'
myModal.querySelector('form .btn').addEventListener('click', function() {
  // Programmatically submit the form when the button is clicked
  myModal.querySelector('form').submit();
});