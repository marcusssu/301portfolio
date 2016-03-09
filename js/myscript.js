$(document).ready(function() {

  $(".project_item").mouseover(function() {

    $(this).parent().removeClass("unselected");
    $(this).parent().siblings().addClass("unselected");

  });
  $(".project_item").mouseout(function() {
    $(this).parent().removeClass("unselected");
    $(this).parent().siblings().removeClass("unselected");
  });
});
