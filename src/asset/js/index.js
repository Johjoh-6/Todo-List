import '../css/style.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import {projectSection, projectList} from './project';
import {Project, List} from './class';

// const Project = require("./class");
// const List = require("./class");

let allProjects = [];
const main = document.querySelector('#main');
projectSection();
const listSection = document.querySelector('#list');

let project1 = new Project('Try', "new try with class");
let project2 = new Project('Try', "new try with class");
console.log(project1);  

let list1 = new List('box', 'lovely box', 2, '5/01/2022', false);
let list2 = new List('box', 'lovely box', 2, '5/01/2022', false);
project1.setList(list1);
project1.setList(list2);
console.log(project1);  

allProjects.push(project1);
allProjects.push(project2);
console.log(allProjects);
console.log(list1.getTitle());

projectList();


export {allProjects};