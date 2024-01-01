'use strict';

console.log('newsfeed.js');

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
