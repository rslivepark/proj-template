import '../js/jquery-3.7.1.min.js';

console.log('login-join.js');

// 로그인 화면 로드 함수
function loadLoginScreen() {
  loadScreen('../components/login.html', 'login-screen');
}

// 회원가입 화면 로드 함수
function loadJoinScreen() {
  loadScreen('../components/join.html', 'join-screen');
}

// AJAX를 이용해 화면을 가져와서 표시하는 함수
function loadScreen(url, targetId) {
  // AJAX를 이용해 화면을 가져오는 부분
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // 가져온 내용을 지정한 영역에 삽입하고 표시
      document.getElementById(targetId).innerHTML = xhr.responseText;
      document.getElementById(targetId).style.display = 'block';
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
}
