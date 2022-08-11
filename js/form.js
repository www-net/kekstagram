import { isEscapeEvent, isEnterEvent } from "./util.js";
import { onMinButtonClick, onMaxButtonClick } from "./scale.js";

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadFileInput = document.querySelector('#upload-file');
const editImageOverlay = uploadForm.querySelector('.img-upload__overlay');
const editImageCloseButton = editImageOverlay.querySelector("#upload-cancel");
const inputHashtags = editImageOverlay.querySelector('.text__hashtags');
const commentTextarea = editImageOverlay.querySelector('.text__description');
const minScaleButton = editImageOverlay.querySelector('.scale__control--smaller');
const maxScaleButton = editImageOverlay.querySelector('.scale__control--bigger');

// Функция открытия окна редактирования
const openImageEditOverlay = () => {
  body.classList.add('modal-open');
  editImageOverlay.classList.remove('hidden');
  // Добавляем события на кнопки изменения масштаба
  minScaleButton.addEventListener('click', onMinButtonClick);
  maxScaleButton.addEventListener('click', onMaxButtonClick);
  minScaleButton.addEventListener('keydown', onLowerImageScaleEnterPress);
  maxScaleButton.addEventListener('keydown', onHigherImageScaleEnterPress);
  //Добавляем события на закрытие окна редактирования
  document.addEventListener('keydown', onImageOverlayEscPress);
  editImageCloseButton.addEventListener('keydown', onCloseImageOverlayEnterPress);
  editImageCloseButton.addEventListener('click', closeImageEditOverlay)
}

//Обработчик окна редакторования
function onUploadChange () {
  openImageEditOverlay();
}

uploadFileInput.addEventListener('change', onUploadChange);

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
  editImageCloseButton.removeEventListener('click', closeImageEditOverlay)
}

// Функция закрытия окна редактирования по нажатию клавиши Esc
const onImageOverlayEscPress = (evt) => {
  const active = document.activeElement;
  if (inputHashtags !== active && commentTextarea !== active ) {
    isEscapeEvent(evt, closeImageEditOverlay);
  }
};

// Функция закрытия окна редактирования по нажатию клавиши Enter
const onCloseImageOverlayEnterPress = (evt) => {
  isEnterEvent(evt, closeImageEditOverlay);
}

// Функция уменьшения масштаба изображения по нажатию клавиши Enter на кнопку 'уменьшения масштаба'
const onLowerImageScaleEnterPress = (evt) => {
  isEnterEvent(evt, onMinButtonClick)
}

// Функция увеличения масштаба изображения по нажатию клавиши Enter на кнопку 'увеличения масштаба'
const onHigherImageScaleEnterPress = (evt) => {
  isEnterEvent(evt, onMaxButtonClick)
}
