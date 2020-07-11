import $ from 'jquery';
import moment from 'moment';
import daterangepicker from 'daterangepicker';
import '@fortawesome/fontawesome-free-webfonts';
import '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css';

//  Getting data from API
const urlCurrency = 'https://api.exchangeratesapi.io/';
const currencySymbol = ['PLN', 'USD', 'GBP'];
const latestRate = 'latest';
const historyRate = 'history';
let beginDate = '2020-01-01';
let endDate = moment().format('YYYY-MM-DD');

// Data
const getData = function () {
  const response = fetch(
    `${urlCurrency}${historyRate}?start_at=${beginDate}&end_at=${endDate}&symbols=${currencySymbol}`,
    {
      headers: {
        Accept: 'application/json',
      },
    }
  );
  return response;
};

$(function () {
  var start = moment('2020-01-01');
  var end = moment();

  function cb(start, end) {
    $('#reportrange span').html(
      start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY')
    );
  }

  $('#reportrange').daterangepicker(
    {
      startDate: start,
      endDate: end,
      ranges: {
        'In 2020': [moment('2020-01-01'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'Last 90 Days': [moment().subtract(89, 'days'), moment()],
        'Last 180 Days': [moment().subtract(179, 'days'), moment()],
      },
    },
    cb
  );

  cb(start, end);
});

// Updating search - Date Range Picker
$('#reportrange').on('apply.daterangepicker', function (ev, picker) {
  beginDate = picker.startDate.format('YYYY-MM-DD');
  endDate = picker.endDate.format('YYYY-MM-DD');
});

export { getData };
