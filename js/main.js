import { createPhotosFragment } from './picture.js';
import { getData } from './api.js';
import { closeImageEditOverlay } from './form.js';
import { setUserFormSubmit } from './validation.js';
import './form.js';
import './slider.js';


//Отправляем запрос на сервер
getData((photos) => {
  createPhotosFragment(photos);
});

setUserFormSubmit(closeImageEditOverlay)
