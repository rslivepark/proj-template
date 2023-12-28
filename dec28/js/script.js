import '/js/jquery-3.7.1.min.js';
console.log('script.js');


// 메뉴 클릭 효과 (수정중..)
const menu = document.querySelectorAll('a');

function act() {
	for (let j = 0; j < menu.length; j++) {
		menu[j].classList.remove('active');
	}
	this.classList.add('active');
}

for (let i = 0; i < menu.length; i++) {
	menu[i].addEventListener('click', act);
}



