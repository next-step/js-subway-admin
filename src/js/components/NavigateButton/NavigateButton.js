import { Link } from 'js/components';

const NavigateButton = ({ href, children }) => {
  const $navigateButton = document.createElement('button');
  $navigateButton.type = 'button';
  $navigateButton.className = 'btn bg-white shadow mx-1';
  $navigateButton.innerHTML = children;

  return Link({ href, children: $navigateButton, className: 'my-1' });
};

export default NavigateButton;
