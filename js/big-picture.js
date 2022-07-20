import {getEscapeEvent, getEnterEvent } from "./util.js";

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img');
const commentsList = document.querySelector('.social__comments');
const commentElement = commentsList.querySelector('.social__comment');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

// Отрисовка одного комментария

const getBigPictureComment = (comment) => {
  const commentItem = commentElement.cloneNode(true);
  commentItem.querySelector('.social__picture').src = comment.avatar;
  commentItem.querySelector('.social__picture').alt = comment.name;
  commentItem.querySelector('.social__text').textContent = comment.message;

  return commentItem;
}

//Создание фрагмента комментария

const createCommentsFragment = (commentsArray) => {
  const fragment = document.createDocumentFragment();
  commentsArray.forEach((comment) => {
    const newComment = getBigPictureComment(comment);
    fragment.appendChild(newComment);
  });
  commentsList.appendChild(fragment);
};

//Создание полноразмерного изображения

const showBigPhoto = (bigPhoto) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsList.innerHTML = '';
  bigPictureImg.querySelector('img').src = bigPhoto.url;
  bigPicture.querySelector('.likes-count').textContent = bigPhoto.likes;
  bigPicture.querySelector('.comments-count').textContent = bigPhoto.comments.length;
  bigPicture.querySelector('.social__caption').textContent = bigPhoto.description;
  createCommentsFragment(bigPhoto.comments) //Список комментариев под фотографией:
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.addEventListener('keydown', onBigPictureEscPress);
  bigPictureClose.addEventListener('keydown', onBigPictureEnterPress);
  bigPictureClose.addEventListener('click', onBigPictureCloseClick);
};

//Вывод полноразмерного изображения
const showBigPictureObject = (pictureObject) => {
  showBigPhoto(pictureObject);
};

// Закрытие окна полноразмерного изображения
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscPress);
  document.removeEventListener('keydown', onBigPictureEnterPress);
  bigPictureClose.removeEventListener('click', onBigPictureCloseClick);
};

// Функция закрытия окна полноразмерного изображения по Escape
function onBigPictureEscPress(evt) {
  getEscapeEvent(evt, closeBigPicture);
}

//Обработчик закрытия окна нажатием Enter по иконке закрытия
function onBigPictureEnterPress(evt) {
  getEnterEvent(evt, closeBigPicture);
}

//Обработчик закрытия окна кликом по иконке закрытия
function onBigPictureCloseClick() {
  closeBigPicture();
}

export { showBigPictureObject };
