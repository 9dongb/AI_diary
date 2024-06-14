import {createDiary, login, register, checkLogin, logout, userInfo, fetchDiaries, fetchDiary} from './api';
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

const emotionToEmoji = {
  '기쁨': '😀',
  '분노': '😠',
  '상처': '😞',
  '당황': '😮',
  '불안': '😨',
  '슬픔': '😢',
  // add more emotions and their corresponding emojis as needed
};

// Generate 30 data points
const data = generateDummyData(30);

// routers
const routes: { [key: string]: () => void } = {
  '/': () => renderTemplate('index.twig', {}, document.getElementById('app')!),
  '/login': () => renderTemplate('login.twig', {}, document.getElementById('app')!),
  '/logout': async () => {
    const response = await logout();
    if (response.success) {
      alert('로그아웃 성공');
      window.location.hash = '/';
      handleLoginCheck();
    } else {
      alert('로그아웃 실패');
    }
  },
  '/register': () => renderTemplate('register.twig', {}, document.getElementById('app')!),
  '/diary-list': async () => {
    const diaries = await fetchDiaries();
    console.log(diaries)
    renderTemplate('diary-list.twig', {diaries, emoji: emotionToEmoji}, document.getElementById('app')!);
  },
  '/diary-create': () => renderTemplate('diary-create.twig', {}, document.getElementById('app')!),
  '/my-page': async () => {
    await renderTemplate('my-page.twig', {}, document.getElementById('app')!);
    attachSidebarEventListeners();
  },
  '/diary': async () => {
    const id = parseInt(window.location.hash.split('/')[2]);
    const diary = await fetchDiary(id);
    renderTemplate('diary-detail.twig', {diary, emoji: emotionToEmoji}, document.getElementById('app')!);
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

// function updateFloatingActionButtonVisibility() {
//   if (fab) {
//     if (window.location.hash === '#/diary-list') {
//       fab.style.display = 'block';
//     } else {
//       fab.style.display = 'none';
//     }
//   }
// }

function attachSidebarEventListeners() {
  const items = document.querySelectorAll('.sidebar-item');
  items.forEach(item => {
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

      const usr = await userInfo();
      const summary = '이번 주에는 기분이 좋았어요.';

      if (contentDiv) {
        switch (target.id) {
          case 'profile-info':
            await renderTemplate('profile-info.twig', {usr}, contentDiv);
            break;
          case 'weekly-summary':
            await renderTemplate('weekly-summary.twig', {
                summary
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
  if (items.length > 0) {
    (items[0] as HTMLElement).click();
  }
}

function handleLoginCheck() {
  checkLogin().then(response => {
    const user = document.getElementById('user-name') as HTMLElement;
    const loginButton = document.getElementById('login-button') as HTMLElement;
    const logoutButton = document.getElementById('logout-button') as HTMLElement;
    const registerButton = document.getElementById('register-button') as HTMLElement;

    const myPageButton = document.getElementById('my-page-button') as HTMLElement;
    const diaryListButton = document.getElementById('diary-list-button') as HTMLElement;

    const fab = document.querySelector('.fixed.bottom-5.right-5') as HTMLElement;

    if (response.success) {
      if (user) {
        user.innerText = response.userName;
      }
      loginButton?.classList.add('hidden');
      logoutButton?.classList.remove('hidden');
      registerButton?.classList.add('hidden');
      myPageButton?.classList.remove('hidden');
      diaryListButton?.classList.remove('hidden');
      fab.style.display = 'block';
    } else {
      loginButton?.classList.remove('hidden');
      logoutButton?.classList.add('hidden');
      registerButton?.classList.remove('hidden');
      myPageButton?.classList.add('hidden');
      diaryListButton?.classList.add('hidden');
      fab.style.display = 'none';
    }
  }).catch(error => {
    console.error('Error checking login:', error);
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

  // check login status
  handleLoginCheck();

  // Update floating action button visibility based on the current route
  // updateFloatingActionButtonVisibility();

  // Add event listeners for forms and buttons
  document.addEventListener('submit', async (event) => {
    const target = event.target as HTMLFormElement;
    if (target.id === 'login-form') {
      event.preventDefault();
      const userId = (document.getElementById('userId') as HTMLInputElement).value;
      const password = (document.getElementById('password') as HTMLInputElement).value;
      const response = await login(userId, password);
      if (response.success === 1) {
          alert('로그인 성공');
          window.location.hash = '/diary-list';
          handleLoginCheck();
      } else {
          alert('로그인 실패, 다시 시도해주세요.');
      }
    } else if (target.id === 'register-form') {
      event.preventDefault();
      const userId = (document.getElementById('userId') as HTMLInputElement).value;
      const password = (document.getElementById('password') as HTMLInputElement).value;
      const passwordConfirm = (document.getElementById('password-confirm') as HTMLInputElement).value;
      const name = (document.getElementById('name') as HTMLInputElement).value;
      const age = +(document.getElementById('age') as HTMLInputElement).value;
      const address = (document.getElementById('address') as HTMLInputElement).value;
      const selectedGender = (document.querySelector('input[name="gender"]:checked') as HTMLInputElement).value
      console.log(selectedGender);
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

      const response = await register(userId, password, name, age, selectedGender, address);
      if (response.success) {
          alert('회원가입 성공');
          window.location.hash = '/login';
      } else {
          alert('회원가입 실패');
      }

    } else if (target.id === 'diary-create-form') {
      event.preventDefault();
      const title = (document.getElementById('title') as HTMLInputElement).value;
      // const date = (document.getElementById('date') as HTMLInputElement).value; // disabled for now
      const content = (document.getElementById('content') as HTMLTextAreaElement).value;
      const response = await createDiary({title, content});
        if (response.success) {
            alert('일기 작성 성공');
            window.location.hash = '/diary-list';
        } else {
            alert('일기 작성 실패');
        }
    }
  });
});


/*

제목과 감정만 보여줄까?
요약한걸 보여주자!! 한줄 (일단 요약을 전제로 데이터 모킹)

데이터에 상담사가 있다고 가정하고
신상 보여주는 화면
 */
