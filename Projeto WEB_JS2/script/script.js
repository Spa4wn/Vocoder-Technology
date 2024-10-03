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
// Chema Alfonso
// https://krakenlabsweb.com
// https://chemaalfonso.com


const debugObject = {
    count: 200000,
    size: 15,
    branches: 4,
    radius: 3,
    randomness: .65,
    randomnessPower: 3.2,
    innerColor: '#a340b7',
    outerColor: '#565fc0',
    rotationSpeed: .3
}

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const gui = new dat.GUI()

const canvas = document.querySelector('canvas')

const scene = new THREE.Scene()

let geometry = null
let material = null
let mesh = null

const generateGalaxy = () => {

    if( geometry ) {
        geometry.dispose()
        material.dispose()
        scene.remove(mesh)
    }

    geometry = new THREE.BufferGeometry()
    
    // ====================
    // Set positions
    // ====================
    const positions     = new Float32Array( debugObject.count * 3 )
    const scales        = new Float32Array( debugObject.count )
    const colors        = new Float32Array( debugObject.count * 3 )
    const randomness    = new Float32Array( debugObject.count * 3 )

    const innerColor = new THREE.Color(debugObject.innerColor)
    const outerColor = new THREE.Color(debugObject.outerColor)
    
    for (let i = 0; i < debugObject.count; i++) {
        const randomRadius = Math.random() * debugObject.radius
        const i3 = i * 3;
    
        const angle = (i % debugObject.branches) / debugObject.branches * Math.PI * 2
    
    
        positions[i3]       = Math.cos(angle) * randomRadius * debugObject.radius
        positions[i3 + 1]   = 0
        positions[i3 + 2]   = Math.sin(angle) * randomRadius * debugObject.radius

        scales[i] = Math.random()

        const pointColor = innerColor.clone()
        pointColor.lerp(outerColor, randomRadius / debugObject.radius)

        colors[i3]       = pointColor.r
        colors[i3 + 1]   = pointColor.g
        colors[i3 + 2]   = pointColor.b

        randomness[i3]     = Math.pow(Math.random(), debugObject.randomnessPower) * ( Math.random() > .5 ? -1 : 1) * debugObject.randomness * randomRadius
        randomness[i3 + 1] = Math.pow(Math.random(), debugObject.randomnessPower) * ( Math.random() > .5 ? -1 : 1) * debugObject.randomness * randomRadius
        randomness[i3 + 2] = Math.pow(Math.random(), debugObject.randomnessPower) * ( Math.random() > .5 ? -1 : 1) * debugObject.randomness * randomRadius
    
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3))
    
    material = new THREE.ShaderMaterial({
        vertexShader: `
            uniform float uSize;
            uniform float uTime;
            uniform float uRotationSpeed;

            attribute float aScale;
            attribute vec3 aColor;
            attribute vec3 aRandomness;

            varying vec2 vUv;
            varying vec3 vColor;
    
            void main() {

                vec4 bodyPosition = modelMatrix * vec4(position, 1.0);
                
                float angle = atan( bodyPosition.x, bodyPosition.z );
                
                float distanceToCenter = length(bodyPosition.xz);
                
                float angleOffset = ( 1.0 / distanceToCenter ) * uTime * uRotationSpeed;
                angle += angleOffset;

                // Set on a circle & set the distance
                bodyPosition.x = cos(angle) * distanceToCenter;
                bodyPosition.z = sin(angle) * distanceToCenter;

                bodyPosition.xyz += aRandomness.xyz;

                vec4 viewPosition = viewMatrix * bodyPosition;
                vec4 projectionPosition = projectionMatrix * viewPosition;
    
                gl_Position = projectionPosition;
    
                gl_PointSize = uSize * aScale;

                // Apply size attenuation
                gl_PointSize *= ( 1.0 / - viewPosition.z );

                vUv = uv;
                vColor = aColor;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;

            varying vec2 vUv;

            void main() {

                float distanceFromCenter = 1.0 - distance(gl_PointCoord, vec2(.5));
                distanceFromCenter = pow(distanceFromCenter, 6.0);

                vec3 finalColor = mix(vec3(0.0), vColor, distanceFromCenter);

                gl_FragColor = vec4(finalColor, 1.0);
                
            }

        `,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        depthWrite: false,
        transparent: true,
        uniforms: {
            uSize: { value: debugObject.size },
            uTime: { value: 0 },
            uRotationSpeed: { value: debugObject.rotationSpeed }
        }
    })
    
    // ===================================
    // Mesh
    // ===================================
    mesh = new THREE.Points( geometry, material )
    scene.add(mesh)

}

generateGalaxy()

gui.add( debugObject, 'count', 1000, 500000, 100 ).onFinishChange(generateGalaxy).name('Stars')
gui.add( debugObject, 'size', .001, 20, .001 ).onFinishChange(generateGalaxy).name('Star size')
gui.add( debugObject, 'branches', 1, 10, 1 ).onFinishChange(generateGalaxy).name('Branches')
gui.add( debugObject, 'radius', .3, 4, .001 ).onFinishChange(generateGalaxy).name('Radius')
gui.add( debugObject, 'randomness', 0, 4, .001 ).onFinishChange(generateGalaxy).name('Randomness')
gui.add( debugObject, 'randomnessPower', 0, 10, .001 ).onFinishChange(generateGalaxy).name('RandomnessPower')
gui.add( debugObject, 'rotationSpeed', 0, 1, .01 ).onFinishChange(generateGalaxy).name('Rotation Speed')
gui.addColor( debugObject, 'innerColor').onFinishChange(generateGalaxy).name('Internal color')
gui.addColor( debugObject, 'outerColor').onFinishChange(generateGalaxy).name('External color')


// ===================================
// Camera
// ===================================
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 3
camera.position.y = 2
camera.position.z = 1
camera.lookAt(new THREE.Vector3(0, 0, 0))
scene.add(camera)

const controls = new THREE.OrbitControls(camera, canvas)
controls.enableDamping = true
controls.dampingFactor = 0.07
controls.rotateSpeed = 0.03


// ===================================
// Renderer
// ===================================
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    if ( material ) {
        material.uniforms.uTime.value = elapsedTime
    }

    controls.update()

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()

// ===================================
// Responsive
// ===================================
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}) 


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
});
