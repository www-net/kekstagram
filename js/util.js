
// генерация числа из массива

const getRandomPositiveInteger = function (min, max) {
  if (max > min && min >= 0 && max >= 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }
  return 'Число должно быть положительным и/или больше минимального значения!';
}

// Функция ниже возвращает булевое значение, проверяя длину текста:

const checkStringLength = function (text, maxLength) {
  return text.length <= maxLength;
}

export { getRandomPositiveInteger, checkStringLength }
