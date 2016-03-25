(function(module) {
  var Controller = {};

  Controller.loadProject = function(ctx, next) {
    var projectData = function() {
      ctx.projects = Project.all;
      next();
    };
    if (Project.all.length) {
      ctx.projects = Project.all;
      next();
    } else {
      Project.fetchAll(projectData);
    }
    //$('section').fadeIn();
  };
  Controller.showProject = function (ctx,next){
    projectView.index(ctx.projects);
    next();
  };


  Controller.showId = function(ctx){
    $('section').hide();
    // console.log(abc);
    var section = ctx.params.section;
    console.log(ctx);
    //Project.fetchAll(projectView.initIndexPage);

    repos.requestRepos(repoView.index);
    $('.' + section).fadeIn();

  };

  module.Controller = Controller;
})(window);
