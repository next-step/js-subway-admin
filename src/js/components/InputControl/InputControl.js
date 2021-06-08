const InputControl = ({ type, id, name, required, children }) => {
  const $inputControlContainer = document.createElement('div');
  $inputControlContainer.className = 'input-control';

  const $label = document.createElement('label');
  $label.htmlFor = id;
  $label.className = 'input-label';
  $label.hidden = true;
  $label.innerHTML = children;

  const $input = document.createElement('input');
  $input.type = type;
  $input.id = id;
  $input.name = name;
  $input.placeholder = children;
  $input.className = 'input-field';
  $input.required = required;

  $inputControlContainer.appendChild($label);
  $inputControlContainer.appendChild($input);

  return $inputControlContainer;
};

export default InputControl;
