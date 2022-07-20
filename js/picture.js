import { getObjectOutput } from './data.js'
import { showBigPictureObject } from './big-picture.js';

// Находим фрагмент шаблона фотографии
const templateFragment = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// Создаем фрагмент
const fragment = document.createDocumentFragment();

const photosBlock = document.querySelector('.pictures');

const photosArray = getObjectOutput();

// Заполнение шаблона документа

  photosArray.forEach((photoObject) => {
    const photoElement = templateFragment.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photoObject.url;
    photoElement.querySelector('.picture__likes').textContent = photoObject.likes;
    photoElement.querySelector('.picture__comments').textContent = photoObject.comments.length;
    fragment.appendChild(photoElement);
    photoElement.addEventListener('click', () => {
      showBigPictureObject(photoObject);
    });

  });

photosBlock.appendChild(fragment);
