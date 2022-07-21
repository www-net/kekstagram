import { isEscapeEvent, isEnterEvent } from "./util.js";

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadFileInput = document.querySelector('#upload-file');
const editImageOverlay = uploadForm.querySelector('.img-upload__overlay');
const editImageCloseButton = editImageOverlay.querySelector("#upload-cancel");
const inputHashtags = editImageOverlay.querySelector('.text__hashtags');
const commentTextarea = editImageOverlay.querySelector('.text__description');

// Функция открытия окна редактирования
const openImageEditOverlay = () => {
  body.classList.add('modal-open');
  editImageOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onImageOverlayEscPress);
  editImageCloseButton.addEventListener('keydown', onImageOverlayEnterPress);
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
  document.removeEventListener('keydown', onImageOverlayEscPress);
  editImageCloseButton.removeEventListener('keydown', onImageOverlayEnterPress);
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
const onImageOverlayEnterPress = (evt) => {
  isEnterEvent(evt, closeImageEditOverlay);
}

