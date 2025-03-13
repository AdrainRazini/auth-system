const API_URL = 'https://auth-system-production-b84d.up.railway.app/';

async function register() {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    alert(data.message);
}

async function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    
    if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login bem-sucedido!");
    } else {
        alert(data.message);
    }
}

async function getProtected() {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/protected`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` },
    });

    const data = await response.json();
    document.getElementById("protected-content").innerText = data.message || data.error;
}
