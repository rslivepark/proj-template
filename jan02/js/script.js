import '../js/login-join.js';
import '../js/newsfeed.js';
import '../js/dashboard-apis.js';

console.log('script.js');

// 반응형 메뉴 아이콘 클릭

// calculation menu dropdown

const transport = document.querySelector('.inputdown-transport');
const transportToggleBtn = document.querySelector('.transport-toggle');
const transportMenu = document.querySelector('.transport-menu');
const transportOptions = document.querySelectorAll('.transport-option');

const nextBtn = document.querySelector('.next-btn');

transportToggleBtn.addEventListener('click', function () {
  transportMenu.classList.toggle('show');
});
transportToggleBtn.addEventListener('blur', function () {
  transportMenu.classList.remove('show');
});

transportOptions.forEach(function (item) {
  item.addEventListener('click', function (e) {
    const buttonLabel = e.currentTarget.textContent.trim();
    transportToggleBtn.textContent = buttonLabel;
    transportToggleBtn.classList.add('selected');
  });
});

///////////////////////////////////////
const fuel = document.querySelector('.inputdown-fuel');
const fuelToggleBtn = document.querySelector('.fuel-toggle');
const fuelMenu = document.querySelector('.fuel-menu');
const fuelOptions = document.querySelectorAll('.fuel-option');

fuelToggleBtn.addEventListener('click', function () {
  fuelMenu.classList.toggle('show');
});
fuelToggleBtn.addEventListener('blur', function () {
  fuelMenu.classList.remove('show');
});

fuelOptions.forEach(function (item) {
  item.addEventListener('click', function (e) {
    const buttonLabel = e.currentTarget.textContent.trim();
    fuelToggleBtn.textContent = buttonLabel;
    fuelToggleBtn.classList.add('selected');
  });
});

////////////////////
