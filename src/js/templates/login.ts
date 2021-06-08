import { createInputTemplate } from './createTemplate';

const loginTemplate = (): string => `
<div class="wrapper p-10 bg-white login-wrapper">
  <div class="heading">
    <h2>👋🏼 로그인</h2>
  </div>
  <form name="login" class="form">
    <div class="input-control">
      ${createInputTemplate('email', 'email', '이메일', 'required')}
    </div>
    <div class="input-control">
    ${createInputTemplate('password', 'password', '비밀번호')}
    </div>
    <div class="input-control w-100">
      <button
        type="button"
        name="submit"
        class="input-submit w-100 bg-cyan-300"
      >
        확인
      </button>
    </div>
    <p class="text-gray-700 pl-2">
      아직 회원이 아니신가요?
      <a href="/pages/signup.html">회원가입</a>
    </p>
  </form>
</div>
`;

export default loginTemplate;
