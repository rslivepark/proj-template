'use strict';

// fetch('/js/disaster.json')
//   .then((response) => {
//     return response.json();
//   })
//   .then((jsondata) =>
//     console.log(jsondata.regionalnaturaldisasterdamage['row'])
//   );

// 지역 리스트 (17개)
/* 서울, 부산, 대구, 인천, 광주, 대전, 울산, 세종, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주  */

// import 'https://cdn.jsdelivr.net/npm/chart.js@3.5.1/dist/chart.min.js';
import 'https://code.jquery.com/jquery-3.7.1.min.js';
import 'https://d3js.org/d3.v7.min.js';
// import 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.min.js';
// import 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js';
// import 'https://cdn.jsdelivr.net/npm/chart.js';

const url =
  'https://api.odcloud.kr/api/15064173/v1/uddi:ea6a36df-0f25-4ea7-ab83-c9c77db00d0c?page=1&perPage=10&serviceKey=THpNfEHZalAY9LpJXxDNwMqkAoe7EvDOE1NC%2FjvuHGiH%2FV6ebzylZajzxEVDRwZHtq%2FnmrTF2Ng6yuWm2N1W%2FA%3D%3D';

const fetchData = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('통신 실패');
    }

    const result = await response.json();

    const data = result.data.map((item) => ({
      label: item.한글이름,
      value: item.수량,
    }));

    createBarChart(data);
  } catch (error) {
    console.error(error.message);
  }
};

const createBarChart = (data) => {
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = 400 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const x = d3
    .scaleBand()
    .range([0, width])
    .padding(0.1)
    .domain(data.map((d) => d.label));

  const y = d3
    .scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(data, (d) => d.value)]);

  const svg = d3
    .select('#chartArea')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  svg
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d) => x(d.label))
    .attr('width', x.bandwidth())
    .attr('y', (d) => y(d.value))
    .attr('height', (d) => height - y(d.value))
    .attr('fill', 'rgba(255, 0, 0, 0.2)');

  svg
    .append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x));

  svg.append('g').call(d3.axisLeft(y));

  svg
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text((d) => d.value)
    .attr('x', (d) => x(d.label) + x.bandwidth() / 2)
    .attr('y', (d) => y(d.value) - 5)
    .attr('text-anchor', 'middle');
};

fetchData();
