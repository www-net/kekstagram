import { checkStringLength, showAlert } from './util.js';
import { sendData } from './api.js';
import { blockSubmitButton, unblockSubmitButton, onSuccessCloseForm, onErrorCloseForm } from './form.js';

const uploadForm = document.querySelector('#upload-select-image');
const inputHashtags = uploadForm.querySelector('.text__hashtags');
const commentTextarea = uploadForm.querySelector('.text__description');

//Параметры комментариев
const commentsFeatures = {
  MAX_LENGTH: 140,
};

//Описание констант
const SPACE_HASHTAG_SEPARATOR = ' ';

//Параметры хэш-тегов
const hashtagsFeatures = {
  MAX_NUMBER: 5,
  MAX: 20,
  REGULAR: /^#[A-Za-za-Яа-яЁё 0-9]{1,19}$/,
  IS_HASH_SYMBOL: /[^#]/,
};

//Сообщания об ошибках
const errorMessages = {
  COMMENT_LONG: `Комментарий не может составлять больше ${commentsFeatures.MAX_LENGTH} символов`,
  HASHTAGS_LONG: `Максимальная длина одного хэш-тега не должна превышать ${hashtagsFeatures.MAX} символов`,
  BAG_SYMBOL_MESSAGE: 'Строка после решетки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и.т.п), символы пунктуации (тире, запятая, и.т.п), эмодзи',
  HASH_SYMBOL: 'Хэш-тег должен начинаться с символа # (решётка)',
  TOO_SHORT: 'Хэш-тег не может состоять только из символа # (решётка)',
  UNIQUE: 'Хэш-тег не может быть использован дважды',
  OVER_MAX: `Количество хэш-тегов не должно быть больше ${hashtagsFeatures.MAX_NUMBER}`,
  SPACE_HASHTAGS: 'Хэш-теги должны разделяться пробелами',
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'div',
  errorTextClass: 'text'
});

//Обработчик отправки формы
const setUserFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          onSuccessCloseForm();
          unblockSubmitButton();
        },
        () => {
          showAlert('Не удалось отправить форму. Попробуйте ещё раз');
          onErrorCloseForm();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

// Обработчик проверки длины строки ввода комментария
const getCommentTextareaInput = (value) => (
  checkStringLength(value, commentsFeatures.MAX_LENGTH)
);

pristine.addValidator(commentTextarea, getCommentTextareaInput, errorMessages.COMMENT_LONG);

//Функция деления строки хэштегов по указаннаму элементу separator
const stringToArray = (string, separator) => string.split(separator);

// Обработчик проверки длины строки ввода хештега (не более 20 символов)
pristine.addValidator(inputHashtags, () => {
  const hashtags = stringToArray(inputHashtags.value.toLowerCase(), SPACE_HASHTAG_SEPARATOR);
  return hashtags.every((hashtag) => hashtag.length <= hashtagsFeatures.MAX);
}, errorMessages.HASHTAGS_LONG);

//Проверка ввода недопустимых регулярных символов
pristine.addValidator(inputHashtags, () => {
  const hashtags = stringToArray(inputHashtags.value.toLowerCase(), SPACE_HASHTAG_SEPARATOR);
  return hashtags.every((hashtag) => hashtagsFeatures.REGULAR.test(hashtag) || hashtag.length === 0);
}, errorMessages.BAG_SYMBOL_MESSAGE);


//Проверка на обязательное наличие первого символа '#'
pristine.addValidator(inputHashtags, () => {
  const hashtags = stringToArray(inputHashtags.value.toLowerCase(), SPACE_HASHTAG_SEPARATOR);
  return hashtags.every((hashtag) => hashtag.startsWith('#') || hashtag.length === 0);
}, errorMessages.HASH_SYMBOL);

//Проверка на наличие ввода только символа #
pristine.addValidator(inputHashtags, (value) => {
  if (value.match(hashtagsFeatures.IS_HASH_SYMBOL) || value.length === 0) {
    return true;
  }
  return false;
}, errorMessages.TOO_SHORT);

//Проверка наличия повторного хэштега
pristine.addValidator(inputHashtags, () => {
  const hashtagsArr = stringToArray(inputHashtags.value.toLowerCase(), SPACE_HASHTAG_SEPARATOR);
  const copyArrDublicates = Array.from(hashtagsArr);
  let duplicateExists = true;
  for (let i = 0; i <= hashtagsArr.length; i++) {
    if (!(hashtagsArr[i] in copyArrDublicates)) {
      copyArrDublicates[hashtagsArr[i]] = true;
    } else {
      duplicateExists = false;
    }
  }
  return duplicateExists;
}, errorMessages.UNIQUE);

//Проверка количества введенных хештегов не более 5
pristine.addValidator(inputHashtags, (value) => {
  if (!(value.split(' ').length > hashtagsFeatures.MAX_NUMBER)) {
    return true;
  }
  return false;
}, errorMessages.OVER_MAX);

//Проверка пробелов между хэштегами
pristine.addValidator(inputHashtags, () => {
  const hashtags = stringToArray(inputHashtags.value.toLowerCase(), SPACE_HASHTAG_SEPARATOR);
  return hashtags.every((hashtag) => hashtagsFeatures.REGULAR.test(hashtag) || hashtag.length === 0);
}, errorMessages.SPACE_HASHTAGS);


export {setUserFormSubmit};
