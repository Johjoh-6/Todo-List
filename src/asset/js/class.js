export class Project{
    constructor(
        title,
        description,
        list
    ){
        this.title = title;
        this.description = description;
        this.list = [];
    }
    getTitle() {
        return this.title;
    }
    setTitle(title){
        this.title = title;
    }
    getDescription() {
        return this.description;
    }
    setDescription(description){
        this.description = description;
    }
    getList(){
        return this.list;
    }
    setList(newList){
        this.list.push(newList);
    }
}
export class List {
    constructor(
        title,
        description,
        priority,
        date,
        done,
    ){
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.date = date;
        this.done = done;
    }
    getTitle() {
        return this.title;
    }
    setTitle(title){
        this.title = title;
    }
    getDescription() {
        return this.description;
    }
    setDescription(description){
        this.description = description;
    }
    getPriority() {
        return this.priority;
    }
    setPriority(priority){
        this.priority = priority;
    }
    getDate() {
        return this.date;
    }
    setDate(date){
        this.date = date;
    }
    getDone() {
        return this.done;
    }
    setDone(done){
        this.done = done;
    }

}
