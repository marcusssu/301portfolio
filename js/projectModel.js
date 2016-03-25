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

  Project.loadAll = function(rawData) {
    rawData.forEach(function(ele) {
      Project.all.push(new Project(ele));
    })
  };

  Project.fetchAll = function(callback) {
    if (localStorage.rawData) {
      $.ajax({
        type: 'HEAD',
        url: '/js/rawdata.json',
        success: function(data, message, xhr) {
          var eTag = xhr.getResponseHeader('eTag');
          //if localStorage does not have eTag or the current eTag not equal to localStorage's eTag
          if (!localStorage.eTag || eTag !== localStorage.eTag) {
            localStorage.eTag = eTag;

            $.getJSON('js/rawData.json', function(rawData) {
              //push the json file into a js object
              Project.loadAll(rawData);
              //cache the data into the localStorage
              localStorage.rawData = JSON.stringify(rawData);
              //render the indexpage. check if the content is already there
              callback();
            });

          } else {
            Project.loadAll(JSON.parse(localStorage.rawData));
            //render the indexpage. check if the content is already there
              callback();
          }
        }
      });

      //if localStorage is empty
    } else {
      //if the rawdata is not in localStorage, fire a ajax request to get the json file
      $.getJSON('js/rawData.json', function(rawData, message, xhr) {
        var eTag = xhr.getResponseHeader('eTag');
        console.log(eTag);
        localStorage.eTag = eTag;
        //push the json file into a js object
        console.log(rawData);
        Project.loadAll(rawData);
        //cache the data into the localStorage
        var cache = JSON.stringify(rawData);
        localStorage.rawData = cache;
        //render the indexpage. check if the content is already there
        callback();
      });
    }
  }
  module.Project = Project;
})(window);
