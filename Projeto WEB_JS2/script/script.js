let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [
    { username: 'usuario1', password: 'senha1' },
    { username: 'usuario2', password: 'senha2' }
];

function salvarUsuarios() {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function register(event) {
    event.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    if (!newUsername || !newPassword) {
        const registerMessage = document.getElementById('registerMessage');
        registerMessage.textContent = 'Por favor, preencha todos os campos.';
        registerMessage.style.color = 'red';
        return;
    }

    const userExists = usuarios.some(user => user.username === newUsername);
    if (userExists) {
        const registerMessage = document.getElementById('registerMessage');
        registerMessage.textContent = 'Este nome de usuário já está em uso.';
        registerMessage.style.color = 'red';
        return;
    }

    usuarios.push({ username: newUsername, password: newPassword });
    salvarUsuarios();

    alert('Cadastro realizado com sucesso! Você pode fazer login agora.');
    window.location.href = 'index.html';
}

function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const usuario = usuarios.find(user => user.username === username && user.password === password);

    if (usuario) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('currentUser', username);
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
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function carregarPerfilDoLocalStorage() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;

    const storedProfile = JSON.parse(localStorage.getItem(`profile_${currentUser}`)) || {};
    const { username, email, bio, profilePicture } = storedProfile;

    if (username) {
        document.getElementById('usernameDisplay').textContent = username;
    }
    if (email) {
        document.getElementById('emailDisplay').textContent = email;
    }
    if (bio) {
        document.getElementById('bioDisplay').textContent = bio;
    }
    if (profilePicture) {
        document.getElementById('profilePicture').src = profilePicture;
    }
}

function salvarPerfilNoLocalStorage(username, email, bio, profilePicture) {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;

    const profileData = { username, email, bio, profilePicture };
    localStorage.setItem(`profile_${currentUser}`, JSON.stringify(profileData));
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', login);
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', register);
    }

    if (['index2.html', 'index3.html', 'index4.html', 'index6.html'].some(page => window.location.pathname.includes(page))) {
        verificarLogin();
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.onclick = logout;
        }
    }

    carregarPerfilDoLocalStorage();
    const editProfileButton = document.getElementById('editProfileButton');
    const editProfileModal = document.getElementById('editProfileModal');
    const closeButton = document.querySelector('.close-button');
    const editProfileForm = document.getElementById('editProfileForm');
    const profilePicture = document.getElementById('profilePicture');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const emailDisplay = document.getElementById('emailDisplay');
    const bioDisplay = document.getElementById('bioDisplay');

    if (editProfileButton) {
        editProfileButton.addEventListener('click', () => {
            editProfileModal.style.display = 'block';
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            editProfileModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === editProfileModal) {
            editProfileModal.style.display = 'none';
        }
    });

    if (editProfileForm) {
        editProfileForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const newUsername = document.getElementById('editUsername').value;
            const newEmail = document.getElementById('editEmail').value;
            const newBio = document.getElementById('editBio').value;
            const newProfilePicture = document.getElementById('editProfilePicture').files[0];

            let newProfilePictureUrl = profilePicture.src;
            if (newProfilePicture) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    newProfilePictureUrl = e.target.result;
                    profilePicture.src = newProfilePictureUrl;
                    salvarPerfilNoLocalStorage(newUsername, newEmail, newBio, newProfilePictureUrl);
                };
                reader.readAsDataURL(newProfilePicture);
            } else {
                salvarPerfilNoLocalStorage(newUsername, newEmail, newBio, newProfilePictureUrl);
            }

            usernameDisplay.textContent = newUsername;
            emailDisplay.textContent = newEmail;
            bioDisplay.textContent = newBio;

            editProfileModal.style.display = 'none';
        });
    }
});
