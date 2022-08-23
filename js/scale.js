const imageScaleValue = document.querySelector('.scale__control--value');
const editImageOverlay = document.querySelector('.img-upload__overlay');
const imagePreview = editImageOverlay.querySelector('.img-upload__preview');
const image = imagePreview.querySelector('img');
const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const DEFAULT_SCALE_VALUE = 100;

// Установка значения масштаба по умолчанию 100%
imageScaleValue.value = `${DEFAULT_SCALE_VALUE}%`

// Преобразование значения масштаба в целое число с указанной системой счисления
const getTransformValue = () => parseInt(imageScaleValue.value , 10);

// Преобразование масштаба в разметке
const getScaleImageTransform = () => {
  image.style.transform = `scale(${getTransformValue() / 100})`;
}

//Уменьшение масштаба изображения
const getLowerValueScale = () => {
  let resultValue = getTransformValue() - SCALE_STEP;
  if (resultValue < MIN_SCALE_VALUE) {
    resultValue = MIN_SCALE_VALUE;
  }
  imageScaleValue.value = `${resultValue}%`
}

//Увеличение масштаба изображения
const getHigherValueScale = () => {
  let resultValue = getTransformValue() + SCALE_STEP;
  if (resultValue > MAX_SCALE_VALUE) {
    resultValue = MAX_SCALE_VALUE;
  }
  imageScaleValue.value = `${resultValue}%`
}

// Обработчик нажатия на клавишу 'уменьшение масштаба'
const onMinButtonClick = () => {
  getLowerValueScale();
  getScaleImageTransform();
}

//Обработчик нажатия на клавишу 'увеличение масштаба'
const onMaxButtonClick = () => {
  getHigherValueScale();
  getScaleImageTransform();
}

export { onMinButtonClick, onMaxButtonClick, getScaleImageTransform }
