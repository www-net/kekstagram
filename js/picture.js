import { getObjectOutput } from './data.js'
import { ShowBigPhoto } from './big-picture.js';

// Находим фрагмент шаблона фотографии
const templateFragment = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// Создаем фрагмент
const fragment = document.createDocumentFragment();

const photosBlock = document.querySelector('.pictures');

const photosArray = getObjectOutput();

// Заполнение шаблона документа

const getPhotoItem = (photoObject) => {
    const photoElement = templateFragment.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photoObject.url;
    photoElement.querySelector('.picture__likes').textContent = photoObject.likes;
    photoElement.querySelector('.picture__comments').textContent = photoObject.comments.length;
    photoElement.addEventListener('click', () => {
      ShowBigPhoto(photoObject);
    });
    return photoElement;
  };


//Создание вставки шаблона в фрагмент документа
const createPhotosFragment = (photos) => {
  for (let i = 0; i < photos.length; i++) {
    const photoElement = getPhotoItem(photos[i]);
    fragment.appendChild(photoElement);
  }
  photosBlock.appendChild(fragment);
};

export { createPhotosFragment }
