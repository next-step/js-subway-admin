import { colorOptions } from "@/utils/mock";

const subwayLineColorOptionTemplate = (color: string, index: number) => {
  const hasNewLine = (index + 1) % 7 === 0;
  return `<button type="button" class="color-option bg-${color}"></button> ${
    hasNewLine ? "<br/>" : ""
  }`;
};

const $subwayLineColorSelector = document.querySelector(
  ".subway-line-color-selector"
) as HTMLElement;

$subwayLineColorSelector.innerHTML = colorOptions
  .map(subwayLineColorOptionTemplate)
  .join("");
