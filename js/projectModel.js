
function Project(opts) {
  for (key in opts) this[key] = opts[key];
}

Project.all = [];

Project.prototype.toHTML = function() {
//compile the template
  var source = $('#project-template').html();
  var template = Handlebars.compile(source);
  return template(this);
};

Project.loadAll = function(rawData) {

  rawData.forEach(function(ele) {
    Project.all.push(new Project(ele));
  })
};

Project.fetchAll = function() {
  //if the rawdata exist in localStorage, parse the data and render the page
  if (localStorage.rawData) {

    Project.loadAll(JSON.parse(localStorage.rawData));

    projectView.initIndexPage();

  } else {
    //if the rawdata is not in localStorage, fire a ajax request to get the json file
    $.getJSON('js/rawData.json',function(rawData){
    //push the json file into a js object
      Project.loadAll(rawData);
    //cache the data into the localStorage
        var cache = JSON.stringify(rawData);
        localStorage.rawData = cache;
    });

    //render the indexpage.
    projectView.initIndexPage();



  }
}
