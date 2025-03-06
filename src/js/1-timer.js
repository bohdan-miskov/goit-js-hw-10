// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateValidation(selectedDates[0]);
  },
};

const messageOptions = {
  class: 'message error-message',
  titleColor: '#fff',
  titleSize: '16',
  titleLineHeight: '1.5',
  messageColor: '#fff',
  messageSize: '16',
  messageLineHeight: '1.5',
  backgroundColor: '#ef4040',
  theme: 'dark',
  image: '../img/error-message-icon.svg',
  imageWidth: 24,
  position: 'topRight',
  timeout: 5000,
};

const calendar = flatpickr('#datetime-picker', options);
const startBtn = document.querySelector('[data-start]');
const dateInput = document.querySelector('input');
const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');

let selectedDate;

startBtn.disabled = true;

startBtn.addEventListener('click', startCountDown);

function dateValidation(currentDate) {
  if (currentDate < new Date()) {
    iziToast.show({
      ...messageOptions,
      message: 'Please choose a date in the future',
    });
    startBtn.disabled = true;
    return;
  }
  selectedDate = currentDate;
  startBtn.disabled = false;
}

function startCountDown() {
  startBtn.disabled = true;
  dateInput.disabled = true;
  let interval = new Date(selectedDate - Date.now());
  setTimerDate(interval);

  const timer = setInterval(() => {
    interval = new Date(interval - 1000);
    setTimerDate(interval);
    if (interval < 1000) {
      startBtn.disabled = false;
      dateInput.disabled = false;
      clearInterval(timer);
    }
  }, 1000);
}

function setTimerDate(date) {
  date = convertMs(date);

  daysTimer.textContent = date.days;
  hoursTimer.textContent = addLeadingZero(date.hours);
  minutesTimer.textContent = addLeadingZero(date.minutes);
  secondsTimer.textContent = addLeadingZero(date.seconds);
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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
