(function(module) {
  var repoView = {};



  // Set up a new compile method to help render our repos.
  var render = Handlebars.compile($('#repo-template').text());

  repoView.index = function() {
    $('.github .container .grid').empty();

    $('.github .container .grid').append(
      repos.with('name').map(render)
    );
  };

  module.repoView = repoView;
})(window);
