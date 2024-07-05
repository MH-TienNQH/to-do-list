import {v4} from "uuid";
const list = document.querySelector<HTMLUListElement>("#list")
const form = document.querySelector<HTMLFormElement>("#new-task-form")
const title = document.querySelector<HTMLInputElement>("#new-task-title")
const tasks : Task[] = loadTask()
tasks.forEach(addTask)

type Task =  {
    id: string
    title:string
    completed: boolean
    createAt: Date
}

form?.addEventListener("submit",e=>{
    e.preventDefault();

    if(title?.value == "" || title?.value == null)
        return
    const newTask : Task = {
        id: v4(),
        title: title.value,
        completed: false,
        createAt: new Date()
    }
    loadTask()
    addTask(newTask)
    saveTask()
    title.value= ""
})

function addTask(task: Task ){
    const item = document.createElement("li")
    const label = document.createElement("label")
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.addEventListener("change", () =>{
        task.completed = checkbox.checked
    })
    checkbox.checked = task.completed

    label.append(checkbox, task.title)
    item.append(label)
    list?.append(item)
    tasks.push(task)
}

function saveTask(){
    localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTask(): Task[] {
    const taskJson = localStorage.getItem("TASKS")
    if(!taskJson) 
        return []
    return JSON.parse(taskJson)
}