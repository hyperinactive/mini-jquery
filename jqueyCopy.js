const $ = (...arguments) => {
  console.log(arguments);

  if (typeof arguments[0] === "function") {
    //document ready listener
    const readyFunction = arguments[0];
    document.addEventListener("DOMContentLoaded", readyFunction);
  } else if (typeof arguments[0] === "string") {
    
    //selector
    const selector = arguments[0];
    const collection = document.querySelectorAll(selector);
    collection.css = (...cssArguments) => {

      //scenario where the strings are passed
      if (typeof cssArguments[0] === "string") {
        //"color", "red"
        const [property, value] = cssArguments;
        collection.forEach((element) => {
          element.style[property] = value;
        });

        //scenario where an object is passed
      } else if (typeof cssArguments[0] === "object") {
        
        //Object.entries -> basically all of the properties of an object
        const cssProps = Object.entries(cssArguments[0]);
        collection.forEach((element) => {
          cssProps.forEach(([property, value]) => {
            element.style[property] = value;
          });
        });
      }
    };
    return collection;
  }
};
