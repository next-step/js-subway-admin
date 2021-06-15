import modifyStationModalCss from 'js/components/ModifyStationModal/modifyStationModal.module.css';
import { Heading } from 'js/components';
import ajax from 'js/api';

const { modelInner, modal } = modifyStationModalCss;

const ModifyStationModal = (() => {
  let modifyInputValue = '';
  const setModifyInputValue = ({ target: { value } }) => {
    modifyInputValue = value;
  };
  return ({ modalState, setModalState, stations, setStations }) => {
    modifyInputValue = modalState.prevStationName;
    const onHideModalHandler = () => setModalState({ ...modalState, isModalOpen: false });

    const onModifyStationNameHandler = e => {
      e.preventDefault();
      setStations(
        stations.map(station =>
          station.id === modalState.id ? { id: modalState.id, stationName: modifyInputValue } : station
        )
      );
      ajax.modifyStation(modalState.id, { id: modalState.id, stationName: modifyInputValue });
      onHideModalHandler();
    };

    const $modal = document.createElement('div');
    $modal.className = modal;

    const $modalInner = document.createElement('div');
    $modalInner.className = `modal-inner p-8 ${modelInner}`;

    const $closeButton = document.createElement('button');
    $closeButton.type = 'button';
    $closeButton.className = 'modal-close';
    $closeButton.addEventListener('click', onHideModalHandler);

    $closeButton.innerHTML = `
  <svg viewbox="0 0 40 40">
    <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
  </svg>`;

    const $header = document.createElement('header');

    $header.appendChild(Heading({ level: 2, className: 'text-center', children: '🚉 역 이름 수정' }));

    const $modifyStationForm = document.createElement('form');

    const $inputControl = document.createElement('div');
    $inputControl.className = 'input-control';

    const $modifyStationLabel = document.createElement('label');
    $modifyStationLabel.className = 'input-label';
    $modifyStationLabel.htmlFor = 'modify-station-name';
    $modifyStationLabel.hidden = true;
    $modifyStationLabel.textContent = '수정 할 역 이름';

    const $modifyStationInput = document.createElement('input');
    $modifyStationInput.type = 'text';
    $modifyStationInput.id = 'modify-station-name';
    $modifyStationInput.name = 'modify-station-name';
    $modifyStationInput.className = 'input-field';
    $modifyStationInput.value = modifyInputValue;
    $modifyStationInput.placeholder = '수정 할 역 이름';
    $modifyStationInput.required = true;
    $modifyStationInput.addEventListener('input', setModifyInputValue);

    $inputControl.append($modifyStationLabel, $modifyStationInput);

    const $submitButtonContainer = document.createElement('div');
    $submitButtonContainer.className = 'd-flex justify-end mt-3';

    const $submitButton = document.createElement('button');
    $submitButton.name = 'submit';
    $submitButton.className = 'input-submit bg-cyan-300';
    $submitButton.textContent = '수정';

    $submitButtonContainer.appendChild($submitButton);

    $modifyStationForm.append($inputControl, $submitButtonContainer);
    $modifyStationForm.addEventListener('submit', onModifyStationNameHandler);

    const $modifyStationFragment = document.createDocumentFragment();

    $modifyStationFragment.appendChild($header);
    $modifyStationFragment.appendChild($modifyStationForm);

    $modalInner.appendChild($closeButton);
    $modalInner.appendChild($modifyStationFragment);
    $modal.appendChild($modalInner);

    return $modal;
  };
})();

export default ModifyStationModal;
