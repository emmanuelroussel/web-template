window.onload = function() {
  var url = 'https://api.darksky.net/forecast/' +
    'e67140f18d02b756dd728ddd25febcda/42.59036,-70.82219';
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
    '<div class="container-currently">' +
    '<i class="wi ' + getIconName(currently.icon) + '"></i>' +
    '<span class="temperature-currently">' + currently.temperature.toFixed(0) + '&deg;</span>' +
    '</div>' +
    '<ul>' +
    '<li>Humidity: ' + (currently.humidity * 100).toFixed(0) + '%</li>' +
    '<li>Wind Speed: ' + currently.windSpeed.toFixed(0) + 'mph</li>' +
    '</ul>' +
    '</div>';

  var daily = data.daily.data;
  var today = (new Date()).getDay();
  var dailyHTML = '<div id="daily">' +
    '<h1>Daily Forecast</h1>' +
    daily.map(function(day, i) {
      if (i === 0) return; // ignore today
      return '<div class=day>' +
        '<h3>' + getDayFromNow(today, i) + '</h3>' +
        '<ul>' +
        '<li><i class="wi ' + getIconName(day.icon) + '"></i></li>' +
        '<li><div>Min: ' + day.temperatureMin.toFixed(0) + '&deg;</div>' +
        '<div>Max: ' + day.temperatureMax.toFixed(0) + '&deg;</div></li>' +
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

// Maps Dark Sky API's icon names with weather icons we are using
function getIconName(icon) {
  switch (icon) {
    case 'clear-day':
      return 'wi-day-sunny';
    case 'clear-night':
      return 'wi-night-clear';
    case 'wind':
      return 'wi-windy';
    case 'partly-cloudy-day':
      return 'wi-day-cloudy';
    case 'partly-cloudy-night':
      return 'wi-night-alt-cloudy';
    case 'rain':
    case 'snow':
    case 'sleet':
    case 'fog':
    case 'cloudy':
      return 'wi-' + icon;
    default:
      return 'wi-na';
  }
}
