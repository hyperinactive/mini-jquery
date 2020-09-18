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
  remove() {
    this.collection.forEach((element) => {
      element.parentNode.removeChild(element);
    });
    return this;
  }
  /**
   * Won't work when called the trad way $.contains
   * Has to be called $().contains
   */
  contains(element, child) {
    if (element.contains(child) && element !== child) {
      return true;
    } else return false;
  }
  parseJSON(string) {
    return JSON.parse(string);
  }
  parseHTML(string) {
    let tmp = document.implementation.createHTMLDocument();
    tmp.body.innerHTML = string;
    return tmp.body.children;
  }
  parent() {
    this.collection = this.collection[0].parentNode;
    return this;
  }
  siblings() {
    const element = this.collection[0];
    const parent = element.parentNode;
    const children = [...parent.children];
    const siblings = children.filter((child) => child !== element);
    this.collection = siblings;
    return this;
  }
  /**
   * Because node list is expected a fragment is made
   * Its children are to be returned as a node list
   */
  clone() {
    let fragment = document.createDocumentFragment();
    fragment.appendChild(this.collection[0].cloneNode(true));
    this.collection = fragment.childNodes;
    return this;
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
  slice(start, end) {
    this.collection = this.collection.slice(start, end);
    return this;
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
  //same treatment for html()
  html(html = null) {
    if (html) {
      this.collection.forEach((element) => {
        element.innerHTML = html;
      });
      return this;
    } else {
      let array = [];
      this.collection.forEach((element) => {
        array.push(element.innerHTML);
      });
      return array;
    }
  }
  append(child) {
    const element = document.querySelector(child);
    this.collection = this.collection[0].insertAdjacentElement(
      "afterend",
      element
    );
  }
  before(child) {
    const element = document.querySelector(child);
    this.collection = this.collection[0].insertAdjacentElement(
      "beforebegin",
      element
    );
  }
  after(child) {
    const element = document.querySelector(child);
    this.collection = this.collection[0].insertAdjacentElement(
      "afterend",
      element
    );
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
  toggleClass(className) {
    this.collection.forEach((element) => {
      element.classList.toggle(className);
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

//////////////////////////////////////////////////////////////////////////

const $ = (...arguments) => {
  //handle functions
  if (typeof arguments[0] === "function") {
    
    //document ready listener
    const readyFunction = arguments[0];
    document.addEventListener("DOMContentLoaded", readyFunction);

    //handle string selections
  } else if (typeof arguments[0] === "string") {
    const selector = arguments[0];
    const collection = document.querySelectorAll(selector);
    const coll = new JQueryCollection(collection);

    return coll;

    /**
     * handle $(this)
     * check for HTML element
     */
  } else if (arguments[0] instanceof HTMLElement) {
    const collection = [arguments[0]];
    const coll = new JQueryCollection([arguments[0]]);
    return coll;

    //handle null selection
  } else if (!arguments[0]) {
    const coll = new JQueryCollection(arguments[0]);
    return coll;
  }
};
