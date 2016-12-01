window.onload = function() {
  var url = 'https://api.darksky.net/forecast/' +
    'e67140f18d02b756dd728ddd25febcda/42.59036,70.82219';
  getWeatherData(url, handleData);
}

function getWeatherData(url, cb) {
  $.ajax({
    url: url,
    dataType: "jsonp",
    success: function(data) {
      cb(data);
    }
  });
}

function handleData(data) {
  // HANDLE WEATHER DATA
  console.log(data);
  // document.getElementById('root').innerHTML = JSON.stringify(data, null, 2);

  var customHTML;

  var currently = data.currently;
  var currentlyHTML = '<div id="currently">' +
    '<h1>Currently</h1>' +
    '<ul>' +
    '<li>Temperature: ' + currently.temperature + '</li>' +
    '<li>Humidity: ' + currently.humidity + '</li>' +
    '<li>Wind Speed: ' + currently.windSpeed + '</li>' +
    '</ul>' +
    '</div>';

  var daily = data.daily.data;
  var today = (new Date()).getDay();
  var dailyHTML = '<div id="daily">' +
    '<h1>Daily Forecast</h1>' +
    daily.map(function(day, i) {
      if (i === 0) return; // ignore today
      return '<div class=day>' +
        '<h5>' + getDayFromNow(today, i) + '</h5>' +
        '<ul>' +
        '<li>Min: ' + day.temperatureMin + '</li>' +
        '<li>Max: ' + day.temperatureMax + '</li>' +
        '</ul>' +
        '</div>';
    }).join('') +
    '</div>';

  var customHTML = currentlyHTML + dailyHTML;

  document.getElementById('root').innerHTML = customHTML;
}

function getDayFromNow(today, i) {
  var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  return days[(today + i) % 7];
}
