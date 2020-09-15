class JQueryCollection {
  constructor(collection) {
    this.collection = collection;
  }
  on(eventName, handlerFunction) {
    this.collection.forEach((element) => {
      element.addEventListener(eventName, handlerFunction);
    });
    return this;
  }
  off(eventName, eventHandler) {
    this.collection.forEach((element) => {
      element.removeEventListener(eventName, handlerFunction);
    });
    return this;
  }
  now() {
    return Date.now();
  }
  empty() {
    let chosenOne = this.collection[0];
    //as long as there are children -> remove
    while (chosenOne.firstChild) {
      chosenOne.removeChild(chosenOne.firstChild);
    }
  }
  find(selector) {
    this.collection = this.collection.querySelectorAll(selector);
    return this;
  }
  attr(attribute, number = 0) {
    if (number === 0) {
      return this.collection[0].getAttribute(attribute);
    } else {
      this.collection[0].setAttribute(attribute, number);
      return this;
    }
  }
  removeAttr(attribute) {
    this.collection[0].removeAttribute(attribute);
    return this;
  }
  css(...cssArguments) {
    //scenario where the strings are passed
    if (typeof cssArguments[0] === "string") {
      //"color", "red"
      const [property, value] = cssArguments;
      this.collection.forEach((element) => {
        element.style[property] = value;
      });

      //scenario where an object is passed
    } else if (typeof cssArguments[0] === "object") {
      //Object.entries -> basically all of the properties of an object
      const cssProps = Object.entries(cssArguments[0]);
      this.collection.forEach((element) => {
        cssProps.forEach(([property, value]) => {
          element.style[property] = value;
        });
      });
    }
    return this;
  }
  each(callback) {
    //iterate over all of the elements
    this.collection.forEach((element, i) => {
      //bind the function to the elements themselves
      const bindFn = callback.bind(element);
      //invoke the bound function for each element
      bindFn(element, i);
    });
    return this;
  }
  map(callback) {
    let arr = Array.from(this.collection);
    arr.map((element, i) => {
      const bindFn = callback.bind(element);
      bindFn(element, i);
    });
    return this;
  }
  html(html = null) {
    if (html) {
      this.collection.forEach((element) => {
        element.innerHTML = html;
      });
      return this;
    } else {
      return this.collection[0].innerHTML;
    }
  }
  prop(outerHTML) {
    return this.collection[0].outerHTML;
  }
  /**
   * original text() returns a string, not an array
   * array more manageable -> thus not returning strings
   */
  text(text = null) {
    if (text) {
      this.collection.forEach((element) => {
        element.textContent = text;
      });
    } else {
      let array = [];
      this.collection.forEach((element) => {
        array.push(element.textContent);
      });
      return array;
    }
  }
  hasClass(className) {
    return this.collection[0].classList.contains(className);
  }
  addClass(className) {
    this.collection.forEach((element) => {
      element.classList.add(className);
    });
  }
  removeClass(className) {
    this.collection.forEach((element) => {
      if (element.classList.contains(className))
        element.classList.remove(className);
    });
  }
  hide() {
    this.collection.forEach((element) => {
      element.style.display = "none";
    });
    return this;
  }
  show() {
    this.collection.forEach((element) => {
      element.style.display = "block";
    });
    return this;
  }
}

//Sets up the collection attaching all the properties onto it
const makeNewCollection = (collection) => {
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
};

const $ = (...arguments) => {
  //console.log(`These are the argmunets: `);
  arguments.forEach((el) => {
    //console.log(el);
  });

  //handle functions
  if (typeof arguments[0] === "function") {
    //document ready listener
    const readyFunction = arguments[0];
    document.addEventListener("DOMContentLoaded", readyFunction);

    /**
     * handle string
     * handle selection of:
     * classes
     * ids
     * element types
     */
  } else if (typeof arguments[0] === "string") {
    const selector = arguments[0];
    const collection = document.querySelectorAll(selector);
    const coll = new JQueryCollection(collection);

    return coll;

    /**
     * handle $(this)
     * bad code but it works
     * ask if the instane if an HTML
     */
  } else if (arguments[0] instanceof HTMLElement) {
    //console.log("HTML element");
    const collection = [arguments[0]];
    const coll = new JQueryCollection([arguments[0]]);
    return coll;

    //handle null selection
  } else if (!arguments[0]) {
    //console.log("Args are null");
    const coll = new JQueryCollection(arguments[0]);
    return coll;
  }
};
