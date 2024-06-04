import { fetchDiaries, fetchDiary, createDiary, login, register } from './api';
import {renderTemplate} from './utils';
// import {fetchDiaries, fetchDiary} from "../mockApi.ts";
import {generateGraph} from "./d3-girrafe";

const routes: { [key: string]: () => void } = {
  '/': () => renderTemplate('index.twig', {}, document.getElementById('app')!),
  '/login': () => renderTemplate('login.twig', {}, document.getElementById('app')!),
  '/register': () => renderTemplate('register.twig', {}, document.getElementById('app')!),
  '/diary-list': async () => {
    const diaries = await fetchDiaries();
    renderTemplate('diary-list.twig', {diaries}, document.getElementById('app')!);
  },
  '/diary-create': () => renderTemplate('diary-create.twig', {}, document.getElementById('app')!),
  '/my-page': async () => {
    await renderTemplate('my-page.twig', {}, document.getElementById('app')!)
    generateGraph('graph', [10, 20, 30, 40, 50]);
  },
  '/diary': async () => {
    const id = parseInt(window.location.hash.split('/')[2]);
    const diary = await fetchDiary(id);
    renderTemplate('diary-detail.twig', {diary}, document.getElementById('app')!);
  },
  '/depression-sos': () => renderTemplate('depression-sos.twig', {}, document.getElementById('app')!),
};

function router() {
  const path = window.location.hash.slice(1) || '/';
  const route = routes[path.split('/')[1] ? `/${path.split('/')[1]}` : path];
  if (route) {
    route();
  } else {
    renderTemplate('index.twig', {}, document.getElementById('app')!);
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);


document.getElementById('menu-button')?.addEventListener('click', () => {
  const navLinks = document.getElementById('nav-links');
  navLinks?.classList.toggle('hidden');
});


document.addEventListener('DOMContentLoaded', () => {
  // Initial route call
  router();


  // Add event listeners for forms and buttons
  document.addEventListener('submit', async (event) => {
    const target = event.target as HTMLFormElement;
    if (target.id === 'login-form') {
      event.preventDefault();
      const email = (document.getElementById('userId') as HTMLInputElement).value;
      const password = (document.getElementById('password') as HTMLInputElement).value;
      await login(email, password);
    } else if (target.id === 'register-form') {
      event.preventDefault();
      const email = (document.getElementById('email') as HTMLInputElement).value;
      const password = (document.getElementById('password') as HTMLInputElement).value;
      const passwordConfirm = (document.getElementById('password-confirm') as HTMLInputElement).value;

      if (password !== passwordConfirm) {
          alert('비밀번호가 일치하지 않습니다.');
          return;
      }

      // password rule check
      const passwordRule = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$/;
      if (!passwordRule.test(password)) {
          alert('비밀번호는 8자 이상 16자 이하이며, 영문과 숫자를 포함해야 합니다.');
          return;
      }

      await register(email, password);
    } else if (target.id === 'diary-create-form') {
      event.preventDefault();
      const title = (document.getElementById('title') as HTMLInputElement).value;
      const date = (document.getElementById('date') as HTMLInputElement).value;
      const content = (document.getElementById('content') as HTMLTextAreaElement).value;
      await createDiary({title, date, content});
    }
  });
});


/*
로그인 회원가입

이름
나이
주소
비번
성별
비번 확인 (규칙도)

일기 작성 버튼 로그인 비활성화

햄버거 메뉴
로그인 하면 일기목록, 내정보 보이게

로그임 되면 로그인 버튼이 로그아웃 버튼으로 바뀌게
안녕하세요, ㅇㅇ님!

메인화면에 그래프?

제목과 감정만 보여줄까?
요약한걸 보여주자!! 한줄 (일단 요약을 전제로 데이터 모킹)

마이페이지 안에서 버튼() 누르면 동글동글한 게 옮겨가면서 누르게 되면 오른쪽에 조그만 창 하나에 정보가 나오도록

일기 리스트에서 큰 흰색버튼 자체에도 클릭리스너 넣기 (일기 상세보기로 이동)

일기 목록 pc 길게 보이게 하자


데이터에 상담사가 있다고 가정하고
신상 보여주는 화면

그래프 띄우는거도 만들자
지라에 데이터 형식이 있으니 확인!



 */
