const API_BASE_URL = 'http://localhost:5000';

export async function fetchDiaries() {
    const response = await fetch(`${API_BASE_URL}/diaries`);
    return response.json();
}

export async function fetchDiary(id: number) {
    const response = await fetch(`${API_BASE_URL}/diaries/${id}`);
    return response.json();
}

export async function createDiary(diary: { title: string, date: string, content: string }) {
    const response = await fetch(`${API_BASE_URL}/diaries`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(diary),
    });
    return response.json();
}

export async function login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    return response.json();
}

export async function register(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    return response.json();
}

export function logout() {
    localStorage.removeItem('session'); // cookie에 저장된 토큰을 지움
}

export function isLoggedIn(){
    return !!localStorage.getItem('session');
}
