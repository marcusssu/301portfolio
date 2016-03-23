(function(module) {
  var Controller = {};

  Controller.showAll = function() {
    // console.log('show all');
    // projectView.initIndexPage();
    $('section').fadeIn();
    console.log('init page');
    console.log($('.portfolio').find('.grid').children('.col-4').length);
    // if ($('.portfolio').find('.grid').find('.col-4')==false){
    Project.fetchAll(projectView.initIndexPage);
    //   console.log(!$('.portfolio').find('.grid').find('.col-4'));
    // }

  };

  Controller.showId = function(ctx){
    $('section').hide();
    // console.log(abc);
    var section = ctx.params.section;
    $('.' + section).fadeIn();

  };

  module.Controller = Controller;
})(window);
