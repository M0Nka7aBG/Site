const MenuBtn = document.querySelector("#MenuBtn");
const Navbar = document.querySelector(".navbar");
const Scrollbtn = document.getElementById('carbtn');
const themeToggle = document.querySelector(".themeToggle");
const toggleBtn = document.querySelector(".ToggleBtn");
const loginFormContainer = document.querySelector(".loginformContainer");
const registerFormContainer = document.querySelector(".registerformContainer");
const closeLoginForm = document.querySelector("#CloseLoginForm");
const closeRegisterForm = document.querySelector("#CloseRegisterForm");
const showRegisterBtn = document.querySelector("#showRegister");
const loginBtn = document.querySelector(".loginformContainer .btn");
const registerBtn = document.querySelector(".registerformContainer .btn");
const loginButton = document.querySelector("#LoginBtn .btn");
const showLoginBtn = document.querySelector("#LoginBtn");
const showLogin = document.querySelector("#showLogin");
const userNameDisplay = document.querySelector("#LoginBtn .userName");

function loadUsers() {
    fetch('users.json')
        .then(response => response.json())
        .then(users => {
            localStorage.setItem('users', JSON.stringify(users));
        })
        .catch(error => console.error('Error loading users:', error));
}

loadUsers();

MenuBtn.onclick = () => {
    MenuBtn.classList.toggle("fa-times");
    Navbar.classList.toggle("active");
};

Scrollbtn.addEventListener('click', () => {
    document.getElementById('Vehicles').scrollIntoView({ behavior: 'smooth' });
});

toggleBtn.onclick = () => {
    themeToggle.classList.toggle("active");
    MenuBtn.classList.remove("fa-times");
    Navbar.classList.remove("active");
};

document.querySelectorAll(".themeToggle .themeBtn").forEach((btn) => {
    btn.onclick = () => {
        let color = btn.style.background;
        document.querySelector(":root").style.setProperty("--main", color);
    };
});

closeLoginForm.onclick = () => {
    loginFormContainer.classList.remove("active");
};

closeRegisterForm.onclick = () => {
    registerFormContainer.classList.remove("active");
};

showLogin.onclick = () => {
    registerFormContainer.classList.remove("active");
    loginFormContainer.classList.add("active");
};

showLoginBtn.onclick = () => {
    registerFormContainer.classList.remove("active");
    loginFormContainer.classList.add("active");
};

showRegisterBtn.onclick = () => {
    loginFormContainer.classList.remove("active");
    registerFormContainer.classList.add("active");
};

window.onscroll = () => {
    MenuBtn.classList.remove("fa-times");
    Navbar.classList.remove("active");
    themeToggle.classList.remove("active");
};

function openLoginForm() {
    loginFormContainer.classList.add("active");
}

function openRegisterForm() {
    registerFormContainer.classList.add("active");
}

registerBtn.onclick = (e) => {
    e.preventDefault();
    const email = document.querySelector(".registerformContainer input[type='email']").value;
    const password = document.querySelector(".registerformContainer input[type='password']").value;
    const name = document.querySelector(".registerformContainer input[type='name']").value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        alert("Потребител с този имейл вече съществува.");
    } else {
        const newUser = { email, password, name };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert("Регистрацията е успешна!");
        registerFormContainer.classList.remove("active");
        loginFormContainer.classList.add("active");
    }
};

loginBtn.onclick = (e) => {
    e.preventDefault();
    const email = document.querySelector(".loginformContainer input[type='email']").value;
    const password = document.querySelector(".loginformContainer input[type='password']").value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        alert(`Добре дошли, ${user.name}!`);
        loginButton.textContent = user.name;
        loginButton.style.display = "inline";
        loginFormContainer.classList.remove("active");
    } else {
        alert("Невалидни данни за вход.");
    }
};



