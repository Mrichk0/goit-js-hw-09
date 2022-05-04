import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datetimePicker = document.querySelector('#datetime-picker');
const timeValue = document.querySelectorAll('.value');
const buttonStart = document.querySelector('[data-start]');
const daysSpan = document.querySelector('span[data-days]');
const hoursSpan = document.querySelector('span[data-hours]');
const minutesSpan = document.querySelector('span[data-minutes]');
const secondsSpan = document.querySelector('span[data-seconds]');

buttonStart.addEventListener('click', onStartClickInit);

buttonStart.disabled = true;

let selectedTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    selectedTime = selectedDates[0].getTime();
    buttonStart.disabled = false;
  },
};

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

flatpickr('#datetime-picker', options);

function setClock(days, hours, minutes, seconds) {
  daysSpan.innerHTML = addLeadingZero(days);
  hoursSpan.innerHTML = addLeadingZero(hours);
  minutesSpan.innerHTML = addLeadingZero(minutes);
  secondsSpan.innerHTML = addLeadingZero(seconds);
}

function onStartClickInit() {
  buttonStart.disabled = true;
  const intervalID = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(selectedTime - Date.now());
    setClock(days, hours, minutes, seconds);
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(intervalID);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
