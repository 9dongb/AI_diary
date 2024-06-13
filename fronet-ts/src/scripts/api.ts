const API_BASE_URL = 'http://localhost:5000';

const HEADERS = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
};

// export async function fetchPosts() {
//     const response = await fetch(`${API_BASE_URL}/posts`, {
//         method: 'GET',
//         headers: HEADERS,
//         credentials: 'include',
//     });
//     return response.json();
// }

export async function fetchDiaries() {
    const response = await fetch(`${API_BASE_URL}/diaries`,{
        method: 'GET',
        headers: HEADERS,
        credentials: 'include',

    });
    return response.json();
}

export async function fetchDiary(id: number) {
    const response = await fetch(`${API_BASE_URL}/diaries/${id}`, {
        method: 'GET',
        headers: HEADERS,
        credentials: 'include',

    });
    return response.json();
}

export async function createDiary(diary: { title: string, content: string }) {
    const response = await fetch(`${API_BASE_URL}/diaries`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(diary),
        credentials: 'include',
    });
    return response.json();
}

export async function login(userId: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ userId, password }),
        credentials: 'include',
    });
    return response.json();
}

export async function register(userId: string, password: string, name: string, age: number, gender: string, address: string) {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ userId, password, name, age, gender, address }),
    });
    return response.json();
}

export async function logout() {
    const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'GET',
        headers: HEADERS,
        credentials: 'include',
    });
    return response.json();
}

export async function userInfo() {
    const response = await fetch(`${API_BASE_URL}/user`, {
        method: 'GET',
        headers: HEADERS,
        credentials: 'include',
    });
    return response.json();
}

export async function checkLogin() {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'GET',
        headers: HEADERS,
        credentials: 'include',
    });
    return response.json();
}
