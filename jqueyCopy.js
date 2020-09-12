const $ = (...arguments) => {
  console.log(arguments);
  if (typeof arguments[0] === "function") {
    const readyFunction = arguments[0];
    document.addEventListener("DOMContentReady", readyFunction);
  }
};
