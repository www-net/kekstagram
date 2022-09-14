import { isEscapeEvent, isEnterEvent } from './util.js';
import { onMinButtonClick, onMaxButtonClick, getScaleImageTransform } from './scale.js';

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadFileInput = document.querySelector('#upload-file');
const editImageOverlay = uploadForm.querySelector('.img-upload__overlay');
const editImageCloseButton = editImageOverlay.querySelector('#upload-cancel');
const inputHashtags = editImageOverlay.querySelector('.text__hashtags');
const commentTextarea = editImageOverlay.querySelector('.text__description');
const minScaleButton = editImageOverlay.querySelector('.scale__control--smaller');
const maxScaleButton = editImageOverlay.querySelector('.scale__control--bigger');
const imageScaleValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview');
const image = imagePreview.querySelector('img');
const sliderBlock = document.querySelector('.effect-level');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const DEFAULT_SCALE_VALUE = 100;

//Функция закрытия окна редактирования
const closeImageEditOverlay = () => {
  body.classList.remove('modal-open');
  editImageOverlay.classList.add('hidden');
  uploadForm.reset();
  minScaleButton.removeEventListener('click', onMinButtonClick);
  maxScaleButton.removeEventListener('click', onMaxButtonClick);
  minScaleButton.removeEventListener('keydown', onLowerImageScaleEnterPress);
  maxScaleButton.removeEventListener('keydown', onHigherImageScaleEnterPress);
  document.removeEventListener('keydown', onImageOverlayEscPress);
  editImageCloseButton.removeEventListener('keydown', onCloseImageOverlayEnterPress);
  editImageCloseButton.removeEventListener('click', closeImageEditOverlay);
};

// Функция открытия окна редактирования
const openImageEditOverlay = () => {
  body.classList.add('modal-open');
  editImageOverlay.classList.remove('hidden');
  imageScaleValue.value = `${DEFAULT_SCALE_VALUE}%`;
  getScaleImageTransform();
  image.style.filter = '';
  sliderBlock.classList.add('hidden');
  // Добавляем события на кнопки изменения масштаба
  minScaleButton.addEventListener('click', onMinButtonClick);
  maxScaleButton.addEventListener('click', onMaxButtonClick);
  minScaleButton.addEventListener('keydown', onLowerImageScaleEnterPress);
  maxScaleButton.addEventListener('keydown', onHigherImageScaleEnterPress);
  //Добавляем события на закрытие окна редактирования
  document.addEventListener('keydown', onImageOverlayEscPress);
  editImageCloseButton.addEventListener('keydown', onCloseImageOverlayEnterPress);
  editImageCloseButton.addEventListener('click', closeImageEditOverlay);
};

//Обработчик окна редакторования
function onUploadChange() {
  openImageEditOverlay();
}

uploadFileInput.addEventListener('change', onUploadChange);

// Функция закрытия окна редактирования по нажатию клавиши Esc
function onImageOverlayEscPress  (evt) {
  const active = document.activeElement;
  if (inputHashtags !== active && commentTextarea !== active) {
    isEscapeEvent(evt, closeImageEditOverlay);
  }
}

// Функция закрытия окна редактирования по нажатию клавиши Enter
function onCloseImageOverlayEnterPress (evt) {
  isEnterEvent(evt, closeImageEditOverlay);
}

// Функция уменьшения масштаба изображения по нажатию клавиши Enter на кнопку 'уменьшения масштаба'
function onLowerImageScaleEnterPress (evt) {
  isEnterEvent(evt, onMinButtonClick);
}

// Функция увеличения масштаба изображения по нажатию клавиши Enter на кнопку 'увеличения масштаба'
function onHigherImageScaleEnterPress (evt) {
  isEnterEvent(evt, onMaxButtonClick);
}

// Создаем фрагмент сообщения об успешной отправке
const createStatusMessage = (template) => {
  const statusMessage = template.cloneNode(true);
  const fragment = document.createDocumentFragment();
  fragment.appendChild(statusMessage);
  body.appendChild(fragment);
};

//Создание сообщения об успешной отправке формы
const createSuccessMessage = () => {
  createStatusMessage(successTemplate);
};

//Закрытие сообщения об успешной отправке
const closeSuccessMessage = () => {
  const successOverlay = document.querySelector('.success');
  const successMessageButton = successTemplate.querySelector('.success__button');
  successMessageButton.removeEventListener('click', onSuccessMessageCloseClick);
  document.removeEventListener('keydown', onSuccessMessageEscPress);
  body.removeChild(successOverlay);
};

// Обработчик закрытия сообщения об успешной отправке
function onSuccessMessageCloseClick () {
  closeSuccessMessage();
}

//Разблокировка кнопки после отправки
const unblockSubmitButton = () => {
  const uploadFormButton = document.querySelector('.img-upload__submit');
  uploadFormButton.disabled = false;
  uploadFormButton.textContent = 'опубликовать';
};

//Обработчик закрытия успешной отправки формы
const onSuccessCloseForm = () => {
  createSuccessMessage();
  const successOverlay = document.querySelector('.success');
  const successMessageButton = successTemplate.querySelector('.success__button');
  document.addEventListener('keydown', onSuccessMessageEscPress);
  successMessageButton.addEventListener('click', onSuccessMessageCloseClick);
  const successField = document.querySelector('.success__inner');
  successOverlay.addEventListener('click', (evt) => {
    if (evt.target !== successField) {
      closeSuccessMessage();
    }
  });
};

//Блокировка кнопки во время отправки
const blockSubmitButton = () => {
  const uploadFormButton = document.querySelector('.img-upload__submit');
  uploadFormButton.disabled = true;
  uploadFormButton.textContent = 'Сохраняю...';
};

//Обработчик закрытия сообщения об успехе по Escape
function onSuccessMessageEscPress (evt) {
  isEscapeEvent(evt, closeSuccessMessage);
}

//Создание сообщения об ошибке при отправке формы
const createErrorMessage = () => {
  closeImageEditOverlay();
  createStatusMessage(errorTemplate);
};

//Закрытие сообщения об ошибке при отправке
const closeErrorMessage = () => {
  const errorOverlay = document.querySelector('.error');
  const errorMessageButton = errorOverlay.querySelector('.error__button');
  errorMessageButton.addEventListener('click', onErrorMessageCloseClick);
  document.removeEventListener('keydown', onErrorMessageEscPress);
  body.removeChild(errorOverlay);
};

//Обработчик закрытия сообщения об ошибке
function onErrorMessageCloseClick () {
  closeErrorMessage();
}

// Обработчик закрытия сообщения об ошибке по Escape
function onErrorMessageEscPress (evt) {
  isEscapeEvent(evt, closeErrorMessage);
}

//Обработчик закрытия сообщения об ошибке при отправке
const onErrorCloseForm = () => {
  createErrorMessage();
  const errorOverlay = document.querySelector('.error');
  const errorMessageButton = errorTemplate.querySelector('.error__button');
  document.addEventListener('keydown', onErrorMessageEscPress);
  errorMessageButton.addEventListener('click', onErrorMessageCloseClick);
  const errorField = document.querySelector('.error__inner');
  errorOverlay.addEventListener('click', (evt) => {
    if (evt.target !== errorField) {
      closeErrorMessage();
    }
  });
};

export { closeImageEditOverlay, blockSubmitButton, unblockSubmitButton, onSuccessCloseForm, onErrorCloseForm };
