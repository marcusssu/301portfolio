$(document).ready(function() {});
var projects = [];

function Project(opts) {
  this.title = opts.title;
  this.type = opts.type;
  this.content = opts.content;
}

Project.prototype.toHTML = function() {
  var $newProject = $('.template').clone();
  //console.log($newProject);
  $newProject.removeClass('template');

  $newProject.find('.title').html(this.title);
  $newProject.find('.type').html(this.type);
  $newProject.find('.content').html(this.content);

  return $newProject;

};
rawData.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(a) {
  $('.portfolio').find('.grid').append(a.toHTML());
});
