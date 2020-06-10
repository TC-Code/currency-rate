import moment from 'moment';

//  Getting data from API
const urlCurrency = 'https://api.exchangeratesapi.io/';
const currencySymbol = ['PLN', 'USD', 'GBP'];
const latestRate = 'latest';
const historyRate = 'history';
const startDate = '2020-01-01';
const endDate = '2020-06-10';

const getData = function () {
  const response = fetch(
    `${urlCurrency}${historyRate}?start_at=${startDate}&end_at=${endDate}&symbols=${currencySymbol}`,
    {
      headers: {
        Accept: 'application/json',
      },
    }
  );
  return response;
};

export { getData };
