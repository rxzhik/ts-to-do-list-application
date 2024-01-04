import React, { useEffect, useRef, useState } from 'react'
import { Task } from '../data/database-brief'
import { deleteTask, editTask, moveTaskToDone } from '../data/taskRepo'
import { Button, ButtonGroup } from 'react-bootstrap'
import "./Card.css"
import { Draggable } from 'react-beautiful-dnd'

type Props = {
    task: Task,
    index: number,
    setUpdateTasks: React.Dispatch<React.SetStateAction<boolean>>
}

const Card: React.FC<Props> = ({task, index, setUpdateTasks}) => {

    const [edit, setEdit] = useState<boolean>(false)
    const [editInput, setEditInput] = useState<string>(task.content)
    const inputRef: React.MutableRefObject<null | HTMLInputElement> = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    const handleDeleteTask: (id: number | undefined)=> void = async (id) => {
        if(id){
          await deleteTask(id)
          setUpdateTasks((curr)=>!curr)
        }
    }

    const handleDoneTask: (id: number | undefined)=> void = async (id) => {
        if(id){
          await moveTaskToDone(id)
          setUpdateTasks((curr)=>!curr)
        }
    }

    const handleEditTask: (task: Task)=> void = async(task) => {
        await editTask({...task, content: editInput})
        setUpdateTasks((curr)=> !curr)
    }



    return (
        <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
            {
                (provided)=>(
                    <div 
                        className="card-modal"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}    
                    >
                    <form onSubmit={(event)=>{
                        event.preventDefault()
                        handleEditTask(task)
                        setEdit(false)
                        }}>
                        <span style={{fontSize: "2vw", fontWeight: "bold"}}>{task.title}</span>
                        <hr/>
                        {
                            edit?(
                                <div className="edit-mode">
                                <input ref={inputRef} className="edit-input" value={editInput} onChange={(e)=>{setEditInput(e.target.value)}}/>
                                <Button variant="dark" type="submit" className="submit-button">Submit</Button>
                                </div>
                            ):(
                                <>
                                    <p style={{fontSize: "20px"}}>{task.content}</p>
                                    <ButtonGroup size="sm" className="mb-2">
                                        {
                                            task.status?(
                                                <>
                                                    <Button variant="dark" onClick={(event)=>{
                                                        if (!edit && task.status) {
                                                            setEdit(!edit);
                                                        }
                                                    }}>
                                                    <span className="material-symbols-outlined">edit</span>
                                                    </Button>
                                                    <Button variant="dark">
                                                    <span className="material-symbols-outlined" onClick={() => handleDoneTask(task.id)}>done</span>
                                                    </Button>
                                                </>

                                            ):(
                                                null
                                            )
                                        }
                                        <Button variant={task.status?"dark":"danger"} onClick={() => handleDeleteTask(task.id)}>
                                        <span className="material-symbols-outlined">delete</span>
                                        </Button>
                                    </ButtonGroup>
                                </>
                            )
                        }
                    </form>
                    </div>
                )
            }
        </Draggable>
    )
}

export default Card