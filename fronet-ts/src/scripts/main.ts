import { fetchDiaries, fetchDiary, createDiary, login, register } from './api';
import {renderTemplate} from './utils';
// import {fetchDiaries, fetchDiary} from "../mockApi.ts";

const routes: { [key: string]: () => void } = {
  '/': () => renderTemplate('index.twig', {}, document.getElementById('app')!),
  '/login': () => renderTemplate('login.twig', {}, document.getElementById('app')!),
  '/register': () => renderTemplate('register.twig', {}, document.getElementById('app')!),
  '/diary-list': async () => {
    const diaries = await fetchDiaries();
    renderTemplate('diary-list.twig', {diaries}, document.getElementById('app')!);
  },
  '/diary-create': () => renderTemplate('diary-create.twig', {}, document.getElementById('app')!),
  '/my-page': () => renderTemplate('my-page.twig', {}, document.getElementById('app')!),
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
  if (navLinks?.classList.contains('hidden')) {
    navLinks.classList.remove('hidden');
  } else {
    navLinks?.classList.add('hidden');
  }
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
