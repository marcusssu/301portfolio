$(document).ready(function() {
  projectView.populateFilters();
  projectView.filterHandler();
  projectView.readmoreHandler();
  projectView.navHandler();
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


// display the related project tag by searching optionValue inside tagValue
// for example search "css" in "css & html"
projectView.filterHandler = function() {
    $('#category-type').on('change', function() {
      var optionValue = $(this).val();
      if ($(this).val()) {
        $('.portfolio .col-12').hide();
        $('.portfolio').find('.col-12:not(:first)').each(function() {
          var thisTag = $(this);
          var tagValue = $(this).find('.type').attr('data-type');
          console.log(tagValue);
          if (tagValue.search(optionValue) != -1) {
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
  // insert someting after index
String.prototype.insert = function(index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);
  else
    return string + this;
};

projectView.readmoreHandler = function() {
  $('.portfolio').find('.col-12 .content').each(function() {
    var content = $(this).text();
    var wordCount = 0;
    //count 100 word and hide all the contents after it.
    for (var j = 0; j < content.length; j++) {
      if (content[j] == " ") {
        wordCount = wordCount + 1;
        if (wordCount == 100) {
          //insert the prewrite hide class
          content = content.insert(j, "<span class='hide'>");
          content = content.insert(content.length, "</span>");
          content = content.insert(content.length, "<p class='more-button'> ...more</p>");
          $(this).html(content).contents();
        }
      }
    }
  });
}


//click the readmore button to display more content
$('.content').on('click', '.more-button', function() {
  console.log('click');
  var hidden_text = $(this).prev('.hide');
  if (hidden_text.is(":hidden")) {
    hidden_text.show();
    hidden_text.addClass('fadein-animation');
    $(this).text(' collapse');
    setTimeout(function() {
      hidden_text.removeClass("fadein-animation");
      console.log('removeclass')
    }, 500);
    //hide the contents
  } else {
    hidden_text.addClass('fadeout-animation');
    setTimeout(function() {
      hidden_text.hide();
      hidden_text.removeClass('fadeout-animation');
      $(this).text(' ...more');
    }, 400);
  }
});

projectView.navHandler=function(){

  $('.nav-menu').on('click', 'li', function(e) {
    e.preventDefault();
    $(this).parent().find('a').removeClass('activated');
    $(this).find('a').addClass('activated');
  if ($(this).data('content')=='home'){
    $('section').show();
  }else{

    // console.log($(this).data('content'));
  $('section').hide();
  $('.' + $(this).data('content')).fadeIn();
  if ($(this).data('content')=='portfolio'){
    console.log('test');
    $('.filter').fadeIn();

  }
  }
});

};
