import { getData } from './getData.js';
import Chart from 'chart.js';

chart();
async function chart() {
  const data = await currencyData();

  const ctx = document.getElementById('myChart');

  Chart.defaults.global.legend.display = true;
  Chart.scaleService.updateScaleDefaults('linear', {
    ticks: {
      min: 3.7,
    },
  });

  var chart = new Chart(ctx, {
    type: 'line',

    data: {
      datasets: [
        {
          data: data[1],
          label: 'EUR',
          lineTension: 0,
          borderCapStyle: 'square',
          backgroundColor: 'rgba(0, 51, 153, 0)',
          borderColor: 'rgba(0, 51, 153, 1)',
          borderWidth: 1.5,
          pointRadius: 0,
        },
        {
          data: data[2],
          label: 'USD',
          lineTension: 0,
          borderCapStyle: 'square',
          backgroundColor: 'rgba(133, 187, 101, 0)',
          borderColor: 'rgba(133, 187, 101, 1)',
          borderWidth: 1.5,
          pointRadius: 0,
        },
        {
          data: data[3],
          label: 'GBP',
          lineTension: 0,
          borderCapStyle: 'square',
          backgroundColor: 'rgba(207, 20, 43, 0)',
          borderColor: 'rgba(207, 20, 43, 1)',
          borderWidth: 1.5,
          pointRadius: 0,
        },
      ],

      labels: data[0],
    },
    options: {
      scales: {
        xAxes: [{}],
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      title: {
        display: false,
        text: 'Currency Rate',
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      },
    },
  });
}

async function currencyData() {
  const currencyData = await (await getData()).json();
  const currencyRates = currencyData.rates;
  console.log(currencyRates);

  const dataArr = [];

  Object.entries(currencyRates).forEach((item) => dataArr.push(item));
  dataArr.forEach((item) => {
    item[2] = parseFloat((item[1].PLN / item[1].USD).toFixed(4));
    item[3] = parseFloat((item[1].PLN / item[1].GBP).toFixed(4));
    item[1] = item[1].PLN;
  });

  dataArr.sort(function (a, b) {
    var dateA = new Date(a[0]),
      dateB = new Date(b[0]);
    return dateA - dateB;
  });
  console.log(dataArr);

  const xDate = [];
  const yEUR = [];
  const yUSD = [];
  const yGBP = [];

  dataArr.forEach((item) => xDate.push(item[0]));
  dataArr.forEach((item) => yEUR.push(item[1]));
  dataArr.forEach((item) => yUSD.push(item[2]));
  dataArr.forEach((item) => yGBP.push(item[3]));

  return [xDate, yEUR, yUSD, yGBP];
}
