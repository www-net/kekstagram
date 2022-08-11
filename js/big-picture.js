import { isEscapeEvent, isEnterEvent } from "./util.js";

//Описание переменных
const MAX_COMMENT = 5;
const BLOCK_COMMENTS_STEP = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img');
const commentsList = document.querySelector('.social__comments');
const commentElement = commentsList.querySelector('.social__comment');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
let commentsArrayData = [];
let commentsArrayDataRemain = [];

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

const ShowBigPhoto = (bigPhoto) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsList.innerHTML = '';
  bigPictureImg.querySelector('img').src = bigPhoto.url;
  bigPicture.querySelector('.likes-count').textContent = bigPhoto.likes;
  bigPicture.querySelector('.comments-count').textContent = bigPhoto.comments.length;
  bigPicture.querySelector('.social__caption').textContent = bigPhoto.description;
  commentsArrayData = bigPhoto.comments.slice();
  console.log(commentsArrayData);
  commentsArrayDataRemain = commentsArrayData.slice(0, MAX_COMMENT);
  if (bigPhoto.comments.length <= MAX_COMMENT) {
    createCommentsFragment(commentsArrayData);
    socialCommentCount.firstChild.textContent = `${commentsArrayData.length} из `;
    commentsLoader.classList.add('hidden');
  }
  if (bigPhoto.comments.length > MAX_COMMENT) {
    createCommentsFragment(commentsArrayDataRemain);
    socialCommentCount.firstChild.textContent = `${commentsList.children.length} из `;
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', onCommentsLoaderClick);
  }
  document.addEventListener('keydown', onBigPictureEscPress);
  bigPictureClose.addEventListener('keydown', onBigPictureEnterPress);
  bigPictureClose.addEventListener('click', onBigPictureCloseClick);
};

//Проверка текущего числа комментариев
const getCurentCommentCount = (comments) => comments ? comments.children.length : 0;

//Обработчик загрузки комментариев
function onCommentsLoaderClick() {
  const firstIndex = commentsList.children.length;
  const lastIndex = commentsList.children.length + BLOCK_COMMENTS_STEP;
  let nextVisibleBlock = commentsArrayData.slice(firstIndex, lastIndex);
  createCommentsFragment(nextVisibleBlock);
  socialCommentCount.firstChild.textContent = `${getCurentCommentCount(commentsList)} из `;
  if (commentsList.children.length == commentsArrayData.length) {
    commentsLoader.classList.add('hidden')
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  }
}

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
  isEscapeEvent(evt, closeBigPicture);
}

//Обработчик закрытия окна нажатием Enter по иконке закрытия
function onBigPictureEnterPress(evt) {
  isEnterEvent(evt, closeBigPicture);
}

//Обработчик закрытия окна кликом по иконке закрытия
function onBigPictureCloseClick() {
  closeBigPicture();
}

export { ShowBigPhoto };

