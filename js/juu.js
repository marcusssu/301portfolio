$(document).ready(function() {
var windowSize = $(window).width() / parseFloat($("body").css("font-size"));
    $(".clickable_image").click(function() {
        console.log("clicked");

        $(".popout").css("display","block");
        console.log($(this).attr("src"));
        //$(this).getAttribute("src");
        $(".popout img").attr("src",$(this).attr("src"));
        setTimeout(function() {
        $(".popout").css("opacity","1");
      }, 1);
        if (windowSize<=43){

        }else{
          $("body").css("overflow", "hidden");
        }

    });
    $(".popout").click(function() {

      // $(".popout").fadeOut();
      $(".popout").css("opacity","0");
      $("body").css("overflow", "scroll");
      setTimeout(function() {
        $(".popout").css("display","none");
      }, 500);
    });
    disable_popout();
    $(window).resize(function() {
      disable_popout();
    });
    function disable_popout(){

      console.log("windowSize: "+windowSize);
      //if current window size is mobile, disable the popout
      if (windowSize<=43){
        $("#popout").removeClass("popout");
        $(".clickable_image").css("cursor","auto");
        $("body").css("overflow", "scroll");
      }else{
        $("#popout").addClass("popout");
        $(".clickable_image").css("cursor","zoom-in");
      }
    }
});
