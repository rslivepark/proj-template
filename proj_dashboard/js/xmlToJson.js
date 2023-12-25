import 'https://cdn.jsdelivr.net/npm/chart.js@3.5.1/dist/chart.min.js';

// xml -> Json 변환
function xmlToJson(xml) {
  // Create the return object
  var obj = {};

  if (xml.nodeType == 1) {
    // element
    // do attributes
    if (xml.attributes.length > 0) {
      obj['@attributes'] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) {
    // text
    obj = xml.nodeValue;
  }

  // do children
  // If all text nodes inside, get concatenated text from them.
  var textNodes = [].slice.call(xml.childNodes).filter(function (node) {
    return node.nodeType === 3;
  });
  if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
    obj = [].slice.call(xml.childNodes).reduce(function (text, node) {
      return text + node.nodeValue;
    }, '');
  } else if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof obj[nodeName] == 'undefined') {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof obj[nodeName].push == 'undefined') {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
}

const jsonArr = [];

const getXMLFromAPI = async () => {
  const url =
    'https://apis.data.go.kr/1741000/RegionalNaturalDisasterDamage/getRegionalNaturalDisasterDamage?ServiceKey=';
  const serviceKey =
    'THpNfEHZalAY9LpJXxDNwMqkAoe7EvDOE1NC%2FjvuHGiH%2FV6ebzylZajzxEVDRwZHtq%2FnmrTF2Ng6yuWm2N1W%2FA%3D%3D';
  const reqURL = `${url}${serviceKey}&pageNo=1&numOfRows=108`;
  const response = await fetch(reqURL);
  const xmlString = await response.text();
  let XmlNode = new DOMParser().parseFromString(xmlString, 'text/xml');
  const jsonData = xmlToJson(XmlNode);
  jsonArr.push(jsonData);
  console.log(jsonArr[0]['RegionalNaturalDisasterDamage']['row'][0]);
};

// getXMLFromAPI();

// const useData = async () => {
//   try {
//     const jsonData = await getXMLFromAPI();
//     if (jsonData) {
//       //console.log(jsonData);
//       const result = JSON.parse(request.responseText);
//       console.log('출력');
//       console.log(jsonArr[0]['RegionalNaturalDisasterDamage']['row'][0]);
//     }
//   } catch (error) {
//     console.error('Error fetching or parsing XML:', error);
//   }
// };

// useData();

//console.log(useData());

const fetchData = async () => {
  try {
    const lables = [];
    const data = [];
    const response = await fetch(
      'https://apis.data.go.kr/1741000/RegionalNaturalDisasterDamage/getRegionalNaturalDisasterDamage?ServiceKey=THpNfEHZalAY9LpJXxDNwMqkAoe7EvDOE1NC%2FjvuHGiH%2FV6ebzylZajzxEVDRwZHtq%2FnmrTF2Ng6yuWm2N1W%2FA%3D%3D&pageNo=1&numOfRows=108'
    );
    if (!response.ok) {
      throw new Error('통신 실패');
    }

    const result = await response.json();

    console.log(jsonArr[0]['RegionalNaturalDisasterDamage']['row'][0]);

    // for (const item of result.data) {
    //   labels.push(item.RegionalNaturalDisasterDamage);
    //   data.push(item.수량);
    // }

    const myChart = new Chart(chartArea, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: '수량',
            data: data,
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            borderColor: 'rgba(255, 0, 0, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            ticks: {
              color: 'black',
            },
            grid: {
              color: 'black',
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: 'black',
            },
            grid: {
              color: 'black',
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: 'black',
            },
          },
        },
      },
    });
  } catch (error) {
    console.error(error.message);
  }
};

fetchData();
