import React, {useState} from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { addTask } from '../data/taskRepo';
import { Task } from '../data/database-brief';
import { format } from 'date-fns';
import "./AddTaskBar.css"

interface AddTaskBarProps{
  updateTask: React.Dispatch<React.SetStateAction<boolean>>
}

const AddTaskBar: React.FC<AddTaskBarProps> = (props) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const {updateTask} = props;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //TODO: Figure out whats wrong with event.preventDefault()
    //Suggestion: Use a custom Form don't use bootstrap
    //use tailwindcss instead.
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    if(form.checkValidity()){
      //Add Task here ot the Active Task List here
      const new_task: Task = {
        id: Number(format(new Date(), 'yyyyMMddmmss')),
        title: title,
        content: content,
        status: true
      }
      
      updateTasks(new_task);
    }
  };

  const updateTasks: (new_task: Task)=> void = async (new_task)=>{
    await addTask(new_task);
    updateTask((curr)=>!curr)
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="add-task-form">
      <div className='add-task-form-container
      '>
        <Form.Control
            required
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            size='lg'
            className="title-input"
          />
        <Form.Control.Feedback type="invalid" >Task title is required</Form.Control.Feedback>

        <Form.Control
            required
            type="text"
            placeholder="Content"
            value={content}
            onChange={(e)=> setContent(e.target.value)}
            size='lg'
            className="content-input"
          />
          <Form.Control.Feedback type="invalid" >Task Content is required.</Form.Control.Feedback>
        <Button type="submit" size='lg' variant="dark"  className="add-task-form-button">
          Create Task
        </Button>
      </div>
    </Form>
  )
}

export default AddTaskBar