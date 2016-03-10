$(document).ready(function() {
  projectView.populateFilters();
  projectView.filterHandler();
});
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

  //insert a data-type into type tag
  $newProject.find('.type').attr('data-type', this.type);

  //update content to each tags
  $newProject.find('.title').html(this.title);
  $newProject.find('.type').html(this.type);
  $newProject.find('.content').html(this.content);

  return $newProject;

};
//push each object into projects
rawData.forEach(function(ele) {
  projects.push(new Project(ele));
});

//append each project into grid tag.
projects.forEach(function(a) {
  $('.portfolio').find('.grid').append(a.toHTML());
});

var projectView = {};

projectView.populateFilters = function() {
  $('.portfolio').find('.col-12').each(function() {
    if (!$(this).hasClass('template')) {
      //grab the types form data-type
      var types = $(this).find('.type').attr('data-type');

      //split them into an array
      var typeArray = types.split("&");

      //for each item, create a option tag.
      typeArray.forEach(function(item, index) {
        //remove space
        item = item.trim();
        //if the array is not empty and not exist in the options then make a new one
        if (item !== '' && $('#category-type option[value="' + item + '"]').length === 0) {
          var optionTag = '<option value="' + item + '">' + item + '</option>';
          $('#category-type').append(optionTag);
        }
      });
    }
  });
};


// display the related project tag by searching optionValue and tagValue
// for example search "css" in "css & html"
projectView.filterHandler = function() {
  $('#category-type').on('change', function() {
    var optionValue = $(this).val();
    if ($(this).val()) {
      $('.portfolio .col-12').hide();
      $('.portfolio').find('.col-12:not(:first)').each(function(){
        var thisTag = $(this);
        var tagValue = $(this).find('.type').attr('data-type');
        console.log(tagValue);
        if (tagValue.search(optionValue)!=-1){
          thisTag.fadeIn();
        };
      });
    } else {
      $('portfolio .col-12').fadeIn();
      $('.template').hide();
    }
    //  $('#category-type').val('');
  });
}
