
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
  if (localStorage.rawData) {

    Project.loadAll(JSON.parse(localStorage.rawData));//done: What do we pass in here to the .loadAll function?

    projectView.initIndexPage();
    //(); //done: Change this fake method call to the correct one that will render the index page.
  } else {
    // TODO: When we don't already have the rawData, we need to:
    // 1. Retrieve the JSON file from the server with AJAX (which jQuery method is best for this?),
    console.log('test');
    $.getJSON('js/rawData.json',function(rawData){
    // 2. Store the resulting JSON data with the .loadAll method,
      Project.loadAll(rawData);
    // 3. Cache it in localStorage so we can skip the server call next time,
        var cache = JSON.stringify(rawData);

        // localStorage.rawData=rawData;
        localStorage.rawData = cache;
    });

    // 4. And then render the index page (perhaps with an articleView method?).
    projectView.initIndexPage();



  }
}
