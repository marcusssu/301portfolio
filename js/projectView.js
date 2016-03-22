(function(module) {


  var projectView = {};
  projectView.populateFilters = function() {
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
  projectView.filterHandler = function() {
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

  projectView.readMoreHandler = function() {
    $('.portfolio').find('.col-12 .content').each(function() {
      var content = $(this).text();
      var wordCount = 0;
    });
  }
  projectView.readMoreButton = function() {
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

  projectView.navHandler = function() {

    $('.nav-menu').on('click', 'li', function(e) {
      // e.preventDefault();
      $(this).parent().find('a').removeClass('activated');
      $(this).find('a').addClass('activated');
    });
  };

  projectView.initIndexPage = function() {
    projectView.navHandler();
    Project.all.forEach(function(a) {
      $('.portfolio').find('.grid').append(a.toHTML());
    });
  };

  module.projectView = projectView;
})(window);
