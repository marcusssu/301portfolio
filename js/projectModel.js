(function(module) {
  function Project(opts) {
    for (key in opts) this[key] = opts[key];
  }

  Project.all = [];

  Project.prototype.toHTML = function() {
    //compile the template
    var source = $('#project-template').html();
    var template = Handlebars.compile(source);
    return template(this);
  };
//REVIEW: Minor suggestion. This is missing a single semicolon on line# 18 and #82.
  Project.loadAll = function(rawData) {
    rawData.forEach(function(ele) {
      Project.all.push(new Project(ele));
    });
  };
  //******************************//
  //code reivew class-9
  //Refactorin the fetchAll: if the data is in localStorage, compare its eTag to the newest eTag to check whether or not
  //the localStorage needs to update.
  //******************************//
  Project.fetchAll = function(callback) {
    //if the rawdata exist in localStorage, parse the data and render the page
    if (localStorage.rawData) {
      $.ajax({
        type: 'HEAD',
        url: '/js/rawdata.json',
        success: function(data, message, xhr) {
//REVIEW: Minor suggestion here. If the console.log() messages are no longer being used for testing, or if your are moving to production you may want to remove these console.logs. On startup, I see these on line# 33, 34, and 36, but it looks like there may be a few others as well.
          console.log(message);
          console.log(xhr);
          var eTag = xhr.getResponseHeader('eTag');
          console.log(eTag);
          //if localStorage does not have eTag or the current eTag not equal to localStorage's eTag
          if (!localStorage.eTag || eTag !== localStorage.eTag) {
//REVIEW: This is a very minor recomendation, but if you wanted, you could set the value of localStorage.eTag to the $.getJSON... call directly. Again, this is only a minor recomendation and is purely based on preference or semantecs.
            localStorage.eTag = eTag;

            //******************************//
            //in line 43 and line 62, I'm using the same $.getJSON() twice, for FP and OOP principles, I should only define once and call twice.
            //******************************//

            $.getJSON('js/rawData.json', function(rawData) {
              //push the json file into a js object
//REVIEW: You might want to look to combine a couple of these lines below, where possible. For example, you might want to look at something similar to:
//Project.loadAll(JSON.stringify(localStorage.rawData));
              Project.loadAll(rawData);
              //cache the data into the localStorage
              var cache = JSON.stringify(rawData);
              localStorage.rawData = cache;
              callback();
            });

          } else {
            Project.loadAll(JSON.parse(localStorage.rawData));
            callback();
          }
        }
      });

      //if localStorage is empty
    } else {
      //if the rawdata is not in localStorage, fire a ajax request to get the json file
      $.getJSON('js/rawData.json', function(rawData,message,xhr) {
        var eTag = xhr.getResponseHeader('eTag');
        console.log(eTag);
        localStorage.eTag = eTag;
        //******************************//
        //my question here is how can I get the eTag form .getJSON? or do I have to implement the .ajax() again?
        //******************************//

        //push the json file into a js object
        console.log(rawData);
        Project.loadAll(rawData);
        //cache the data into the localStorage
        var cache = JSON.stringify(rawData);
        localStorage.rawData = cache;

        //render the indexpage.
        callback();
      });
    }
  };
  module.Project = Project;
})(window);
