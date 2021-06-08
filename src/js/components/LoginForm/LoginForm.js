import loginFormCss from 'js/components/LoginForm/loginform.module.css';
import { InputControl, Link } from 'js/components';
import routes from 'js/utils/routes';

const { inputSubmit } = loginFormCss;

const LoginForm = () => {
  const $loginForm = document.createElement('form');
  $loginForm.classList = 'form';
  $loginForm.name = 'login';

  const $confirmButtonContainer = document.createElement('div');
  $confirmButtonContainer.className = 'input-control w-100';

  const $confirmButton = document.createElement('button');
  $confirmButton.type = 'button';
  $confirmButton.name = 'submit';
  $confirmButton.className = `input-submit w-100 bg-cyan-300 ${inputSubmit}`;
  $confirmButton.textContent = '확인';

  $confirmButtonContainer.appendChild($confirmButton);

  const $signUpLink = document.createElement('p');
  $signUpLink.className = 'text-gray-700 pl-2';
  $signUpLink.textContent = '아직 회원이 아니신가요? ';
  $signUpLink.appendChild(Link({ href: routes.SIGN_UP, children: '회원가입' }));

  $loginForm.appendChild(
    InputControl({ type: 'email', id: 'email', name: 'email', required: true, children: '이메일' })
  );

  $loginForm.appendChild(
    InputControl({
      type: 'password',
      id: 'password',
      name: 'password',
      required: false,
      children: '비밀번호',
    })
  );

  $loginForm.appendChild($confirmButtonContainer);

  $loginForm.appendChild($signUpLink);

  return $loginForm;
};

export default LoginForm;
