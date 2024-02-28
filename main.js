// variables
let inputHoursEl = document.querySelector('.input-hours');
let inputMinutesEl = document.querySelector('.input-minutes');
let inputSecondsEl = document.querySelector('.input-seconds');

let startButtonEl = document.querySelector('.start-button');

let countHoursEl = document.querySelector('.count-hours');
let countMinutesEl = document.querySelector('.count-minutes');
let countSecondsEl = document.querySelector('.count-seconds');

let playButtonEl = document.querySelector('.play-button');
let resetButtonEl = document.querySelector('.reset-button');

// disable  the buttons by default
startButtonEl.disabled = true; 
resetButtonEl.disabled = true;
playButtonEl.disabled = true;

// change styles when the button is disabled to show freeze effect

if(startButtonEl.disabled){
    startButtonEl.style.background = '#cccccc';
    playButtonEl.style.background = '#cccccc';
    resetButtonEl.style.background = '#cccccc';

    startButtonEl.disabled = true;
}

// Activate the start button on input key up

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keyup', () => {
        startButtonEl.disabled = false;
        startButtonEl.style.background = 'rgb(19, 19, 19)';

    });
});

// Take the input values and save them in a variable

let minutes = 0,
    hours = 0,
    seconds = 0;

// Add the input values to the DOM after clicking the start button;
startButtonEl.addEventListener('click', () => {
     hours = inputHoursEl.value;
     minutes = inputMinutesEl.value;
     seconds = inputSecondsEl.value;

     
    // add zero
    hours = addZero(hours);
    minutes = addZero(minutes);
    seconds = addZero(seconds)

    countHoursEl.textContent = hours;
    countMinutesEl.textContent = minutes;
    countSecondsEl.textContent = seconds;

    // reset input
    inputHoursEl.value = '';
    inputMinutesEl.value = '';
    inputSecondsEl.value = '';

    // Disable start button after input
    startButtonEl.disabled = true;
    startButtonEl.style.background = '#cccccc';

    // Enable Reset and Play buttons
    resetButtonEl.disabled = false;
    playButtonEl.disabled = false;

    playButtonEl.style.background = 'rgb(19, 19, 19)';
    resetButtonEl.style.background = 'rgb(19, 19, 19)';

});

let isCounting = false;
let intervalId;

// Start the watch button clicked
playButtonEl.addEventListener('click', () => {
    if(!isCounting){
        intervalId = setInterval(function(){

        // After adding zero to the numbers they are converted to string then we need to Convert the string back to numbers

        seconds = Number(seconds);
        minutes = Number(minutes);
        hours = Number(hours);

            if (hours === 0 && (minutes === 0 && seconds === 0))	{
                hours = 0;
                minutes = 0;
                seconds = 0;

            } else if(seconds > 0 && seconds <= 60){

                seconds --;

            }else if (minutes > 0 && seconds === 0){
                seconds = 59;
                minutes -- ;
                

            }else if (hours > 0 && minutes === 0 || seconds >= 0){
                seconds = 59;
                minutes = 59;
                hours --;
            }

            seconds = addZero(seconds);
            minutes = addZero(minutes);
            hours = addZero(hours);

            countSecondsEl.textContent = seconds;
            countMinutesEl.textContent = minutes;
            countHoursEl.textContent = hours;

            playButtonEl.innerHTML = 'Pause';

        }, 1000);

        isCounting = true;

    }else{

        clearInterval(intervalId);
        isCounting = false;
        playButtonEl.innerHTML = 'Play';

    }

    
});

// Disable reset button
if(playButtonEl.innerHTML === 'Pause'){
    resetButtonEl.disabled = true;
    resetButtonEl.style.background = '#cccccc';
}

// reset watch button clicked
resetButtonEl.addEventListener('click', () => {

    hours = 0;
    minutes = 0;
    seconds = 0;

    // add zero
    hours = addZero(hours);
    minutes = addZero(minutes);
    seconds = addZero(seconds);

    countMinutesEl.innerText = minutes;
    countSecondsEl.innerText = seconds;
    countHoursEl.innerText = hours;

    clearInterval(intervalId);
    isPlaying = false;	

    resetButtonEl.disabled = true;
    playButtonEl.disabled = true;
    playButtonEl.style.background = '#cccccc';
    resetButtonEl.style.background = '#cccccc';
    playButtonEl.innerHTML = 'Play';

});

// Add zero function when the numbers are less than 10

function addZero(zero){
    if(zero >= 0 && zero < 10){
        zero = '0' + zero;
    }

    return zero;
}

// Watch settings