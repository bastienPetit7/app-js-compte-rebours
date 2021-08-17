const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm'); 
const dateEl = document.getElementById('date-picker'); 

const countdownEl = document.getElementById('countdown'); 
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button'); 
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = ''; 
let countdownValue = Date;
let countdownActive;
let savedCountdown;  

// Set up second, minute, hour, day
const second = 1000; 
const minute = second * 60; 
const hour = minute * 60; 
const day = hour * 24;

// Set Sate Input Min with Today's Date

const today = new Date().toISOString().split('T')[0]; 
dateEl.setAttribute('min', today);

// Populate Countdown / Complete UI 
function uptdateDOM(){

   countdownActive = setInterval(() => {
        // Calcul de l'interval de temps entre actuel date et date de l'evenement a countdown
        const now = new Date().getTime(); 
        const distance = countdownValue - now; 
        // Conversion de la valeurs distance en days, hours, minutes, seconds
        const days = Math.floor(distance / day); 
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

         // Hide Input
         inputContainer.hidden = true; 

        // If the countdown has ended, show complete, stop the setInterval method
         if (distance < 0){
             completeEl.hidden = false; 
             countdownEl.hidden = true; 
             completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
             clearInterval(countdownActive);
         } else {
             // Populate Countdown 
            countdownElTitle.textContent = `${countdownTitle}`; 
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            // Show Countdown
            countdownEl.hidden = false;
         }   
   }, second);    
}

// Take Values from Form Input 
function updateCountdown(e) {
    // Annulation du comportement par defaut refresh page when click Submit button...
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    // Save those values to Local Storage
    savedCountdown = {
        title : countdownTitle,
        date : countdownDate,
    }; 
    localStorage.setItem('countdown', JSON.stringify(savedCountdown)); 
    //if no number wrighting show alert message
    if ( countdownDate === ''){
        alert('Please select a date for the countdown')
    } else {
    // Get the number version of current date
    countdownValue = new Date(countdownDate).getTime();
    // 
    uptdateDOM();
    }
    
}

// Reset all value
function reset(){
    //Hide Countdown, show input
    countdownEl.hidden = true;
    inputContainer.hidden = false; 
    completeEl.hidden = true;
    // Stop the countdown
    clearInterval(countdownActive); 
    // Reset Values
    countdownTitle = ''; 
    countdownDate = ''; 
    localStorage.removeItem('countdown'); 
}

function restorePreviousCountdown() {
    // Get Countdown from Local Storage if available
    if (localStorage.getItem('countdown')){
        inputContainer.hidden = true; 
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title; 
        countdownDate = savedCountdown.date; 
        countdownValue = new Date(countdownDate).getTime();
        uptdateDOM();
    }
}

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset); 

// On Load, check localStorage
restorePreviousCountdown(); 