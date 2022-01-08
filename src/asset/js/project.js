
import { listOfTask } from './list';
import {Project} from './class';

let allProjects = [];
const formProject = document.querySelector('#form-project');
const section = document.querySelector('#project');
let currentProject = {};
const projectSection = (() => {
        let title = document.createElement('h2');
        section.appendChild(title);
        title.innerText = 'Project';
  
        let div = document.createElement('div');
        div.id = 'list-project';
        section.appendChild(div);

        let button = document.createElement('button');
        button.id = 'add-project';
        button.innerText = 'Add project';
        section.appendChild(button);
        button.addEventListener('click', ()=>{
            showInputProject();
        });
        addProject();
        
});
const projectList = (()=>{
    const listProject = document.getElementById('list-project');
    listProject.innerHTML = '';
    for (let index = 0; index < allProjects.length; index++) {
        const div = document.createElement('div');
        div.classList.add('project-name');
        div.setAttribute('data-project', index);
        const p = document.createElement('p');
        p.innerText = allProjects[index].getTitle();
        div.appendChild(p);
        div.addEventListener('click', ()=>{
            console.log('show project');
            currentProject = allProjects[index];
                listOfTask();
        })
        const divI = document.createElement('div');
        const i = document.createElement('i');
        i.classList.add('fas');
        i.classList.add('fa-trash');
        divI.appendChild(i)
        divI.addEventListener('click', ()=>{
            console.log('delete');
            if (confirm('Are you sure to delete this project ?') == true) {
                allProjects.splice(index,1);
                projectList();
            } 
        });
        div.appendChild(divI);
        listProject.insertAdjacentElement("afterbegin", div);
    }
});

function showInputProject(){
    console.log('add');
    const modal = document.querySelector('#modal-project');
    
    const closeModal = document.querySelector('#close-modal-project');
    modal.style.display = "block";
   
    closeModal.addEventListener('click', ()=>{
        modal.style.display = "none";
    })
    window.addEventListener('click', (event) =>{
        if (event.target == modal) {
          modal.style.display = "none";
        }
      })
};
function addProject(){
    const modal = document.querySelector('#modal-project');
    const btnAddProject = document.querySelector('#addmodal-project');
    btnAddProject.addEventListener('click', ()=>{
    let newProject = new Project(formProject.title.value, formProject.description.value);
    allProjects.push(newProject);
    formProject.reset();   
    projectList();
    modal.style.display = "none";
    console.log(allProjects);
})
};

export {projectSection, projectList, currentProject} ;