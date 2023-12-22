import { Task, tasks } from "./database-brief";

//constants
const TASK_DATA: string = "task"

//localStorage Initialization
export const initTasks: () => void = ()=>{
    if(localStorage.getItem(TASK_DATA) !== null){
        return
    }else{
        localStorage.setItem(TASK_DATA, JSON.stringify(tasks))
    }
}

//gets all the tasks
export const getAllTasks: () => Promise<Task[]> = async () =>{

    const response: string | null = localStorage.getItem(TASK_DATA)
    
    if(response){
        return JSON.parse(response);
    }
    return [];
}


// get all the active Tasks
export const getActiveTasks: () => Promise<Task[]> = async ()=>{
    const response: string | null = localStorage.getItem(TASK_DATA)
    if(response){
        const all_tasks: Task[] = JSON.parse(response)
        //Temp Active Task
        const active_tasks: Task[] =  all_tasks.filter((task)=> task.status);
        return active_tasks
    }
    return []
}


//get all the completed tasks
export const getCompletedTasks: ()=> Promise<Task[]> = async ()=>{
    const response: string | null = localStorage.getItem(TASK_DATA)
    if(response){
        const all_tasks: Task[] = JSON.parse(response)
        //Temp Active Task
        const completed_tasks: Task[] =  all_tasks.filter((task)=> !task.status);
        return completed_tasks
    }
    return []
}

//adds a new task to the task database
export const addTask: (task: Task) => Promise<Task[]> = async (task) =>{
    const response: string | null = localStorage.getItem(TASK_DATA)
    if(response){
        const all_tasks: Task[] = JSON.parse(response)
        all_tasks.unshift(task)
        localStorage.setItem(TASK_DATA, JSON.stringify(all_tasks));
        return all_tasks
    }else{
        localStorage.setItem(TASK_DATA, JSON.stringify([task]));
        return [task]
    }
}

//delete a task
export const deleteTask: (id: number) => Promise<Task[] | Error> = async (id)=>{
    const response: string | null = localStorage.getItem(TASK_DATA)
    if(response){    
        const all_tasks: Task[] = JSON.parse(response)
        const new_all_tasks: Task[] = all_tasks.filter((task)=> task.id !== id)
        if(new_all_tasks.length !== all_tasks.length){
            localStorage.setItem(TASK_DATA, JSON.stringify(new_all_tasks))
            return new_all_tasks
        }
        return new Error(`There exists no element with id: ${id}}`)
    }
    return new Error('The database is empty')
}

//edit a task
export const editTask: (task: Task) => Promise<Task | Error> = async (task)=>{
    const response: string | null = localStorage.getItem(TASK_DATA)
    if(response){
        const all_tasks: Task[] = JSON.parse(response)
        const req_task: Task | undefined= all_tasks.find((curr_task) => curr_task.id === task.id)
        if(req_task){
            const new_task_list: Task[] = []
            all_tasks.forEach((curr_task)=> {
                if(curr_task.id !== task.id){
                    new_task_list.push(curr_task)
                }else{
                    new_task_list.push(task)
                }
            })
            localStorage.setItem(TASK_DATA, JSON.stringify(new_task_list))
        }
        return new Error(`There is no task with id: ${task.id}`)
    }
    return new Error('The database is empty')
}

export const moveTaskToDone: (id: number)=> Promise<void | Error> = async (id) => {
    const response: string | null = localStorage.getItem(TASK_DATA)
    if(response){
        const all_tasks: Task[] = JSON.parse(response)
        const req_task: Task | undefined= all_tasks.find((curr_task) => curr_task.id === id)
        if(req_task){
            const new_task_list: Task[] = []
            all_tasks.forEach((curr_task)=> {
                if(curr_task.id !== id){
                    new_task_list.push(curr_task)
                }else{
                    new_task_list.push({...curr_task, status: false})
                }
            })
            localStorage.setItem(TASK_DATA, JSON.stringify(new_task_list))
        }
        return new Error(`There is no task with id: ${id}`)
    }
    return new Error('The database is empty')
}   


