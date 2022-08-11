import{ getObjectOutput } from './data.js';
import { createPhotosFragment } from './picture.js';
import './form.js';
import './validation.js';
import './slider.js';

const photosData = getObjectOutput();
createPhotosFragment(photosData);
