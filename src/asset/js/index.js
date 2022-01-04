import '../css/style.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

const main = document.querySelector('#main');
function component() {
    const element = document.createElement('div');
  element.setAttribute('id', 'try');
    element.innerHTML = 'Hello webpack';
  
    return element;
  }
  
  main.appendChild(component());