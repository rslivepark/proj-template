'use strict';

// JSON 파일 경로
var jsonFilePath = '../json/news.json';
var itemsPerPage = 5;
var currentPage = 1;

// 동적으로 HTML 생성
function createNewsElement(newsData) {
  var container = document.getElementById('newsListContainer');

  var newsListItem = document.createElement('li');
  newsListItem.className = 'news-list-item';

  var newsElement = document.createElement('div');
  newsElement.className = 'news-txt';

  var titleElement = document.createElement('div');
  titleElement.className = 'news-txt__title';
  var titleLink = document.createElement('a');
  titleLink.href = newsData.url;
  titleLink.textContent = newsData.title;
  titleElement.appendChild(titleLink);

  var detailElement = document.createElement('div');
  detailElement.className = 'news-txt__detail';
  detailElement.textContent = newsData.detail;

  newsElement.appendChild(titleElement);
  newsElement.appendChild(detailElement);
  newsListItem.appendChild(newsElement);
  container.appendChild(newsListItem);
}

// 페이지 번호 클릭 이벤트 핸들러
function handlePageClick(pageNumber, data) {
  currentPage = pageNumber;
  updateNewsList(data);
}

// 페이지 번호 생성
function createPagination(data) {
  var totalItems = data.newsList.length;
  var totalPages = Math.ceil(totalItems / itemsPerPage);
  var paginationContainer = document.getElementById('paginationContainer');
  paginationContainer.innerHTML = '';

  for (var i = 1; i <= totalPages; i++) {
    var pageItem = document.createElement('li');
    pageItem.textContent = i;
    pageItem.addEventListener('click', function (event) {
      handlePageClick(parseInt(event.target.textContent), data);
    });
    paginationContainer.appendChild(pageItem);
  }
}

// 뉴스 리스트 업데이트
function updateNewsList(data) {
  var startIdx = (currentPage - 1) * itemsPerPage;
  var endIdx = startIdx + itemsPerPage;
  var slicedData = data.newsList.slice(startIdx, endIdx);

  var container = document.getElementById('newsListContainer');
  container.innerHTML = '';

  // 선택된 페이지에 따라 뉴스 아이템 생성
  slicedData.forEach(createNewsElement);
}

// JSON 파일 불러오기
fetch(jsonFilePath)
  .then((response) => response.json())
  .then((data) => {
    // 초기 페이지 번호 설정
    currentPage = 1;

    // JSON 데이터를 사용하여 동적으로 HTML 생성
    updateNewsList(data);

    // 페이지 번호 생성
    createPagination(data);
  })
  .catch((error) => console.error('데이터를 불러오지 못했습니다:', error));

// 비디오피드
// 새로운 비디오 플레이어를 생성하는 함수
function createYouTubePlayer(containerId, videoId) {
  var container = document.getElementById(containerId);
  var newVideoItem = document.createElement('li');
  newVideoItem.className = 'video-list-item';

  var newPlayerDiv = document.createElement('div');
  newPlayerDiv.id = 'player-' + videoId; // 각 플레이어에 고유한 ID 지정
  newVideoItem.appendChild(newPlayerDiv);

  container.appendChild(newVideoItem);

  // 새로운 div에 대한 YouTube 플레이어 생성
  new YT.Player(newPlayerDiv, {
    videoId: videoId,
    playerVars: {
      autoplay: false,
      loop: false,
      playlist: videoId,
    },
    events: {
      onReady: function (event) {
        event.target.mute();
      },
    },
  });
}

// YouTube API 스크립트를 동적으로 로드
var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// YouTube API 스크립트가 로드된 후에 호출되는 콜백 함수
function onYouTubeIframeAPIReady() {
  // 초기 비디오를 생성합니다.
  createYouTubePlayer('videoContainer', 'An6LvWQuj_8');
  createYouTubePlayer('videoContainer', 'An6LvWQuj_8');
}
