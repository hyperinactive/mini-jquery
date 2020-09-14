$(() => {
  console.log("Doc ready");
  $("body").obj_css({
    backgroundColor: "black",
    color: "white",
  });
  $("h1").obj_css("color", "red");
  $("h1").obj_css({
    cursor: "pointer",
    fontFamily: "sans-serif",
  });
  /*
  $("h1").on("click", () => {
    console.log("Clicked");
  });
  */
 $("h1").obj_on("click", () => {
  console.log("Clicked");
});
  $("li").obj_css("font-family", "sans-serif");
  $("li").obj_each(function (i) {
    console.log("<li>: " + i);
  });
  $("li").obj_each(function (element, i) {
    if (i % 2 === 0) {
      $(this).obj_css("color", "green");
    } else {
      $(this).obj_css("color", "yellow");
    }
  });

  $("p").hide();
  $("h4").obj_css("color", "red");
  console.log($("h4").show().len);

});
