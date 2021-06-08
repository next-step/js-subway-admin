const AddStationForm = () => {
  const $addStationForm = document.createElement('form');

  const $addStationFormInnerContainer = document.createElement('div');
  $addStationFormInnerContainer.className = 'd-flex w-100';

  const $stationNameLabel = document.createElement('label');
  $stationNameLabel.htmlFor = 'station-name';
  $stationNameLabel.className = 'input-label';
  $stationNameLabel.hidden = true;

  const $stationNameInput = document.createElement('input');
  $stationNameInput.type = 'text';
  $stationNameInput.id = 'station-name';
  $stationNameInput.name = 'stationName';
  $stationNameInput.className = 'input-field';
  $stationNameInput.placeholder = '역 이름';
  $stationNameInput.required = true;

  const $confirmButton = document.createElement('button');
  $confirmButton.type = 'button';
  $confirmButton.name = 'submit';
  $confirmButton.className = 'input-submit bg-cyan-300 ml-2';
  $confirmButton.textContent = '확인';

  $addStationFormInnerContainer.appendChild($stationNameLabel);
  $addStationFormInnerContainer.appendChild($stationNameInput);
  $addStationFormInnerContainer.appendChild($confirmButton);

  $addStationForm.appendChild($addStationFormInnerContainer);

  return $addStationForm;
};

export default AddStationForm;
