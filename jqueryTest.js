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
    console.log("each <li>: " + i);
  });
  $("li").each(function (element, i) {
    if (i % 2 === 0) {
      $(this).css("color", "green");
    } else {
      $(this).css("color", "yellow");
    }
  });

  $("p").hide();
  $("h4").css("color", "red");
  $("h4").show();

  $(".cls").css("color", "red");
  console.log(`Time is: ${$().now()}`);

  console.log(`This is text(): ${$("h4").text()}`);
  console.log(`This is html(): ${$("button").html()}`);

  $("li").map(function (element, i) {
    console.log(`${i + 1} Mississippi`);
  });

  console.log($("input").attr("checked"));

  $(".empty-me").empty();

  class Test {
    constructor(string) {
      this.name = string;
    }
    foo() {
      this.name = this.name + " -- ";
      return this;
    }
    bar() {
      this.name = this.name + "00";
      return this;
    }
  }
  const test = new Test("This be a string");
  console.log(test.foo().bar());

  $(".li-cls").css("color", "green").hide();
  console.log(`This is text(): ${$("h4").text()}`);
  $("h4").text("T_T");
  console.log(`This is text() after input: ${$("h4").text()}`);

  console.log($(".something").siblings());

  console.log($().contains(document.documentElement, document.body));

  $("h4").append(".something");
  $("h4").after(".something");
  $(".something").clone().append(".some-class");
});
