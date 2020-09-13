$(() => {
  console.log("Doc ready");
  $("body").css({
    backgroundColor: "black",
    color: "white",
  });
  $("h1").css("color", "red");
  $("h1").css({
    cursor: "pointer",
    fontFamily: "sans-serif",
  });
  $("h1").on("click", () => {
    console.log("Clicked");
  });
  $("li").css("font-family", "sans-serif");
  $("li").each(function (i) {
    console.log("<li>: " + i);
  })
  $("li").each(function (i) {
    if (i % 2 === 0) {
      $(this).css("color", "green");
    } else {
      $(this).css("color", "yellow");
    }
  });
});
