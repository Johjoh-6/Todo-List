import '../css/style.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import {projectSection, projectList, currentProject} from './project';

// const Project = require("./class");
// const List = require("./class");


const main = document.querySelector('#main');
projectSection();
projectList();

console.log(currentProject);


