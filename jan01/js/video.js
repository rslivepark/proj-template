// video.js 라이브러리
import 'https://vjs.zencdn.net/8.6.1/video.js';
import 'https://vjs.zencdn.net/8.6.1/video-js.css';
import 'https://cdn.jsdelivr.net/npm/videojs-youtube@2.9.1/dist/Youtube.min.js';

// 부모 요소를 선택합니다. 여기서는 videoContainer로 가정합니다.
var parentElement = document.getElementById('videoContainer');

// 10개의 YouTube 비디오 ID를 배열로 정의합니다.
var youtubeVideoIDs = ['xrRDlOWR1OU', 'a3ICNMQW7Ok', 'Nqh7TQeuoVI'];

// 각 YouTube 비디오 ID에 대해 반복합니다.
for (var i = 0; i < youtubeVideoIDs.length; i++) {
  // 동적으로 비디오 태그를 생성합니다.
  var videoElement = document.createElement('video');
  videoElement.id = 'myPlayer' + (i + 1); // 고유한 ID를 만들기 위해 인덱스를 사용합니다.
  videoElement.className = 'video-item video-js vjs-default-skin';
  videoElement.setAttribute('webkit-playsinline', '');

  // 부모 요소에 비디오 태그를 추가합니다.
  parentElement.appendChild(videoElement);

  // videojs로 각 비디오를 초기화합니다.
  var player = videojs(videoElement.id, {
    techOrder: ['youtube'],
    sources: [
      {
        type: 'video/youtube',
        src: 'https://www.youtube.com/watch?v=' + youtubeVideoIDs[i],
      },
    ],
    controls: true,
    playsinline: true,
    muted: true,
    preload: 'metadata',
  });
}
