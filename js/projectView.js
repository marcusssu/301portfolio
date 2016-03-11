$(document).ready(function() {
  project.populateFilters();
  project.filterHandler();
  project.readMoreHandler();
  project.navHandler();
  project.readMoreButton();
});

var project = {};
project.populateFilters = function() {
  $('.portfolio').find('.col-12').each(function() {

      //grab the types form data-type
      var types = $(this).find('.type').attr('data-type');

      // console.log(types);
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
  });
};

// display the related project tag by searching optionValue inside tagValue
// for example search "css" in "css & html"
project.filterHandler = function() {
    $('#category-type').on('change', function() {
      var optionValue = $(this).val();
      if ($(this).val()) {
        $('.portfolio .col-12').hide();
        $('.portfolio').find('.col-12').each(function() {
          var thisTag = $(this);
          var tagValue = $(this).find('.type').attr('data-type');
          console.log(tagValue);
          if (tagValue.search(optionValue) != -1) {
            thisTag.fadeIn();
          };
        });
      } else {
        $('.portfolio .col-12').fadeIn();
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

  project.readMoreHandler = function() {
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
project.readMoreButton = function(){
  $('.content').on('click', '.more-button', function() {
    console.log('click');
    var thisButton = $(this);
    var hiddenText = $(this).prev('.hide');
    if (hiddenText.is(":hidden")) {
      hiddenText.show();
      hiddenText.addClass('fadein-animation');
      $(this).text(' collapse');
      setTimeout(function() {
        hiddenText.removeClass("fadein-animation");
        console.log('removeclass')
      }, 500);
      //hide the contents
    } else {
      hiddenText.addClass('fadeout-animation');
      setTimeout(function() {
        hiddenText.hide();
        hiddenText.removeClass('fadeout-animation');
        console.log(thisButton);
        thisButton.text(' ...more');
      }, 400);
    }
  });
}

  project.navHandler = function() {

    $('.nav-menu').on('click', 'li', function(e) {
      e.preventDefault();
      $(this).parent().find('a').removeClass('activated');
      $(this).find('a').addClass('activated');
      if ($(this).data('content') == 'home') {
        $('section').show();
      } else {

        // console.log($(this).data('content'));
        $('section').hide();
        $('.' + $(this).data('content')).fadeIn();
        if ($(this).data('content') == 'portfolio') {
          console.log('test');
          $('.filter').fadeIn();
        }
      }
    });
  };
