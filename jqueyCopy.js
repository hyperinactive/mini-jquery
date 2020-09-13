//Sets up the collection attaching all the properties onto it
const makeNewCollection = collection => {
  //.on(string)
  collection.on = (eventName, handlerFunction) => {
    collection.forEach((element) => {
      element.addEventListener(eventName, handlerFunction);
    });
  };

  //.each()
  //won't work with arrow functions though
  //call each, accept a callback
  collection.each = (callback) => {
    //iterate over all of the elements
    collection.forEach((element, i) => {
      //bind the function to the elements themselves
      const bindFn = callback.bind(element);
      //invoke the bound function for each element
      bindFn(element, i);
    });
  };

  
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
}

const $ = (...arguments) => {
  console.log(arguments);

  //handle functions
  if (typeof arguments[0] === "function") {
    //document ready listener
    const readyFunction = arguments[0];
    document.addEventListener("DOMContentLoaded", readyFunction);

    //handle strings
  } else if (typeof arguments[0] === "string") {

    //selector
    const selector = arguments[0];
    const collection = document.querySelectorAll(selector);

    makeNewCollection(collection);

    return collection;

    /**
     * handle $(this)
     * bad code but it works
     */
  } else if (arguments[0] instanceof HTMLElement) {
    console.log("HTML element");
    const collection = [arguments[0]];
    makeNewCollection(collection);
    return collection;

  }
};
