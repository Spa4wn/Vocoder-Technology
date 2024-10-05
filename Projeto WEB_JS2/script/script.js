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

    // Verifica se os campos estão preenchidos e têm pelo menos 3 caracteres
    if (!newUsername || !newPassword || newUsername.length < 3 || newPassword.length < 3) {
        showMessage('Por favor, preencha todos os campos com pelo menos 3 caracteres.', 'registerMessage', 'red');
        return;
    }

    const userExists = usuarios.some(user => user.username === newUsername);
    if (userExists) {
        showMessage('Este nome de usuário já está em uso.', 'registerMessage', 'red');
        return;
    }

    usuarios.push({ username: newUsername, password: newPassword });
    salvarUsuarios();

    alert('Cadastro realizado com sucesso! Você pode fazer login agora.');
    window.location.href = 'index.html';
}

function showMessage(message, elementId, color) {
    const messageElement = document.getElementById(elementId);
    messageElement.textContent = message;
    messageElement.style.color = color;
    setTimeout(() => {
        messageElement.textContent = '';
    }, 3000); // Mensagem desaparece após 3 segundos
}

function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const usuario = usuarios.find(user => user.username === username && user.password === password);

    if (usuario) {
        localStorage.setItem('loggedIn', 'true');
        window.location.href = 'index2.html';
    } else {
        showMessage('Usuário ou senha inválidos.', 'loginMessage', 'red');
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

function addToCart(name, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} foi adicionado ao carrinho.`);
}

function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartElement = document.getElementById('cart');
    const cartTotalElement = document.getElementById('total');
    cartElement.innerHTML = "";

    if (cart.length === 0) {
        cartElement.innerHTML = "<p>O carrinho está vazio.</p>";
        cartTotalElement.innerHTML = "";
        return;
    }

    let total = 0;
    cart.forEach(item => {
        let itemTotalPrice = item.price * item.quantity;

        // Aplica desconto se a quantidade for 3 ou mais
        if (item.quantity >= 3) {
            itemTotalPrice *= 0.5; // Aplica 50% de desconto
        }

        const itemElement = document.createElement("div");
        itemElement.className = "cart-item";
        itemElement.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>R$ ${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart('${item.name}')">Remover</button>
        `;
        cartElement.appendChild(itemElement);
        total += itemTotalPrice;
    });

    cartTotalElement.innerHTML = `Total: R$ ${total.toFixed(2)}`;
}

function removeFromCart(name) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function finalizarCompra() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Seu carrinho está vazio.');
        return;
    }

    const paymentMethod = document.querySelector('input[name="payment"]:checked');
    if (!paymentMethod) {
        alert('Por favor, selecione um método de pagamento.');
        return;
    }

    alert(`Compra finalizada com sucesso! Método de pagamento: ${paymentMethod.value}`);

    localStorage.removeItem('cart');
    window.location.href = 'index2.html';
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

    if (window.location.pathname.includes('index3.html')) {
        verificarLogin();
        updateCart();

        const checkoutButton = document.createElement('button');
        checkoutButton.textContent = 'Finalizar Compra';
        checkoutButton.className = 'checkout-button';
        checkoutButton.onclick = finalizarCompra;
        document.getElementById('total').appendChild(checkoutButton);
    }

    if (window.location.pathname.includes('index2.html') || window.location.pathname.includes('index3.html') || window.location.pathname.includes('index4.html') || window.location.pathname.includes('index6.html')) {
        verificarLogin();
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.onclick = logout;
        }

        const addToCartButtons = document.querySelectorAll('.addToCartButton');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const produtoElement = button.parentElement;
                const nome = produtoElement.querySelector('h4').textContent;
                const precoText = produtoElement.querySelector('p').textContent;
                const preco = parseFloat(precoText.replace('Preço: R$', '').replace(',', '.'));
                addToCart(nome, preco);
            });
        });
    }

    carregarPerfilDoLocalStorage();

    const editProfileButton = document.getElementById('editProfileButton');
    const editProfileModal = document.getElementById('editProfileModal');
    const closeButton = editProfileModal.querySelector('.close-button');
    const editProfileForm = document.getElementById('editProfileForm');

    editProfileButton.addEventListener('click', () => {
        editProfileModal.style.display = 'block';
        preencherFormularioDeEdicao();
    });

    closeButton.addEventListener('click', () => {
        editProfileModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === editProfileModal) {
            editProfileModal.style.display = 'none';
        }
    });

    editProfileForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('editUsername').value;
        const email = document.getElementById('editEmail').value;
        const bio = document.getElementById('editBio').value;
        const profilePicture = document.getElementById('editProfilePicture').files[0];

        let profilePictureUrl = 'default-profile.png';

        if (profilePicture) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePictureUrl = e.target.result; 
                salvarPerfilNoLocalStorage(username, email, bio, profilePictureUrl);
                carregarPerfilDoLocalStorage();
                editProfileModal.style.display = 'none';
            };
            reader.readAsDataURL(profilePicture);
        } else {
            salvarPerfilNoLocalStorage(username, email, bio, profilePictureUrl);
            carregarPerfilDoLocalStorage();
            editProfileModal.style.display = 'none';
        }
    });
});

function carregarPerfilDoLocalStorage() {
    const perfil = JSON.parse(localStorage.getItem('perfil'));
    if (perfil) {
        document.getElementById('perfilUsername').textContent = perfil.username;
        document.getElementById('perfilEmail').textContent = perfil.email;
        document.getElementById('perfilBio').textContent = perfil.bio;
        const profileImage = document.getElementById('profileImage');
        profileImage.src = perfil.profilePicture || 'default-profile.png';
    }
}

function preencherFormularioDeEdicao() {
    const perfil = JSON.parse(localStorage.getItem('perfil'));
    if (perfil) {
        document.getElementById('editUsername').value = perfil.username;
        document.getElementById('editEmail').value = perfil.email;
        document.getElementById('editBio').value = perfil.bio;
    }
}

function salvarPerfilNoLocalStorage(username, email, bio, profilePicture) {
    const perfil = { username, email, bio, profilePicture };
    localStorage.setItem('perfil', JSON.stringify(perfil));
}
