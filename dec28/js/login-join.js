import 'js/jquery-3.7.1.min.js';

function loadLoginScreen() {
	// AJAX를 이용해 로그인 화면을 가져오는 부분
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			// 가져온 내용을 #login-screen 영역에 삽입하고 표시
			document.getElementById('login-screen').innerHTML = xhr.responseText;
			document.getElementById('login-screen').style.display = 'block';
		}
	};
	xhr.open('GET', '../components/login.html', true);
	xhr.send();
}

function loadLoginScreen() {
	// AJAX를 이용해 로그인 화면을 가져오는 부분
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			// 가져온 내용을 #login-screen 영역에 삽입하고 표시
			document.getElementById('join-screen').innerHTML = xhr.responseText;
			document.getElementById('join-screen').style.display = 'block';
		}
	};
	xhr.open('GET', '../components/join.html', true);
	xhr.send();
}
