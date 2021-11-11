/* exported data */

var data = {
  view: 'entry-result',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntriesJSON = localStorage.getItem('ajax-project-data');

if (previousEntriesJSON !== null) {
  data = JSON.parse(previousEntriesJSON);
}

window.addEventListener('beforeunload', function (event) {
  var storage = JSON.stringify(data);
  localStorage.setItem('ajax-project-data', storage);
});
