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
        localStorage.setItem('loggedInUser', username);
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
    localStorage.removeItem('loggedInUser');
    alert("Você saiu da sua conta.");
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
        let itemPrice = item.price;
        
        if (item.quantity >= 3) {
            itemPrice = item.price * 0.5;  
        }

        const itemElement = document.createElement("div");
        itemElement.className = "cart-item";
        itemElement.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>R$ ${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart('${item.name}')">Remover</button>
        `;
        cartElement.appendChild(itemElement);
        total += itemPrice * item.quantity;
    });

    cartTotalElement.innerHTML = `Total: R$ ${total.toFixed(2)}`;
}

function removeFromCart(name) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function calcularPromocao(preco, nomeProduto) {
    const precoPromocional = preco * 0.5; 
    const mensagem = `Leve 3 unidades de ${nomeProduto} por R$ ${precoPromocional.toFixed(2)} cada!`;

    const idProdutoFormatado = `promocao-${nomeProduto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-').replace(/--+/g, '-').replace(/[^\w-]/g, '')}`;
    
    console.log(`ID gerado: ${idProdutoFormatado}`);  

    const promoElement = document.getElementById(idProdutoFormatado);
    if (promoElement) {
        promoElement.textContent = mensagem;
    } else {
        console.error(`Elemento ${idProdutoFormatado} não encontrado.`);
    }
}

function finalizarCompra() {
    window.location.href = 'index8.html'; 
}

function saveUserProfile(username, profileData) {
    const userProfiles = JSON.parse(localStorage.getItem('userProfiles')) || {};
    userProfiles[username] = profileData;
    localStorage.setItem('userProfiles', JSON.stringify(userProfiles));
}

function loadUserProfile(username) {
    const userProfiles = JSON.parse(localStorage.getItem('userProfiles')) || {};
    return userProfiles[username] || {};
}

function applyUserProfile(username) {
    const profileData = loadUserProfile(username);
    if (profileData) {
        document.getElementById("usernameDisplay").textContent = profileData.username || username;
        document.getElementById("emailDisplay").textContent = profileData.email || 'usuario@exemplo.com';
        document.getElementById("bioDisplay").textContent = profileData.bio || 'Esta é a sua biografia.';
        if (profileData.profilePicture) {
            document.getElementById("profilePicture").src = profileData.profilePicture;
        }
    }
}

function saveProfileData(username, email, bio, profilePicture) {
    const profileData = { username, email, bio, profilePicture };
    saveUserProfile(username, profileData);
}

function updateOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartSummaryElement = document.getElementById('cart-summary');
    const totalSummaryElement = document.getElementById('total-summary');
    cartSummaryElement.innerHTML = "";

    if (cart.length === 0) {
        cartSummaryElement.innerHTML = "<p>O carrinho está vazio.</p>";
        totalSummaryElement.innerHTML = "";
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.className = "cart-item";
        itemElement.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>R$ ${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartSummaryElement.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    totalSummaryElement.innerHTML = `Total: R$ ${total.toFixed(2)}`;
}

function saveAddress(event) {
    event.preventDefault();
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;

    const shippingAddress = { address, city, state, zip };
    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));

    alert('Endereço salvo com sucesso!');
}

function loadPaymentMethod() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked');
    if (paymentMethod) {
        const selectedPaymentElement = document.getElementById('selected-payment-method');
        selectedPaymentElement.innerHTML = `Método de Pagamento Selecionado: ${paymentMethod.nextElementSibling.alt}`;
    }
}

function confirmPurchase() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Seu carrinho está vazio.');
        return;
    }

    const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));
    if (!shippingAddress) {
        alert('Por favor, forneça um endereço de entrega.');
        return;
    }

    const paymentMethod = document.querySelector('input[name="payment"]:checked');
    if (!paymentMethod) {
        alert('Por favor, selecione um método de pagamento.');
        return;
    }

    alert(`Compra finalizada com sucesso!\nEndereço: ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.zip}\nMétodo de pagamento: ${paymentMethod.value}`);
    
    localStorage.removeItem('cart');
    window.location.href = 'agradecimento.html'; 
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

    if (window.location.pathname.includes('index8.html')) {
        updateOrderSummary();
        loadPaymentMethod();

        const addressForm = document.getElementById('addressForm');
        if (addressForm) {
            addressForm.addEventListener('submit', saveAddress);
        }

        const confirmPurchaseButton = document.getElementById('confirmPurchaseButton');
        if (confirmPurchaseButton) {
            confirmPurchaseButton.addEventListener('click', confirmPurchase);
        }
    }

    if (window.location.pathname.includes('index2.html') || window.location.pathname.includes('index3.html') || window.location.pathname.includes('index4.html') || window.location.pathname.includes('index6.html') || window.location.pathname.includes('index7.html')) {
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

    const editProfileButton = document.getElementById("editProfileButton");
    const editProfileModal = document.getElementById("editProfileModal");
    const closeButton = document.querySelector(".close-button");
    const editProfileForm = document.getElementById("editProfileForm");

    function loadProfileData() {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            applyUserProfile(loggedInUser);
        }
    }

    function openModal() {
        editProfileModal.style.display = "block";
    }

    function closeModal() {
        editProfileModal.style.display = "none";
    }

    if (editProfileButton) {
        editProfileButton.addEventListener("click", openModal);
    }
    if (closeButton) {
        closeButton.addEventListener("click", closeModal);
    }

    window.addEventListener("click", function(event) {
        if (event.target === editProfileModal) {
            closeModal();
        }
    });

    if (editProfileForm) {
        editProfileForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const username = document.getElementById("editUsername").value;
            const email = document.getElementById("editEmail").value;
            const bio = document.getElementById("editBio").value;
            const profilePictureInput = document.getElementById("editProfilePicture");

            document.getElementById("usernameDisplay").textContent = username;
            document.getElementById("emailDisplay").textContent = email;
            document.getElementById("bioDisplay").textContent = bio;

            if (profilePictureInput.files.length > 0) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById("profilePicture").src = e.target.result;
                    saveProfileData(username, email, bio, e.target.result);
                };
                reader.readAsDataURL(profilePictureInput.files[0]);
            } else {
                saveProfileData(username, email, bio);
            }

            closeModal();
        });
    }

    loadProfileData();
});
