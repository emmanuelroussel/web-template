window.onload = function() {
  var url = 'https://api.darksky.net/forecast/' +
    'e67140f18d02b756dd728ddd25febcda/42.59036,70.82219';
  getWeatherData(url, handleData);
}

function getWeatherData(url, cb) {
  $.ajax({
    url: url,
    dataType: "jsonp",
    success: function (data) {
      cb(data);
    }
  });
}

function handleData(data) {
  // HANDLE WEATHER DATA
  console.log(data);
  document.getElementById('root').innerHTML = JSON.stringify(data, null, 2);
}