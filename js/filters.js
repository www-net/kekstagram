import { createPhotosFragment } from './picture.js';
import { getData } from './api.js';
import { mixPhotosArray, debounce } from './util.js';

//Описание переменных
const filterBlock = document.querySelector('.img-filters');
const filterBlockForm = filterBlock.querySelector('.img-filters__form');
const discussedFilter = filterBlock.querySelector('#filter-discussed');
const randomFilter = filterBlock.querySelector('#filter-random');
const defaultFilter = filterBlock.querySelector('#filter-default');
const RANDOM_PHOTOS = 10;
const TIMEOUT_DELAY = 500;
let photosArray;

// Убираем скрывающий класс у блока после загрузки фото с сервера
const showFilterContainer = () => {
  filterBlock.classList.remove('img-filters--inactive');
};

//Переключение класса активной кнопки
const setActiveClass = (element) => {
  const activeButton = filterBlock.querySelector('.img-filters__button--active');
  if (activeButton) {
    activeButton.classList.remove('img-filters__button--active');
  }
  element.classList.add('img-filters__button--active');
};

//Удаление фотографий
const removePhotos = () => {
  const photosArr = document.querySelectorAll('.pictures .picture');
  photosArr.forEach((photo) => {
    photo.remove();
  });
};

// Отображение дефолтных фотографий
const getDefaultPhotos = () => {
  const photosCopyArray = Array.from(photosArray);
  const defaultPhotos = photosCopyArray;
  createPhotosFragment(defaultPhotos);
};

// Создание сортировки массива по количеству комментариев
const sortPhotosByComments = (photoArray) => {
  photoArray.sort((first, second) =>
    second.comments.length - first.comments.length);
  return photoArray;
};

// Создание массива обсуждаемых фотографий
const getPhotosDiscussed = () => {
  const photosCopyArray = Array.from(photosArray);
  const discussedPhotos = sortPhotosByComments(photosCopyArray);
  createPhotosFragment(discussedPhotos);
};

// Создание массива 10 случайных фотографий
const getRandomPhotos = () => {
  const photosCopyArray = Array.from(photosArray);
  const randomPhotos = mixPhotosArray(photosCopyArray).slice(0, RANDOM_PHOTOS);
  createPhotosFragment(randomPhotos);
};

// Обработчик изменения фильтров
const onFilterClick = debounce((evt) => {
  const target = evt.target;
  removePhotos();
  setActiveClass(target);
  switch (target) {
    case defaultFilter:
      getDefaultPhotos();
      break;
    case randomFilter:
      getRandomPhotos();
      break;
    case discussedFilter:
      getPhotosDiscussed();
      break;
    default:
      getDefaultPhotos();
  }
}, TIMEOUT_DELAY);

filterBlockForm.addEventListener('click', onFilterClick);

const receiveData = (photos) => {
  photosArray = photos;
  createPhotosFragment(photos);
  showFilterContainer();
};

//Отправляем запрос на сервер
getData(receiveData);
