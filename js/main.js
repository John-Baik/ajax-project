var searchButton = document.getElementById('submit');
var entryForm = document.querySelector('.entry-form');
var form = document.getElementById('search-Pokemon');
var $characterList = document.getElementById('entry-result');
var incorrect = document.getElementById('incorrect');
var randomNumber = Math.ceil(Math.random() * 897);
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
var modalContainer = document.getElementById('modal-container');
var cancel = document.querySelector('.cancel');
var confirmDelete = document.getElementById('confirm');
var notificationTitle = document.querySelector('.notification-title');
var total = document.querySelector('.total');
var totaMobile = document.querySelector('.total-mobile');
var sort = document.getElementById('sort');

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
      incorrect.textContent = 'Pokémon does not exist in Pokédex';
    } else if (userInput === '') {
      incorrect.setAttribute('class', 'active');
      incorrect.textContent = 'Please type in a Pokémon name';
    } else {
      incorrect.setAttribute('class', 'invisible');
      entryForm.setAttribute('class', 'hidden');
      $characterList.setAttribute('class', 'active');
      var object = {};
      var name = xhr.response.name;
      var link = xhr.response.sprites.other['official-artwork'].front_default;
      object.name = name;
      object.photo = link;
      image.setAttribute('src', link);
      title.textContent = name;
      var statArray = [];
      for (var e = 0; e < xhr.response.stats.length; e++) {
        var statName = xhr.response.stats[e].stat.name;
        var statValue = xhr.response.stats[e].base_stat;
        var stat = document.createElement('p');
        stat.textContent = statName + ': ' + statValue;
        statList.appendChild(stat);
        statArray.push(stat.textContent);

      }
      object.statArray = statArray;
      data.searchResult = object;
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
    var object = {};
    var name = xhr.response.name;
    var link = xhr.response.sprites.other['official-artwork'].front_default;
    object.name = name;
    object.photo = link;
    image.setAttribute('src', link);
    title.textContent = name;
    var statArray = [];
    for (var e = 0; e < xhr.response.stats.length; e++) {
      var statName = xhr.response.stats[e].stat.name;
      var statValue = xhr.response.stats[e].base_stat;
      var stat = document.createElement('p');
      stat.textContent = statName + ': ' + statValue;
      statList.appendChild(stat);
      statArray.push(stat.textContent);
    }
    object.statArray = statArray;
    data.searchResult = object;
  });
  xhr.send();
});

collection.addEventListener('click', function (event) {
  event.preventDefault();
  if (collection.textContent === 'Back to Collection') {
    collectionPage.setAttribute('class', 'active');
    $characterList.setAttribute('class', 'hidden');
  } else {
    for (var a = 0; a < data.entries.length; a++) {
      if (data.entries[a].name === data.searchResult.name) {
        modalContainer.setAttribute('class', 'active');
        notificationTitle.textContent = 'Pokemon already in Collection';
        confirmDelete.setAttribute('class', 'hidden');
        cancel.textContent = 'Okay';
        return;
      }
    }
    collectionPage.setAttribute('class', 'active');
    $characterList.setAttribute('class', 'hidden');
    if (collection.textContent === 'Add to Collection') {
      data.searchResult.entryId = data.nextEntryId++;
      data.entries.unshift(data.searchResult);
      pokemonList.innerHTML = '';
      for (var i = 0; i < data.entries.length; i++) {
        pokemonList.append(renderEntries(data.entries[i]));
      }
    }
  }
  total.textContent = 'Number of Pokémon: ' + data.entries.length;
  totaMobile.textContent = 'Number of Pokémon: ' + data.entries.length;
});

function renderEntries(entry) {
  var pokemonEntry = document.createElement('li');
  pokemonEntry.setAttribute('class', 'pokemon-entry');
  pokemonEntry.setAttribute('data-entry-id', entry.entryId);
  var entryTitle = document.createElement('h1');
  entryTitle.setAttribute('class', 'pokemon-name');
  entryTitle.setAttribute('data-entry-id', entry.entryId);
  entryTitle.textContent = entry.name;
  pokemonEntry.appendChild(entryTitle);
  var image = document.createElement('img');
  image.setAttribute('class', 'collection-image');
  image.setAttribute('src', entry.photo);
  image.setAttribute('data-entry-id', entry.entryId);
  pokemonEntry.appendChild(image);
  var collectionOptions = document.createElement('div');
  collectionOptions.setAttribute('class', 'collection-options');
  pokemonEntry.appendChild(collectionOptions);
  var remove = document.createElement('a');
  remove.textContent = 'Delete';
  remove.setAttribute('id', 'remove' + entry.entryId);
  remove.setAttribute('class', 'remove');
  remove.setAttribute('data-entry-id', entry.entryId);
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
  total.textContent = 'Number of Pokemon: ' + data.entries.length;
  totaMobile.textContent = 'Number of Pokemon: ' + data.entries.length;
});

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    pokemonList.appendChild(renderEntries(data.entries[i]));
  }
});

