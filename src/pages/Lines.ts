import { colorOptions } from "~constants";
import {Component} from "~@core";

export class Lines extends Component {
  protected template(): string {
    return 'Lines';
  }
}


/*
const subwayLineColorOptionTemplate = (color: string, index: number) => {
  const hasNewLine = (index + 1) % 7 === 0;
  return `<button type="button" class="color-option bg-${color}"></button> ${
    hasNewLine ? "<br/>" : ""
  }`;
};

const $subwayLineColorSelector = document.querySelector(
  ".subway-line-color-selector"
);

$subwayLineColorSelector!.innerHTML = colorOptions
  .map(subwayLineColorOptionTemplate)
  .join("");
*/
