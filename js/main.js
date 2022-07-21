import{ getObjectOutput } from './data.js';
import { createPhotosFragment } from './picture.js';
import './form.js';

const photosData = getObjectOutput();
createPhotosFragment(photosData);
