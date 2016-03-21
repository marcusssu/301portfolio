(function(module) {
  var Controller = {};

  Controller.showAll = function() {
    // console.log('show all');
    $('section').fadeIn();
    Project.fetchAll(projectView.initIndexPage);
  };
  Controller.showId = function(ctx){
    $('section').hide();
    // console.log(abc);
    var section = ctx.params.section;
    $('.' + section).fadeIn();

  };

  module.Controller = Controller;
})(window);
