
// Display Container
const inputContainer = document.getElementById('input-container');
const countdownContainer = document.getElementById('countdown');
const completeContainer = document.getElementById('complete');

// Input Container 
const countdownForm = document.getElementById('countdownForm');
const inputTitle = document.getElementById('title');
const inputDate = document.getElementById('date-picker');

// Countdown Container 
const countdownTitle = document.getElementById('countdown-title');
const countdownSpan = document.querySelectorAll('span');
const countdownButton = document.getElementById('countdown-button');

// Complete Container 
const completeInfo = document.getElementById('complete-info');
const completeButton = document.getElementById('complete-button');


let eventTitleValue = '';
let eventDateValue = '';
let countdownDataArray = [];

// Days, Hours, Mnutes, Seconds
const days = 86400; 
const hours = days / 24; 
const minutes = hours / 60; 
const secondes = minutes / 60; 

// Distance Time
let distanceDays = 0;
let distanceHours = 0;
let distanceMinutes = 0;
let distanceSeconds = 0;

 

// Show Complete Container
function showComplete() {
    countdownContainer.hidden = true;
    inputContainer.hidden = true;
    completeContainer.hidden = false; 

    completeInfo.textContent = `${eventTitleValue} terminé le ${eventDateValue}`; 

} 

// Show countdown
function showCountdown(){
    inputContainer.hidden = true; 
    countdownContainer.hidden = false; 
}

// Populate countdown values to the DOM 
function countdownToDOM() {
    countdownTitle.textContent = eventTitleValue;

    countdownSpan[0].textContent = distanceDays;
    countdownSpan[1].textContent = distanceHours;
    countdownSpan[2].textContent = distanceMinutes;
    if ( distanceSeconds < 10){
        countdownSpan[3].textContent = `0${distanceSeconds}`;
    } else {
        countdownSpan[3].textContent = distanceSeconds;
    }
}


// Set Up the countdown with input value 
function countdownSetUp() {
    const countdownOn = setInterval(()=> {
        const todayMilliSec = new Date().getTime();
        const eventDate = new Date(eventDateValue);
        const eventMilliSec = eventDate.getTime(); 
        const distanceSec = (eventMilliSec - todayMilliSec) / 1000; 
        
        distanceDays = Math.floor(distanceSec / days); 
        distanceHours = Math.floor((distanceSec % days) / hours);
        distanceMinutes = Math.floor(((distanceSec % days) % hours) / minutes); 
        distanceSeconds = Math.floor(((distanceSec % days) % hours) % minutes); 

        countdownToDOM();

        if ( distanceSec <= 0){
            clearTimeout(countdownOn);
            showComplete();
        }
    }, 1000);

}



// Get Input value from Form + Set countdown
function submitCountdownValue(e) {
    e.preventDefault(); 
    eventTitleValue = e.srcElement[0].value; 
    eventDateValue = e.srcElement[1].value;
    countdownDataArray.push(eventTitleValue, eventDateValue); 
    localStorage.setItem('countdown', JSON.stringify(countdownDataArray));
    
    console.log(countdownDataArray);

    if(eventDateValue === new Date().toISOString().split("T")[0]){
        showComplete();

    } else {
            countdownSetUp();
            setTimeout(() => {
                showCountdown();
            }, 1500); 
        }
    
}

// Check if Local storage and do what needed
function getDataStorage() {
    if(localStorage.getItem('countdown')){
        countdownDataArray = JSON.parse(localStorage.getItem('countdown')); 
        eventTitleValue = countdownDataArray[0]; 
        eventDateValue = countdownDataArray[1]; 
        if(eventDateValue === new Date().toISOString().split("T")[0]){
            showComplete();
    
        } else {
                countdownSetUp();
                setTimeout(() => {
                    showCountdown();
                }, 1000); 
            }
    } else {
        inputContainer.hidden = false; 
    }
}

// Reset countdown to a virgin one 
function resetCountdown() {
    localStorage.removeItem('countdown');
    eventTitleValue = '';
    eventDateValue = '';
    countdownDataArray = []; 
    countdownForm.reset();
    countdownContainer.hidden = true;
    completeContainer.hidden = true; 
    inputContainer.hidden = false;

}


// Event Listenner 
countdownForm.addEventListener('submit', submitCountdownValue);
completeButton.addEventListener('click', resetCountdown); 
countdownButton.addEventListener('click', resetCountdown); 


// ON LOAD
getDataStorage();
inputDate.setAttribute('min', `${new Date().toISOString().split("T")[0]}`); 


















// Notes 

//getTime()	Returns the number of milliseconds since midnight Jan 1 1970, and a specified date

// const event = new Date();
// const event2 = new Date(eventDateValue);

// console.log('test date', event.getTime());
// console.log('test date 2 : ', event2.getTime());
// console.log('test toISOstring', event.toISOString().split("T"));

//    // Console Log Distance Time til Event 
//    console.log('distance Seconds', distanceSec);
//    console.log('Days :',distanceDays); 
//    console.log('Hours :',distanceHours);
//    console.log('minutes :',distanceMinutes);
//    console.log('Seconds :',distanceSeconds);