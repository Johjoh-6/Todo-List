import {currentProject} from './project';
import { List } from './class';
const listSection = document.querySelector('#list');
const formTask = document.querySelector('#form-task');
const listOfTask = (() =>{
    listSection.innerHTML = '';
    listSection.innerHTML = `<div id="title-project">
    <h2>${currentProject.title}</h2>
    <p>${currentProject.description}</p>
    </div>
    <div id="list-from-project"></div>`;
    if (currentProject.list.length > 0){
        console.log(currentProject.list);
        const ListFromProject = document.getElementById('list-from-project');
        currentProject.list.forEach(element => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item-project');
            //itemDiv.classList.add('');
            
            const checkboxDiv = document.createElement('div');
            checkboxDiv.classList.add('checkbox');
            itemDiv.appendChild(checkboxDiv);
            checkboxDiv.addEventListener('click', ()=>{
                if(checkboxDiv.classList.contains('checkded')){
                    checkboxDiv.classList.remove('checkded');
                } else {
                    checkboxDiv.classList.add('checkded');
                }
            })


            const title = document.createElement('p');
            title.innerText = element.title;
            const description = document.createElement('p');
            description.innerText = element.description;
            const date = document.createElement('p');
            date.innerText = element.date;

            itemDiv.appendChild(title);
            itemDiv.appendChild(description);
            itemDiv.appendChild(date);


            const edit = document.createElement('div');
            const iEdit = document.createElement('i');
            iEdit.classList.add('fas');
            iEdit.classList.add('fa-edit');
            edit.appendChild(iEdit);
            edit.addEventListener('click', ()=>{
                console.log('edit');
    
                }
            );
            itemDiv.appendChild(edit);
            
            const deleteTask = document.createElement('div');
            const idelete = document.createElement('i');
            idelete.classList.add('fas');
            idelete.classList.add('fa-trash');
            deleteTask.appendChild(idelete);
                deleteTask.addEventListener('click', ()=>{
                    console.log('delete');
                    if (confirm('Are you sure to delete this task from this project ?') == true) {
                        console.log(currentProject.list.indexOf(element));
                        currentProject.list.splice(currentProject.list.indexOf(element),1);
                        listOfTask();
                    }
                } )
            itemDiv.appendChild(deleteTask);

                ListFromProject.appendChild(itemDiv);
    })
}
    const addTask = document.createElement('div');
    addTask.id = 'add-task';
    const textAdd = document.createElement('p');
    textAdd.innerText = 'Add task';
    addTask.appendChild(textAdd);
    listSection.insertAdjacentElement('beforeend', addTask);
    addTask.addEventListener('click', ()=>{
        showInputTask();
    });
    
})

function showInputTask(){
    console.log('add task');
    const modal = document.querySelector('#modal-task');
    
    const closeModal = document.querySelector('#close-modal-task');
    modal.style.display = "block";
   
    closeModal.addEventListener('click', ()=>{
        modal.style.display = "none";
    })
    window.addEventListener('click', (event) =>{
        if (event.target == modal) {
          modal.style.display = "none";
        }
      })
}

function addTasks(){
    const modal = document.querySelector('#modal-task');
    const btnAddTask = document.querySelector('#addmodal-task');
    btnAddTask.addEventListener('click', ()=>{
    let newTask = new List(formTask.title.value, formTask.description.value, formTask.priority.value, formTask.date.value);
    currentProject.list.push(newTask);
    formTask.reset();   
    listOfTask();
    modal.style.display = "none";
    console.log(currentProject.list);
})
};
function doneOrNot(e){
    if(e.classList.contains('checkded')){
        e.classList.remove('checkded');
    } else {
        e.classList.add('checkded');
    }
};
addTasks();

export {listOfTask};