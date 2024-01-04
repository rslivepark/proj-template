const toggleBtn = document.querySelector('.navbar__toggleBtn');
const SIDE_MENU = document.querySelector('.menu-wrapper');
const LOGIN_AREA = document.getElementById('login-area');

toggleBtn.addEventListener('click', () => {
  console.log('click!');
  SIDE_MENU.classList.toggle('active');
  LOGIN_AREA.classList.toggle('active');
});


///////////



