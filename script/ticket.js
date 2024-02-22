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
            if (seatSelect < 4) {
                seat.classList.add('bg-[#1DD100]');
                seat.classList.remove('bg-[#F7F8F8]');
                seat.style.color = 'white';
                seatSelect = seatSelect + 1;
                setTextElementValueById('booked-seat', seatSelect);

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

    removeErrorMessage();

    if (!isSelected) {
        alert("Please select at least one seat.");
        return;
    }

    if (phoneInput.value.trim() === "") {
        displayErrorMessage("Phone number must be provided.");
    }
    else {
        nextBtn.removeAttribute('disabled');
        nextBtn.style.backgroundColor = '#1DD100';

        next();
    }
}

function displayErrorMessage(message) {
    const errorMessageDiv = document.createElement('div');
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.color = 'red';
    errorMessageDiv.classList.add('error-message');
    const phoneInput = document.getElementById('phoneInput');
    phoneInput.parentNode.insertBefore(errorMessageDiv, phoneInput.nextSibling);
}

function removeErrorMessage() {
    const existingErrorMessages = document.querySelectorAll('.error-message');
    existingErrorMessages.forEach(message => message.remove());
}

function next() {
    console.log('Proceeding to the next step...');
    my_modal_1.showModal();
}

const myModal = document.getElementById('my_modal_1');

myModal.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();


    my_modal_1.close();

    window.location.reload();
});

myModal.querySelector('form .btn').addEventListener('click', function () {
    myModal.querySelector('form').submit();
});