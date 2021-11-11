var searchButton = document.getElementById('submit');
var entryForm = document.querySelector('.entry-form');
var form = document.getElementById('search-Pokemon');
var $characterList = document.getElementById('entry-result');
var incorrect = document.getElementById('incorrect');
var randomNumber = Math.floor(Math.random() * 1000);
var image = document.querySelector('.result-image');
var statList = document.querySelector('.stats');
var reset = document.querySelector('.search-reset');
var formResult = document.getElementById('form-result');
var title = document.querySelector('.result-title');
var randomButton = document.querySelector('.random-button');
var collection = document.getElementById('add');
var pokemonList = document.querySelector('.collection-box');
var collectionPage = document.getElementById('collection');
var collectionLink = document.querySelector('.collection-link');
var empty = document.getElementById('empty-notice');

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
      incorrect.textContent = 'Pokemon does not exist in Pokedex';
    } else if (userInput === '') {
      incorrect.setAttribute('class', 'active');
      incorrect.textContent = 'Please type in a Pokemon name';
    } else {
      incorrect.setAttribute('class', 'invisible');
      entryForm.setAttribute('class', 'hidden');
      $characterList.setAttribute('class', 'active');
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
    }
  });
  xhr.send();
});

reset.addEventListener('click', function (event) {
  form.reset();
  formResult.reset();
  $characterList.setAttribute('class', 'hidden');
  entryForm.setAttribute('class', 'active');
});

randomButton.addEventListener('click', function (event) {
  event.preventDefault();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + randomNumber);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    incorrect.setAttribute('class', 'invisible');
    entryForm.setAttribute('class', 'hidden');
    $characterList.setAttribute('class', 'active');
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

collection.addEventListener('click', function (event) {
  event.preventDefault();
  collectionPage.setAttribute('class', 'active');
  var object = {};
  var name = title.textContent;
  var photo = image.getAttribute('src');
  object.name = name;
  object.photo = photo;
  object.entryId = data.nextEntryId++;
  data.entries.unshift(object);
  $characterList.setAttribute('class', 'hidden');
  pokemonList.innerHTML = '';
  for (var i = 0; i < data.entries.length; i++) {
    var objectEntry = {};
    objectEntry.name = data.entries[i].name;
    objectEntry.photo = data.entries[i].photo;
    pokemonList.append(renderEntries(objectEntry));
  }
});

function renderEntries(entry) {
  var pokemonEntry = document.createElement('li');
  pokemonEntry.setAttribute('class', 'pokemon-entry');
  var entryTitle = document.createElement('h1');
  entryTitle.textContent = entry.name;
  pokemonEntry.appendChild(entryTitle);
  var image = document.createElement('img');
  image.setAttribute('class', 'collection-image');
  image.setAttribute('src', entry.photo);
  pokemonEntry.appendChild(image);
  var collectionOptions = document.createElement('div');
  collectionOptions.setAttribute('class', 'collection-options');
  pokemonEntry.appendChild(collectionOptions);
  var view = document.createElement('p');
  view.textContent = 'View';
  collectionOptions.appendChild(view);
  var remove = document.createElement('p');
  remove.textContent = 'Delete';
  collectionOptions.appendChild(remove);
  return pokemonEntry;
}

collectionLink.addEventListener('click', function (event) {
  $characterList.setAttribute('class', 'hidden');
  collectionPage.setAttribute('class', 'active');
  entryForm.setAttribute('class', 'hidden');
  if (data.entries.length === 0) {
    empty.setAttribute('class', 'active');
  }
});

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    pokemonList.appendChild(renderEntries(data.entries[i]));
  }
});

// { /* <li class="pokemon-entry">
//   <h1>Pikachu</h1>
//   <img class="collection-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/188.png">
//   <div class ="collection-options">
//     <p>View</p>
//     <p>Delete</p>
//   </div>
// </li> */ }
