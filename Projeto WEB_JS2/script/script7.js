// script.js


function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const usuario = usuarios.find(user => user.username === username && user.password === password);

    if (usuario) {
        localStorage.setItem('loggedIn', 'true');
        window.location.href = 'index2.html';
    } else {
        const loginMessage = document.getElementById('loginMessage');
        loginMessage.textContent = 'Usuário ou senha inválidos.';
        loginMessage.style.color = 'red';
    }
}


function verificarLogin() {
    const loggedIn = localStorage.getItem('loggedIn');
    if (!loggedIn && !window.location.pathname.includes('index.html')) {
        window.location.href = 'index.html';
    }
}


function logout() {
    localStorage.removeItem('loggedIn');
    window.location.href = 'index.html';
}

function openEditProfileModal() {
    const modal = document.getElementById("editProfileModal");
    modal.style.display = "block";
}


function closeEditProfileModal() {
    const modal = document.getElementById("editProfileModal");
    modal.style.display = "none";
}


function updateProfile() {
    const username = document.getElementById("editUsername").value;
    const email = document.getElementById("editEmail").value;
    const bio = document.getElementById("editBio").value;

    document.getElementById("usernameDisplay").innerText = username;
    document.getElementById("emailDisplay").innerText = email;
    document.getElementById("bioDisplay").innerText = bio;

    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("bio", bio);

    closeEditProfileModal();
}


function loadProfile() {
    const username = localStorage.getItem("username") || "Usuário";
    const email = localStorage.getItem("email") || "usuario@exemplo.com";
    const bio = localStorage.getItem("bio") || "Esta é a sua biografia.";

    document.getElementById("usernameDisplay").innerText = username;
    document.getElementById("emailDisplay").innerText = email;
    document.getElementById("bioDisplay").innerText = bio;
}


function initialize() {
    
    if (window.location.pathname.includes('index2.html') || window.location.pathname.includes('index3.html') || window.location.pathname.includes('index4.html') || window.location.pathname.includes('index6.html')) {
        verificarLogin();

        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.onclick = logout;
        }

        
        loadProfile();
        
    
        document.getElementById("editProfileButton").addEventListener("click", openEditProfileModal);
        document.querySelector(".close-button").addEventListener("click", closeEditProfileModal);
        document.getElementById("editProfileForm").addEventListener("submit", function(event) {
            event.preventDefault();
            updateProfile();
        });
    }
}


document.addEventListener("DOMContentLoaded", initialize);
