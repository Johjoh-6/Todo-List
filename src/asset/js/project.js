import {allProjects} from './index';
const section = document.querySelector('#project');
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
        div.appendChild(button);

        
    
});
const projectList = (()=>{
    const listProject = document.getElementById('list-project');
    console.log(allProjects[0]);
    for (let index = 0; index < allProjects.length; index++) {
        const div = document.createElement('div');
        div.classList.add('project-name');
        div.setAttribute('data-project', index);
        const p = document.createElement('p');
        p.innerText = allProjects[index].getTitle();
        div.appendChild(p);
        const i = document.createElement('i');
        i.classList.add('fas');
        i.classList.add('fa-trash');
        console.log(i);
        i.addEventListener('click', ()=>{
            console.log('delete');
            //allProjects.splice(allProjects.indexOf(index),1);
        });
        div.appendChild(i);
        listProject.insertAdjacentElement("afterbegin", div);
    }
});

export {projectSection, projectList} ;