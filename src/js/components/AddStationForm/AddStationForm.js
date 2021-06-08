import addStationFormCss from 'js/components/AddStationForm/addStationForm.module.css';
import ajax from 'js/api/index';

const { duplicated } = addStationFormCss;

const AddStationForm = (() => {
  let stationNameValue = '';
  const setStationNameValue = value => {
    stationNameValue = value;
  };

  const onChangeStationNameValueHandler = ({ target: { value } }) => {
    setStationNameValue(value.trim());
  };

  return ({ stations, setStations }) => {
    const $addStationForm = document.createElement('form');
    const $addStationFormInnerContainer = document.createElement('div');
    const $stationNameLabel = document.createElement('label');
    const $stationNameInput = document.createElement('input');
    const $confirmButton = document.createElement('button');

    // 컴포넌트가 리렌더링 될때마다 함수가 새로 생길것임, 어떻게 해결할것인가...
    const onAddStationHandler = event => {
      event.preventDefault();

      if (stationNameValue.length > 20 || stationNameValue.length < 2) return;

      const isDuplicated = stations.find(({ stationName }) => stationNameValue === stationName);
      if (isDuplicated) {
        $stationNameInput.classList.add(duplicated);
        return;
      }

      const id = stations.length ? Math.max(...stations.map(({ id }) => +id)) + 1 : 1;

      const station = { id, stationName: stationNameValue };

      setStations([...stations, station]);
      ajax.addStation(station);
      $stationNameInput.classList.remove(duplicated);

      setStationNameValue('');
    };

    $addStationForm.addEventListener('submit', onAddStationHandler);

    $addStationFormInnerContainer.className = 'd-flex w-100';

    $stationNameLabel.htmlFor = 'station-name';
    $stationNameLabel.className = 'input-label';
    $stationNameLabel.hidden = true;

    $stationNameInput.type = 'text';
    $stationNameInput.id = 'station-name';
    $stationNameInput.name = 'stationName';
    $stationNameInput.className = 'input-field';
    $stationNameInput.placeholder = '역 이름 (역 이름은 2글자 이상 20글자 이하로 작성해주세요.)';
    $stationNameInput.required = true;
    $stationNameInput.value = stationNameValue;
    // react에서 계속 change 이벤트만 사용했는데 input이벤트를 사용해야 같은 결과를 얻을 수 있었다.
    $stationNameInput.addEventListener('input', onChangeStationNameValueHandler);

    $confirmButton.name = 'submit';
    $confirmButton.className = 'input-submit bg-cyan-300 ml-2';
    $confirmButton.textContent = '확인';

    $addStationFormInnerContainer.appendChild($stationNameLabel);
    $addStationFormInnerContainer.appendChild($stationNameInput);
    $addStationFormInnerContainer.appendChild($confirmButton);

    $addStationForm.appendChild($addStationFormInnerContainer);

    return $addStationForm;
  };
})();

export default AddStationForm;
