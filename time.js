import moment from 'moment';

// Time & Date
const time = document.querySelector('.time');

setInterval(() => {
  const currentTime = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
  time.textContent = currentTime;
}, 1000);