pokemonList.addEventListener('click', function (event) {
  collection.textContent = 'Back to Collection';
  if ((event.target && event.target.className === 'pokemon-entry') | (event.target && event.target.className === 'collection-image') | (event.target && event.target.className === 'pokemon-name')) {
    $characterList.setAttribute('class', 'active');
    collectionPage.setAttribute('class', 'hidden');
    for (var e = 0; e < data.entries.length; e++) {
      if (data.entries[e].entryId === parseInt(event.target.getAttribute('data-entry-id'))) {
        title.textContent = data.entries[e].name;
        image.setAttribute('src', data.entries[e].photo);
        var statsList = document.querySelectorAll('div.stats > p');
        for (var p = 0; p < data.entries[e].statArray.length; p++) {
          if (statsList.length === 0) {
            var stat = document.createElement('p');
            stat.textContent = data.entries[e].statArray[p];
            statList.appendChild(stat);
          } else {
            statsList[p].textContent = data.entries[e].statArray[p];
          }
        }
      }
    }
  } else if (event.target && event.target.className === 'remove') {
    event.target.setAttribute('class', 'remove red');
    var liList = document.querySelectorAll('.pokemon-entry');
    var value = event.target.getAttribute('data-entry-id');
    for (var w = 0; w < liList.length; w++) {
      if (liList[w].getAttribute('data-entry-id') === value) {
        liList[w].setAttribute('class', 'pokemon-entry big');
      }
    }
    modalContainer.setAttribute('class', 'active');
    data.removeId = parseInt(event.target.getAttribute('data-entry-id'));
  }
});

cancel.addEventListener('click', function (event) {
  if (notificationTitle.textContent === 'Pokemon already in Collection') {
    $characterList.setAttribute('class', 'active');
    notificationTitle.textContent = 'Pokemon already in Collection';
    confirmDelete.setAttribute('class', 'active');
    modalContainer.setAttribute('class', 'invisible');
    cancel.textContent = 'Cancel';
    notificationTitle.textContent = 'Are you sure you want to delete this Pokemon from your collection?';
  } else {
    modalContainer.setAttribute('class', 'invisible');
    var liList = document.querySelectorAll('.pokemon-entry');
    for (var h = 0; h < liList.length; h++) {
      if (parseInt((liList[h].getAttribute('data-entry-id'))) === data.removeId) {
        liList[h].setAttribute('class', 'pokemon-entry');
        var removeName = 'remove' + data.removeId;
        var removeOption = document.getElementById(removeName);
        removeOption.setAttribute('class', 'remove');
      }
    }
  }
});

confirmDelete.addEventListener('click', function (event) {
  modalContainer.setAttribute('class', 'invisible');
  var remove = document.querySelector('.remove');
  pokemonList.innerHTML = '';
  for (var g = 0; g < data.entries.length; g++) {
    if (data.entries[g].entryId === data.removeId) {
      data.entries.splice(g, 1);
      remove.closest('li').remove();
    }
    if (data.entries.length > 0 && data.entries.length !== g) {
      pokemonList.appendChild(renderEntries(data.entries[g]));
    } else if (data.entries.length === 0) {
      empty.setAttribute('class', 'active');
    }
  }
  total.textContent = 'Number of Pokemon: ' + data.entries.length;
  totaMobile.textContent = 'Number of Pokemon: ' + data.entries.length;
});

sort.addEventListener('change', function (event) {
  pokemonList.innerHTML = '';
  var array = [];
  var alphabet = [];
  for (var z = 0; z < data.entries.length; z++) {
    array.push(data.entries[z].name);
    if (event.target.value === 'alphabetical') {
      array.sort();
    } else if (event.target.value === 'reverse-alphabetical') {
      array.sort();
      array.reverse();
    }
  }
  if (event.target.value === 'oldest') {
    array.reverse();
  }
  for (var s = 0; s < array.length; s++) {
    for (var k = 0; k < data.entries.length; k++) {
      if (data.entries[k].name === array[s]) {
        alphabet.push(data.entries[k]);
      }
    }
  }
  for (var d = 0; d < alphabet.length; d++) {
    pokemonList.append(renderEntries(alphabet[d]));
  }
});
