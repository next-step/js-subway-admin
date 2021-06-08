import $ from '../../utils/dom';
import { setData, getData } from '../../utils/storage';
import { render } from '../../utils/render';
import { createStationListsTemplates } from '../../templates/createTemplate';

const onAddStation = (e: Event): void => {
  e.preventDefault();

  const { value } = $('.stations-wrapper input') as HTMLInputElement;

  setData('stations', [...getData('stations'), value]);
  render(
    createStationListsTemplates(getData('stations')),
    $('.stations-wrapper ul')
  );
};

export default onAddStation;
