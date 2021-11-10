var searchButton = document.getElementById('submit');

var entryForm = document.querySelector('.entry-form');
var form = document.getElementById('search-Pokemon');
var $characterList = document.getElementById('entry-result');
var incorrect = document.getElementById('incorrect');
// var randomNumber = Math.floor(Math.random() * 20);
var image = document.querySelector('.result-image');
var statList = document.querySelector('.stats');

var title = document.querySelector('.result-title');

searchButton.addEventListener('click', function (event) {
  event.preventDefault();
  var userInput = form.elements.search.value;
  var lowerCaseInput = userInput.toLowerCase();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + lowerCaseInput);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (xhr.status === 404) {
      incorrect.setAttribute('class', 'active');
    } else {
      incorrect.setAttribute('class', 'invisible');
      entryForm.setAttribute('class', 'hidden');
      $characterList.setAttribute('class', 'active');
    }
    var name = xhr.response.name;
    var link = xhr.response.sprites.other['official-artwork'].front_default;
    image.setAttribute('src', link);
    title.textContent = name;
    for (var e = 0; e < xhr.response.stats.length; e++) {
      var statName = xhr.response.stats[e].stat.name;
      var statValue = xhr.response.stats[e].base_stat;
      var stat = document.createElement('p');
      stat.textContent = statName + ': ' + statValue;
      statList.appendChild(stat);
    }
  });
  xhr.send();
});
