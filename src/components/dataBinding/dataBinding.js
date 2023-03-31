import './dataBinding.scss'

export default class dataBinding {
  constructor(element) {
    this.element = element
  }

  async init() {
    const response = await fetch('components/dataBinding/dataBinding.html');
    const dataBindinghtml = await response.text();
    this.element.innerHTML = dataBindinghtml;


    (function () {
      var elements = document.querySelectorAll('[data-tw-bind]'),
        scope = {};
      elements.forEach(function (element) {
        //execute scope setter
        if (element.type === 'text' || element.type === 'textarea') {
          var propToBind = element.getAttribute('data-tw-bind');
          addScopeProp(propToBind);
          element.onkeyup = function () {
            scope[propToBind] = element.value;
          }
        };

        //bind prop to elements
        function addScopeProp(prop) {
          //add property if needed
          if (!scope.hasOwnProperty(prop)) {
            //value to populate with newvalue
            var value;
            Object.defineProperty(scope, prop, {
              set: function (newValue) {
                value = newValue;
                elements.forEach(function (element) {
                  //change value to binded elements
                  if (element.getAttribute('data-tw-bind') === prop) {
                    if (element.type && (element.type === 'text' ||
                      element.type === 'textarea')) {
                      element.value = newValue;
                    }
                    else if (!element.type) {
                      element.innerHTML = newValue;
                    }
                  }
                });
              },
              get: function () {
                return value;
              },
              enumerable: true
            });
          }
        }
      });
    })();
  }
}
