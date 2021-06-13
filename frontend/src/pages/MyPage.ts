import {Component} from "@/_core";
import {authService} from "@/services";
import {UpdateUserRequest, UserRequest} from "subway-domain";
import {parseFormData} from "@/utils";
import {router} from "@/router";
import {authStore, UPDATE_USER} from "@/store";

export class MyPage extends Component {
  protected template(): string {

    const { authentication } = authStore.$state;

    if (authentication === null) return ``;

    return `
      <div class="wrapper p-10 bg-white auth">
        <div class="heading">
          <h2 class="text">📝 마이페이지</h2>
        </div>
        <form name="login" class="form">
        
          <div class="input-control">
            <label for="email" class="input-label" hidden>이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              class="input-field"
              placeholder="이메일"
              value="${authentication.email}"
              required
            />
          </div>
          
          <div class="input-control">
            <label for="name" class="input-label" hidden>이름</label>
            <input
              type="text"
              id="name"
              name="name"
              class="input-field"
              placeholder="이름"
              value="${authentication.name}"
              required
            />
          </div>
          
          <div class="input-control">
            <button type="submit" name="submit" class="input-submit w-100 bg-cyan-300">
              확인
            </button>
          </div>
        </form>
      </div>
    `;
  }

  protected setEvent() {
    this.addEvent('submit', 'form', (event: Event) => {
      event.preventDefault();
      const frm = event.target as HTMLFormElement;
      const request = parseFormData<UpdateUserRequest>(frm);

      try {
        authStore.dispatch(UPDATE_USER, { ...request, idx: authStore.$state.authentication!.idx });
        alert('회원정보가 수정되었습니다.');
      } catch (e) {
        console.error(e);
        alert(e.message);
      }
    })
  }
}
