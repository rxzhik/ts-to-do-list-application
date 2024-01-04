import React, { useState, useEffect } from 'react'
import SearchBar from '../components/AddTaskBar'
import { Task } from '../data/database-brief';
import { getActiveTasks, getCompletedTasks, moveTaskToDone } from '../data/taskRepo';
import { Container } from 'react-bootstrap';
import "./Home.css"
import Card from '../components/Card';
import {DragDropContext, DropResult, Droppable} from 'react-beautiful-dnd';
const Home = () => {

  const [activeTask, setActiveTask] = useState<Task[] | null>(null);
  const [completedTask, setCompletedTask] = useState<Task[] | null>(null);
  const [updateTasks, setUpdateTasks] = useState(true);

  useEffect(() => {
    const getTasks: () => void = async () => {
      //request for active tasks
      //use await
      const active_tasks: Task[] = await getActiveTasks();
      setActiveTask(active_tasks);

      //request for completed tasks
      //use await
      const completed_tasks: Task[] = await getCompletedTasks()
      setCompletedTask(completed_tasks);

    }
    getTasks()
  }, [updateTasks])


  const onDragEnd = (result: DropResult)=> {
    const {source, destination} = result;

    if(!destination) return;

    if(destination.droppableId === source.droppableId && source.index === destination.index ) return;
    
    if(source.droppableId === "ActiveList") {
      if(destination.droppableId === "CompletedList"){
        if(activeTask){
          handleTaskDropOnCT(activeTask[source.index].id)
        }
      }

      if(destination.droppableId === "ActiveList"){
        //This only happends in the frontend the database isn't changed here:
        shiftActiveTasks(source.index, destination.index)
      }
    }
  }

  //When a task is picked from Active Task and dropped in Completed Task(CT)
  const handleTaskDropOnCT: (id: number)=> void = async (id) => {
    if(id){
      await moveTaskToDone(id)
      setUpdateTasks((curr)=>!curr)
    }
  }

  const shiftActiveTasks = (initialIndex: number, finalIndex: number) => {
    let active = activeTask
    if(active){
      let taskToMove = active.splice(initialIndex, 1)
      active.splice(finalIndex, 0, taskToMove[0])
      setActiveTask(active)
    }
  }

  return (
    <>
      <div className="form-section">
        <Container
          className="d-flex justify-content-center align-items-center px-0"
          style={{ height: '25vh' }}
        >
          <SearchBar updateTask = {setUpdateTasks} />
        </Container>
      </div>
      <div className="task-list-section">
        <Container>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className='both-task-list'>
            <Droppable droppableId='ActiveList'>
              {
                (provided)=>{
                  return(
                    <div className="active-task-list" ref={provided.innerRef} {...provided.droppableProps}>
                      <h1 style={{fontWeight: "bold", color: "#fffff4"}}>Active Tasks</h1>
                      {activeTask !== null ? (
                        activeTask.map((task: Task, index: number) => (
                          <Card task={task} index={index} setUpdateTasks={setUpdateTasks}/>
                        ))
                      ) : (
                        <div>Loading Active Tasks</div>
                      )}
                      {provided.placeholder}
                    </div>
                  )
                }
              }
            </Droppable>
            <Droppable droppableId='CompletedList'>
              {
                (provided)=>{
                  return(
                    <div className="completed-task-list" ref={provided.innerRef} {...provided.droppableProps}>
                      <h1 style={{fontWeight: "bold", color: "#f9f1f1"}}>Completed Tasks</h1>
                      {completedTask !== null ? (
                        completedTask.map((task: Task, index: number) => (
                          <Card task={task} index={index} setUpdateTasks={setUpdateTasks}/>
                        ))
                      ) : (
                        <div>Loading Completed Tasks</div>
                      )}
                      {provided.placeholder}
                    </div>
                  )
                }
              }
            </Droppable>
          </div>
        </DragDropContext>
        </Container>
      </div >
    </>
  )
}

export default Home