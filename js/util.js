const ALERT_SHOW_TIME = 5000;

// Генерация числа из массива
const getRandomPositiveInteger = function (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower; //Максимум и минимум включаются
  return Math.floor(result);
};

// Функция ниже возвращает булевое значение, проверяя длину текста:
const checkStringLength = function (text, maxLength) {
  return text.length <= maxLength;
};

// Функция закрытия окна по Escape
const isEscapeEvent = (evt, action) => {
  if (evt.key === 'Escape') {
    action();
  }
};

// Функция закрытия окна с помощью Enter по кнопке close
const isEnterEvent = (evt, action) => {
  if (evt.key === 'Enter') {
    action();
  }
};


// Показ сообщения об отправке с ошибкой на 5 секунд
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.top = 0;
  alertContainer.style.left = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'tomato';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Функция перемешивания массива
const mixPhotosArray = (array) => {
  let k;
  let temp;
  for (let i = array.length - 1; i > 0; i--) {
    k = Math.floor(Math.random() * (i + 1));
    temp = array[k];
    array[k] = array[i];
    array[i] = temp;
  }
  return array;
};

// Устранение дребезга списка фотографий
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getRandomPositiveInteger, checkStringLength, isEscapeEvent, isEnterEvent, showAlert, mixPhotosArray, debounce };
