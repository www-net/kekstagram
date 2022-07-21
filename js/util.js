
// генерация числа из массива

const getRandomPositiveInteger = function (a, b) {
    const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
    const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
    const result = Math.random() * (upper - lower + 1) + lower; //Максимум и минимум включаются
    return Math.floor(result);
  }

// Функция ниже возвращает булевое значение, проверяя длину текста:

const checkStringLength = function (text, maxLength) {
  return text.length <= maxLength;
}

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


export { getRandomPositiveInteger, checkStringLength, isEscapeEvent, isEnterEvent };
