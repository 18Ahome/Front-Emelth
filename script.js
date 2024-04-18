const container = document.getElementById('pop-up');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.querySelector('.close-btn');
    const closeBtn2 = document.querySelector('.close-btn2');

    closeBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    closeBtn2.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});