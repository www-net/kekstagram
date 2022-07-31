import { checkStringLength } from "./util.js";

const uploadForm = document.querySelector('#upload-select-image');
const inputHashtags = uploadForm.querySelector('.text__hashtags');
const commentTextarea = uploadForm.querySelector('.text__description');

//Параметры комментариев
const CommentsFeatures = {
  MAX_LENGTH: 140,
}

//Описание констант
const SPACE_HASHTAG_SEPARATOR = ' ';

//Параметры хэш-тегов
const HashtagsFeatures = {
  MAX_NUMBER: 5,
  MAX: 20,
  REGULAR: /^#[A-Za-za-Яа-яЁё 0-9]{1,19}$/,
  IS_HASH_SYMBOL: /[^#]/,
};

//Сообщания об ошибках
const ErrorMessages = {
  COMMENT_LONG: `Комментарий не может составлять больше ${CommentsFeatures.MAX_LENGTH} символов`,
  HASHTAGS_LONG: `Максимальная длина одного хэш-тега не должна превышать ${HashtagsFeatures.MAX} символов`,
  BAG_SYMBOL_MESSAGE: 'Строка после решетки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и.т.п), символы пунктуации (тире, запятая, и.т.п), эмодзи',
  HASH_SYMBOL: 'Хэш-тег должен начинаться с символа # (решётка)',
  TOO_SHORT: 'Хэш-тег не может состоять только из символа # (решётка)',
  UNIQUE: 'Хэш-тег не может быть использован дважды',
  OVER_MAX: `Количество хэш-тегов не должно быть больше ${HashtagsFeatures.MAX_NUMBER}`,
  SPACE_HASHTAGS: 'Хэш-теги должны разделяться пробелами',
}

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'div',
  errorTextClass: 'text'
});

//Обработчик отправки
uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault()

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма не валидна');
  }

  pristine.validate();
});

// Обработчик проверки длины строки ввода комментария
const getCommentTextareaInput = (value) => (
  checkStringLength(value, CommentsFeatures.MAX_LENGTH)
)

pristine.addValidator(commentTextarea, getCommentTextareaInput, ErrorMessages.COMMENT_LONG);

//Функция деления строки хэштегов по указаннаму элементу separator
const stringToArray = (string, separator) => string.split(separator);

// Обработчик проверки длины строки ввода хештега (не более 20 символов)
pristine.addValidator(inputHashtags, () => {
  const hashtags = stringToArray(inputHashtags.value.toLowerCase(), SPACE_HASHTAG_SEPARATOR);
  return hashtags.every((hashtag) => Hashtag.length <= HashtagsFeatures.MAX);
}, ErrorMessages.HASHTAGS_LONG);

//Проверка ввода недопустимых регулярных символов
pristine.addValidator(inputHashtags, () => {
  const hashtags = stringToArray(inputHashtags.value.toLowerCase(), SPACE_HASHTAG_SEPARATOR);
  return hashtags.every((hashtag) => HashtagsFeatures.REGULAR.test(hashtag));
}, ErrorMessages.BAG_SYMBOL_MESSAGE);

//Проверка на обязательное наличие первого символа '#'
pristine.addValidator(inputHashtags, () => {
  const hashtags = stringToArray(inputHashtags.value.toLowerCase(), SPACE_HASHTAG_SEPARATOR);
  return hashtags.every((hashtag) => Hashtag.startsWith('#'));
}, ErrorMessages.HASH_SYMBOL);

//Проверка на наличие ввода только символа #
pristine.addValidator(inputHashtags, (value) => {
  if (value.match(HashtagsFeatures.IS_HASH_SYMBOL)) {
    return true;
  }
  return false;
}, ErrorMessages.TOO_SHORT);

//Проверка наличия повторного хэштега
pristine.addValidator(inputHashtags, () => {
  const hashtagsArr = stringToArray(inputHashtags.value.toLowerCase(), SPACE_HASHTAG_SEPARATOR);
  const newArrDublicates = Array.from(hashtagsArr);
  let duplicateExists = true;
  for (let i = 0; i <= hashtagsArr.length; i++) {
    if (!(hashtagsArr[i] in newArrDublicates)) {
      newArrDublicates[hashtagsArr[i]] = true;
    } else {
      duplicateExists = false;
    }
  }
  return duplicateExists;
}, ErrorMessages.UNIQUE);

//Проверка количества введенных хештегов не более 5
pristine.addValidator(inputHashtags, (value) => {
  if (!(value.split(' ').length > hashtagsFeatures.MAX_NUMBER)) {
    return true;
  }
  return false;
}, ErrorMessages.OVER_MAX);

//Проверка пробелов между хэштегами
pristine.addValidator(inputHashtags, (value) => {
  if (value.split('#').length - 1 > 1) {
    return true;
  }
  return false;
}, ErrorMessages.SPACE_HASHTAGS);
