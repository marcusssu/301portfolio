var projects = [];

function Project(opts) {
  for (key in opts) this[key] = opts[key];
}

Project.prototype.toHTML = function() {
//compile the template
  var source = $('#project-template').html();
  var template = Handlebars.compile(source);
  return template(this);
};
//push each object into projects
rawData.forEach(function(ele) {
  projects.push(new Project(ele));
});

//append each project into grid tag.
projects.forEach(function(a) {
  $('.portfolio').find('.grid').append(a.toHTML());
});
