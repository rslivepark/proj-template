console.log('dashboard.js');

import 'https://cdn.jsdelivr.net/npm/chart.js@3.5.1/dist/chart.min.js';
import 'https://code.jquery.com/jquery-3.7.1.min.js';
import 'https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0';
// import 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.min.js';
// import 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js';
// import 'https://cdn.jsdelivr.net/npm/chart.js';

//import '../json/gas.json'
// 차트를 그럴 영역을 dom요소로 가져온다.
let data_nonIron = [];
//let page = document.querySelector('input')
const chartArea = document.getElementById('myChart').getContext('2d');
const ctx = document.getElementById('gasPieChart').getContext('2d');

let all = [];
let totalEmissions = [];
let netEmissions = [];

fetch('../json/gas.json')
  .then((res) => {
    return res.json();
  })
  .then((obj) => {
    let gasPieChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [
          '이산화탄소(CO₂)',
          '메탄(CH₄)',
          '이산화질소(N₂O)',
          '염화수소화탄화물(HFCs)',
        ],
        //labels: ['CO₂', 'CH₄', 'N₂O', 'HFCs', 'SF6', 'PFCs'],
        datasets: [
          {
            data: [
              obj[0]['CO₂'],
              obj[0]['CH₄'],
              obj[0]['N₂O'],
              obj[0]['HFCs'],
              // obj[0]['SF6'],
              // obj[0]['PFCs'],
            ],
            backgroundColor: [
              'rgba(116, 102, 241, 1)',
              'rgba(158, 139, 244, 1)',
              'rgba(193, 178, 246, 1)',
              'rgba(225, 217, 247, 1)',
              'rgba(255, 20, 147, 1)',
              'rgba(0, 128, 0, 1)',
            ],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            // display: false,
            position: 'top',
            labels: {
              font: {
                size: 14,
              },
            },
          },
        },
        responsive: false,
        maintainAspectRatio: false,
        width: 600,
        height: 600,
        rotation: 270,
        circumference: 180,
      },
    });
  });

// 차트 범례 customize

// 차트를 생성한다.

$.ajax({
  // 1. 통신할 url
  url: 'https://api.odcloud.kr/api/15049589/v1/uddi:779e44b1-25d9-48a8-bb63-8a90148adf9a?page=1&perPage=144&serviceKey=2dzr5Pgj1lthBgwtsb98tVqVqURheXyse3jsH2m7Zyp0JJxEXsduX39%2BqWsmKP8YJR30bUA2aHmq%2F3%2FL18m5CA%3D%3D',
  // 2. 통신 성공할 경우 로직
  success: function (result) {
    //alert("통신 성공!!!")
    //console.log(result);
    /*
                        0 - 총배출량
                        1 - 순배출량
                        2 - 에너지
                        3 - A 연료연소
                        32 - B 탈루
                        37 - 산업공정
                        65 - 농업
                        102 - LULUCF
                        129 - 폐기물
                    */
    data_nonIron = Object.keys(result.data[0]);
    //console.log(data_nonIron)
    var myChart = new Chart(chartArea, {
      // ①차트의 종류(String)
      type: 'bar',
      // ②차트의 데이터(Object)
      data: {
        // ③x축에 들어갈 이름들(Array)
        labels: Object.keys(result.data[0]),
        // ④실제 차트에 표시할 데이터들(Array), dataset객체들을 담고 있다.
        datasets: [
          {
            // ⑤dataset의 이름(String)
            label: result.data[2]['분야 및 연도'],
            // ⑥dataset값(Array)
            data: Object.values(result.data[2]),
            backgroundColor: 'rgba(116, 102, 241, 1)',
            borderColor: 'rgba(116, 102, 241, 1)',
            // borderWidth: 1,
          },
          {
            label: result.data[37]['분야 및 연도'],
            // ⑥dataset값(Array)
            data: Object.values(result.data[37]),
            backgroundColor: 'rgba(158, 139, 244, 1)',
            borderColor: 'rgba(158, 139, 244, 1)',
            // borderWidth: 1,
          },
          {
            label: result.data[65]['분야 및 연도'],
            // ⑥dataset값(Array)
            data: Object.values(result.data[65]),
            backgroundColor: 'rgba(193, 178, 246, 1)',
            borderColor: 'rgba(193, 178, 246, 1)',

            // borderWidth: 1,
          },
          {
            label: result.data[102]['분야 및 연도'],
            // ⑥dataset값(Array)
            data: Object.values(result.data[102]),
            // ⑦dataset의 배경색(rgba값을 String으로 표현)
            backgroundColor: ['rgba(0, 128, 0, 1)'],
            // ⑧dataset의 선 색(rgba값을 String으로 표현)
            borderColor: 'rgba(0, 128, 0, 1)',
            // ⑨dataset의 선 두께(Number)
            borderWidth: 1,
          },
          {
            label: result.data[129]['분야 및 연도'],
            // ⑥dataset값(Array)
            data: Object.values(result.data[129]),
            backgroundColor: 'rgba(225, 217, 247, 1)', // Lime
            borderColor: 'rgba(225, 217, 247, 1)',

            // borderWidth: 1,
          },
          // {
          //   type: 'line',
          //   label: result.data[1]['분야 및 연도'],
          //   // ⑥dataset값(Array)
          //   data: Object.values(result.data[0]),
          //   // ⑦dataset의 배경색(rgba값을 String으로 표현)
          //   backgroundColor: ['rgba(255, 20, 147, 0.2)'],
          //   // ⑧dataset의 선 색(rgba값을 String으로 표현)
          //   borderColor: 'rgba(255, 20, 147, 1)',
          //   // ⑨dataset의 선 두께(Number)
          //   borderWidth: 1,
          // },
        ],
      },
      // ⑩차트의 설정(Object)
      options: {
        scales: {
          x: {
            ticks: {
              fontColor: 'black',
              color: 'black', // X축 라벨(숫자 값)의 색상을 흰색으로 설정
            },
            grid: {
              color: 'rgba(255, 255, 255, 0)', // X축 격자 색상을 흰색으로 설정
            },
            stacked: true,
          },
          y: {
            beginAtZero: true,
            ticks: {
              fontColor: 'black',
              color: 'black', // X축 라벨(숫자 값)의 색상을 흰색으로 설정
            },
            grid: {
              color: 'rgba(255, 255, 255, 0)', // X축 격자 색상을 흰색으로 설정
            },
            stacked: true,
          },
        },
        plugins: {
          legend: {
            labels: {
              fontSize: 5,
              color: 'rgba(0, 0, 0, 1)', // 항목을 나타내는 라벨 색상을 흰색으로 설정
            },
          },
        },
      },
    });
  },
  error: function () {
    console.log('통신실패');
  },
});
