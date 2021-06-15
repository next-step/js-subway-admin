import lineColorSelectorCss from 'js/components/LineColorSelector/lineColorSelector.module.css';
import { colorOptions } from 'js/utils/mock';

const { colorOption } = lineColorSelectorCss;

const subwayLineColorOptionTemplate = (color, index) => {
  const hasNewLine = (index + 1) % 7 === 0;
  return `<button type="button" class="${colorOption} bg-${color}"></button> ${hasNewLine ? '<br/>' : ''}`;
};

const LineColorSelector = () => {
  const $lineColorSelector = document.createElement('div');
  $lineColorSelector.className = 'subway-line-color-selector px-2';

  $lineColorSelector.innerHTML = colorOptions.map(subwayLineColorOptionTemplate).join('');

  return $lineColorSelector;
};

export default LineColorSelector;
