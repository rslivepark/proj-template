import 'js/jquery-3.7.1.min.js';

// function performLogin() {
//     // 입력된 값 가져오기
//     var id = $("#idInput").val();
//     var password = $("#passwordInput").val();
//     var autoLogin = $("#autoLoginCheckbox").is(":checked");

//     // Ajax를 사용한 로그인 처리
//     $.ajax({
//         url: "서버의 로그인 처리 API 주소", // 실제 서버 주소로 변경
//         type: "POST",
//         data: { id: id, password: password, autoLogin: autoLogin },
//         success: function (response) {
//             // 로그인 성공 시 동작
//             console.log("로그인 성공!");
//             // 여기에 성공 시의 추가 동작을 추가할 수 있습니다.
//         },
//         error: function (error) {
//             // 로그인 실패 시 동작
//             console.error("로그인 실패!");
//             // 여기에 실패 시의 추가 동작을 추가할 수 있습니다.
//         }
//     });
// }

// console.log('login-join.js');

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
