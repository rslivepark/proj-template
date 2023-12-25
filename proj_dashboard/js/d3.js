'use strict';

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

  // SVG 요소 생성 및 차트 영역 설정
  const svg = d3
    .select('#chartArea')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // 막대 생성
  svg
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d) => x(d.label))
    .attr('width', x.bandwidth())
    .attr('y', (d) => y(d.value))
    .attr('height', (d) => height - y(d.value))
    .attr('fill', 'red');

  // x 축 추가
  svg
    .append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x));

  // y 축 추가
  svg.append('g').call(d3.axisLeft(y));

  // 막대 위에 데이터 값 표시
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
