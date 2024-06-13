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

export async function login(userId: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:5000',
        },
        body: JSON.stringify({ userId, password }),
        credentials: 'include',
    });
    return response.json();
}

export async function register(userId: string, password: string, name: string, age: number, gender: string, address: string) {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:5000',
        },
        body: JSON.stringify({ userId, password, name, age, gender, address }),
    });
    return response.json();
}

export async function logout() {
    const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:5000',
        },
        credentials: 'include',
    });
    return response.json();
}

export async function checkLogin() {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:5000',
        },
        credentials: 'include',
    });
    return response.json();
}
