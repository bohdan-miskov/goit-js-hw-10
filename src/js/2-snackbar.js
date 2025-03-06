// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const messageOptions = {
  titleColor: '#fff',
  titleSize: '16',
  titleLineHeight: '1.5',
  messageColor: '#fff',
  messageSize: '16',
  messageLineHeight: '1.5',
  theme: 'dark',
  close: false,
  position: 'topRight',
  timeout: 5000,
};
const errorMessageOptions = {
  ...messageOptions,
  class: 'message error-message',
  backgroundColor: '#680901',
  image: '../img/error-message-icon.svg',
  imageWidth: 24,
  close: true,
};

const form = document.querySelector('.form');
const delayInput = form.querySelector("input[name='delay']");
const radioInputs = form.querySelectorAll("input[name='state']");

form.addEventListener('submit', createNotification);

function createNotification(event) {
  event.preventDefault();
  if (delayValidate(delayInput.value)) {
    const delay = Number(delayInput.value);

    const state = [...radioInputs].find(radio => radio.checked).value;

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else if (state === 'rejected') {
          reject(delay);
        }
      }, delay);
    });

    promise
      .then(value =>
        createBaseMessage(`✅ Fulfilled promise in ${value}ms`, '#59a10d')
      )
      .catch(error =>
        createBaseMessage(`❌ Rejected promise in ${error}ms`, '#ef4040')
      );
  }
}

function delayValidate(delay) {
  if (isFinite(delay) && delay >= 0) {
    return true;
  }
  iziToast.show({
    ...errorMessageOptions,
    title: 'Error',
    message: 'Illegal operation',
  });
  return false;
}
function createBaseMessage(message, backgroundColor = '#fff') {
  iziToast.show({
    ...messageOptions,
    message,
    backgroundColor,
  });
}
