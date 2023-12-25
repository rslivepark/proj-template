import 'https://cdn.jsdelivr.net/npm/chart.js@3.5.1/dist/chart.min.js';

// 차트를 그릴 영역을 dom 요소로 가져온다.
let data_nonIron = [];
var chartArea = document.getElementById('myChart').getContext('2d');
let all = [];
let totalEmissions = [];
let netEmissions = [];

// 차트를 생성한다.
const request = new XMLHttpRequest();
request.open(
  'GET',
  'https://api.odcloud.kr/api/15049589/v1/uddi:779e44b1-25d9-48a8-bb63-8a90148adf9a?page=1&perPage=144&serviceKey=2dzr5Pgj1lthBgwtsb98tVqVqURheXyse3jsH2m7Zyp0JJxEXsduX39%2BqWsmKP8YJR30bUA2aHmq%2F3%2FL18m5CA%3D%3D',
  true
);

request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    const result = JSON.parse(request.responseText);
    console.log(result);

    const data_nonIron = Object.keys(result.data[0]);

    const myChart = new Chart(chartArea, {
      type: 'bar',
      data: {
        labels: Object.keys(result.data[0]),
        datasets: [
          {
            label: result.data[2]['분야 및 연도'],
            data: Object.values(result.data[2]),
            backgroundColor: ['rgba(255, 0, 0, 0.2)'],
            borderColor: 'rgba(255, 0, 0, 1)',
            borderWidth: 5,
          },
          {
            label: result.data[37]['분야 및 연도'],
            data: Object.values(result.data[37]),
            backgroundColor: ['rgba(255, 255, 0, 0.2)'],
            borderColor: 'rgba(255, 255, 0, 1)',
            borderWidth: 5,
          },
          {
            label: result.data[65]['분야 및 연도'],
            data: Object.values(result.data[65]),
            backgroundColor: ['rgba(0, 0, 139, 0.2)'],
            borderColor: 'rgba(0, 0, 139, 1)',
            borderWidth: 5,
          },
          {
            label: result.data[102]['분야 및 연도'],
            data: Object.values(result.data[102]),
            backgroundColor: ['rgba(0, 128, 0, 0.2)'],
            borderColor: 'rgba(0, 128, 0, 1)',
            borderWidth: 5,
          },
          {
            label: result.data[129]['분야 및 연도'],
            data: Object.values(result.data[129]),
            backgroundColor: ['rgba(128, 0, 128, 0.2)'],
            borderColor: 'rgba(128, 0, 128, 1)',
            borderWidth: 5,
          },
          {
            type: 'line',
            label: result.data[1]['분야 및 연도'],
            data: Object.values(result.data[0]),
            backgroundColor: ['rgba(255, 20, 147, 0.2)'],
            borderColor: 'rgba(255, 20, 147, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            ticks: {
              color: 'white',
            },
            grid: {
              color: 'white',
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: 'white',
            },
            grid: {
              color: 'white',
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: 'white',
            },
          },
        },
      },
    });
  } else {
    console.log('통신 실패');
  }
};

request.onerror = function () {
  console.log('통신 에러');
};

request.send();
