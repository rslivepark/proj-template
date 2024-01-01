const dropdown = document.querySelector('.inputdown');
const toggleBtn = document.querySelector('.inputdown-toggle');
const menu = document.querySelector('.inputdown-menu');
const options = document.querySelectorAll('.inputdown-option');

toggleBtn.addEventListener('click', function () {
  menu.classList.toggle('show');
});
toggleBtn.addEventListener('blur', function () {
  menu.classList.remove('show');
});

options.forEach(function (item) {
  item.addEventListener('click', function (e) {
    const buttonLabel = e.currentTarget.textContent.trim();
    toggleBtn.textContent = buttonLabel;
    toggleBtn.classList.add('selected');
  });
});
