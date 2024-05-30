import { diaries } from './mockData';

export function fetchDiaries() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(diaries);
    }, 1000); // Simulate network latency of 1 second
  });
}

export function fetchDiary(id: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
        resolve(diaries.find((diary) => diary.id === id));
        }, 1000); // Simulate network latency of 1 second
    });
}
