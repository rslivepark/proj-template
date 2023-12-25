import 'https://code.jquery.com/jquery-3.7.1.min.js';

// 클릭한 메뉴 이벤트 활성화
$(function () {
  $('.sidebar-link').click(function () {
    $('.sidebar-link').removeClass('is-active');
    $(this).addClass('is-active');
  });
});

$(window).resize(function () {
  if ($(window).width() > 1090) {
    $('.sidebar').removeClass('collapse');
  } else {
    $('.sidebar').addClass('collapse');
  }
});
// .resize();

$(function () {
  $('.logo, .logo-expand, .discover').on('click', function (e) {
    $('.main-container').removeClass('show');
    $('.main-container').scrollTop(0);
  });
  $('.trending, .video').on('click', function (e) {
    $('.main-container').addClass('show');
    $('.main-container').scrollTop(0);
    $('.sidebar-link').removeClass('is-active');
    $('.trending').addClass('is-active');
  });
});
