import { getRandomPositiveInteger } from './util.js';

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Марьяна',
  'Олег',
  'Никита',
  'Елена',
  'Борис',
  'Ядвига',
  'Кристина',
  'Лия',
  'Роман',
  'Григорий',
  'Марк',
  'Таисия',
  'Леван',
  'Роза',
  'Анеля'
];

const DESCRIPTIONS = [
  'Удачный кадр',
  'Одно из лучших фото',
  'Фотографи в высоком качестве'
];

//Основные параметры расчетных значений
const OBJECT_COUNT = 26;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR = 1;
const MAX_AVATAR = 6;
const MIN_COMMENTS = 1;
const MAX_COMMENTS = 20;


//Функции по созданию случайных чисел по заданным параметрам
const getLikesNumber = () => getRandomPositiveInteger(MIN_LIKES, MAX_LIKES);
const getCommentsNumber = () => getRandomPositiveInteger(0, COMMENTS.length - 1);
const getNamesNumber = () => getRandomPositiveInteger(0, NAMES.length - 1);
const getAvatarNumber = () => getRandomPositiveInteger(MIN_AVATAR, MAX_AVATAR);
const getObjectsNumber = () => getRandomPositiveInteger(MIN_COMMENTS, MAX_COMMENTS);
const getDescriptionsNumber = () => getRandomPositiveInteger(0, DESCRIPTIONS.length - 1);

//Функция создания массива объектов коментариев
const getObjectsArray = () => {
  const objectsArray = [];
  for (let i = 1; i <= getObjectsNumber(); i++) {
    const commentsObject = {
      id: i,
      avatar: `img/avatar-${getAvatarNumber()}.svg`,
      message: COMMENTS[getCommentsNumber()],
      name: NAMES[getNamesNumber()],
    };
    objectsArray.push(commentsObject);
  }
  return objectsArray;
};

//Функция формирования объекта описания фото и комментария из массива
const createRandomDescription = (_elem, id) => ({
  id: (++id),
  url: `photos/${String(id)}.jpg`,
  description: DESCRIPTIONS[getDescriptionsNumber()],
  likes: getLikesNumber(),
  comments: getObjectsArray(),
});

//Функция cоздания и вывода массива
const getObjectOutput = () =>
  Array.from({ length: OBJECT_COUNT }, createRandomDescription);

export { getObjectOutput };

