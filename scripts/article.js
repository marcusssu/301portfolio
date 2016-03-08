var projects = [];

function Project (opts) {
  // DONE: Use the js object passed in to complete this contructor function:
  // Save ALL the properties of `opts` into `this`.

  this.title = opts.title;
  this.type = opts.type;

  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
}

Project.prototype.toHtml = function() {
  var $newProject = $('project.template').clone();

  $newProject.attr('data-category', this.type);
  $newProject.find('h1').attr('data-title', this.title);
  $newProject.find('h1').html(this.title);
  $newProject.find('.project-type').html(this.type);
  $newProject.find('.project-description').html(this.body);

  // DONE: Use jQuery to fill in the template with properties
  // from this particular Article instance. We need to fill in:
  // the author name and url, the article title and body, and the
  // publication date.

  // Include the publication date as a 'title' attribute to show on hover:
  $newProject.find('time[pubdate]').attr('title', this.publishedOn)


  // Display the date as a relative number of "days ago":
  $newProject.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago')

  $newProject.append('<hr>');

  // DONE: This cloned article is no longer a template, so we should remove that class...
  $newProject.removeClass('template');
  return $newProject;
}

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(ele) {
  // console.log(ele);
  projects.push(new Project(ele));
})

projects.forEach(function(a){
  console.log(a);
  $('#projects').append(a.toHtml());
});
