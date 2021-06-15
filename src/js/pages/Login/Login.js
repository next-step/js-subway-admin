import loginCss from 'js/pages/Login/login.module.css';
import { Heading, LoginForm } from 'js/components';

const { wrapper } = loginCss;

const Login = () => {
  const $login = document.createElement('div');
  $login.className = `${wrapper} p-10 bg-white`;

  const $headingContainer = document.createElement('div');
  $headingContainer.appendChild(Heading({ level: 2, children: '👋🏼 로그인' }));

  $login.appendChild($headingContainer);
  $login.appendChild(LoginForm());

  return $login;
};

export default Login;
