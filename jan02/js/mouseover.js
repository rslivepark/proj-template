let horizontalBar = document.getElementById('horizontal-underline');
let horizontalMenus = document.querySelectorAll('.menu-link');

function horizontalIndicator(e) {
	horizontalBar.style.left = e.offsetLeft + 'px';
	horizontalBar.style.width = e.offsetWidth + 'px';
	horizontalBar.style.top = e.offsetTop + e.offsetHeight + 'px';
}

function hideHorizontalBar() {
	horizontalBar.style.width = '0';
}

horizontalMenus.forEach((menu) => {
	menu.addEventListener('mouseover', (e) => {
		horizontalIndicator(e.currentTarget);
	});

	menu.addEventListener('mouseleave', () => {
		hideHorizontalBar();
	});
});

