import React, { useState, useEffect } from 'react'
import SearchBar from '../components/AddTaskBar'
import { Task } from '../data/database-brief';
import { deleteTask, getActiveTasks, getCompletedTasks, moveTaskToDone } from '../data/taskRepo';
import { Button, ButtonGroup, Card, Container } from 'react-bootstrap';
import "./Home.css"
import logo from "../assets/logo.png"

const Home = () => {

  const [activeTask, setActiveTask] = useState<Task[] | null>(null);
  const [completedTask, setCompletedTask] = useState<Task[] | null>(null);
  const [updateTasks, setUpdatTasks] = useState(true);

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

  const handleDeleteTask: (id: number | undefined)=> void = async (id) => {
    if(id){
      await deleteTask(id)
      setUpdatTasks((curr)=>!curr)
    }
  }

  const handleDoneTask: (id: number | undefined)=> void = async (id) => {
    if(id){
      await moveTaskToDone(id)
      setUpdatTasks((curr)=>!curr)
    }
  }

  //TODO: edit task

  return (
    <>
      {/* modal */}
      <div className="bg-modal">
        <div className="modal-content">
          Hello
        </div>
      </div>

      <div className="form-section">
        <Container
          className="d-flex justify-content-center align-items-center px-0"
          style={{ height: '25vh' }}
        >
          <SearchBar updateTask = {setActiveTask} />
        </Container>
      </div>
      <div className="task-list-section">
        <Container>
        <div className='both-task-list'>
          <div className="active-task-list">
            <h1 style={{fontWeight: "bold", color: "#fffff4"}}>Active Tasks</h1>
            {activeTask !== null ? (
              activeTask.map((task: Task) => (
                <Card key={task.id} className="task-card">
                  <Card.Body>
                    <Card.Title style={{fontSize: "2vw"}}>{task.title}</Card.Title>
                    <Card.Text style={{fontSize: "20px"}}>{task.content}</Card.Text>
                    <ButtonGroup size="sm" className="mb-2">
                      <Button variant="dark">
                        <span className="material-symbols-outlined">edit</span>
                      </Button>
                      <Button variant="dark" onClick={() => handleDeleteTask(task.id)}>
                        <span className="material-symbols-outlined">delete</span>
                      </Button>
                      <Button variant="dark">
                        <span className="material-symbols-outlined" onClick={() => handleDoneTask(task.id)}>done</span>
                      </Button>
                    </ButtonGroup>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <div>Loading Tasks</div>
            )}
          </div>

          <div className="completed-task-list">
            <h1 style={{fontWeight: "bold", color: "#f9f1f1"}}>Completed Tasks</h1>
            {completedTask !== null ? (
              completedTask.map((task: Task) => (
                <Card key={task.id} className="task-card">
                  <Card.Body>
                    <Card.Title style={{fontSize: "2vw"}}>{task.title}</Card.Title>
                    <Card.Text style={{fontSize: "20px"}}>{task.content}</Card.Text>
                    <ButtonGroup size="sm" className="mb-2">
                      <Button variant="danger" onClick={() => handleDeleteTask(task.id)}>
                        <span className="material-symbols-outlined">delete</span>
                      </Button>
                    </ButtonGroup>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <div>Loading Tasks</div>
            )}
          </div>
        </div>
        </Container>
      </div >
    </>
  )
}

export default Home