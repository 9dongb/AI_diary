import {fetchDiaries, fetchDiary, createDiary, login, register, isLoggedIn} from './api';
import {renderTemplate} from './utils';
// import {fetchDiaries, fetchDiary} from "../mockApi.ts";
import {generateGraph} from "./d3-girrafe";

// TODO: erase this function after implementing the actual data fetching
const generateDummyData = (numPoints: number) => {
  const data = [];
  const startDate = new Date(); // Start from today

  for (let i = 0; i < numPoints; i++) {
    // Subtract i days from the start date
    const date = new Date(startDate.getTime() - i * 24 * 60 * 60 * 1000);

    // Generate a random value between 1 and 10
    const value = Math.floor(Math.random() * 10) + 1;

    data.push({ date, value });
  }

  return data;
};
/*
[
  { date: new Date('2021-09-01'), value: [3,6,8,9] },
    { date: new Date('2021-09-02'), value: 5 },
    { date: new Date('2021-09-03'), value: 7 },
    { date: new Date('2021-09-04'), value: 2 },
    { date: new Date('2021-09-05'), value: 8 },
    { date: new Date('2021-09-06'), value: 4 },
    { date: new Date('2021-09-07'), value: 6 },
    { date: new Date('2021-09-08'), value: 9 },
    { date: new Date('2021-09-09'), value: 1 },
    { date: new Date('2021-09-10'), value: 10 },
]

pie chart 도 고려.
 */

// Generate 30 data points
const data = generateDummyData(30);

// routers
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
    attachSidebarEventListeners();
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

function updateFloatingActionButtonVisibility() {
  const fab = document.querySelector('.fixed.bottom-5.right-5') as HTMLElement;
  if (fab) {
    if (isLoggedIn()) {
      fab.style.display = 'block';
    } else {
      fab.style.display = 'none';
    }
  }
}

function attachSidebarEventListeners() {
  document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', async event => {
      const target = event.target as HTMLElement;
      const contentDiv = document.getElementById('content');

      // Remove classes from previously selected item
      const selectedItem = document.querySelector('.sidebar-item.bg-white.shadow-md.rounded-4xl');
      if (selectedItem) {
        selectedItem.classList.remove('bg-white', 'shadow-md', 'rounded-4xl');
      }

      // Add classes to newly selected item
      target.classList.add('bg-white', 'shadow-md', 'rounded-4xl');

      if (contentDiv) {
        switch (target.id) {
          case 'profile-info':
            await renderTemplate('profile-info.twig', {
                name: '홍길동',
                email: 'maweh@yeet.com'
            }, contentDiv);
            break;
          case 'weekly-summary':
            await renderTemplate('weekly-summary.twig', {
                summary: '이번 주에는 기분이 좋았어요.'
            }, contentDiv);
            break;
          case 'emotion-trends':
            await renderTemplate('emotion-trends.twig', {}, contentDiv);
            generateGraph('graph', data);
            break;
          case 'depression-sos':
            await renderTemplate('depression-sos.twig', {}, contentDiv);
            break;
        }
      }
    });
  });
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);


document.getElementById('menu-button')?.addEventListener('click', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
});

document.addEventListener('DOMContentLoaded', () => {
  // Initial route call
  router();

  // Update floating action button visibility
  updateFloatingActionButtonVisibility();

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

      const response = await register(email, password);
      if (response.success) {
          alert('회원가입이 완료되었습니다.');
          window.location.hash = '/#';
      }

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

일기 작성 버튼 로그인 비활성화

로그임 되면 로그인 버튼이 로그아웃 버튼으로 바뀌게
안녕하세요, ㅇㅇ님!

제목과 감정만 보여줄까?
요약한걸 보여주자!! 한줄 (일단 요약을 전제로 데이터 모킹)

마이페이지 안에서 버튼() 누르면 동글동글한 게 옮겨가면서 누르게 되면 오른쪽에 조그만 창 하나에 정보가 나오도록


일기 리스트에서 큰 흰색버튼 자체에도 클릭리스너 넣기 (일기 상세보기로 이동)


데이터에 상담사가 있다고 가정하고
신상 보여주는 화면
 */
