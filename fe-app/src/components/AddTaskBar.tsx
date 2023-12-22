import React, {useState} from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { addTask } from '../data/taskRepo';
import { Task } from '../data/database-brief';
import { format } from 'date-fns';

interface AddTaskBarProps{
  updateTask: React.Dispatch<React.SetStateAction<Task[] | null>>
}

const AddTaskBar: React.FC<AddTaskBarProps> = (props) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const {updateTask} = props;


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    if(form.checkValidity()){
      //Add Task here ot the Active Task List here
      const new_task: Task = {
        title: title,
        content: content,
        status: true
      }
      updateTasks(new_task);
    }
  };

  const updateTasks: (new_task: Task)=> void = async (new_task)=>{
    new_task.id = Number(format(new Date(), 'yyyyMMddmmss'))
    const new_tasks: Task[] = await addTask(new_task);
    updateTask(new_tasks);
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Control
              required
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e)=> setTitle(e.target.value)}
              size='lg'
              style={{ width: '30vw' }} 
            />
            <Form.Control.Feedback type="invalid" >Task title is required</Form.Control.Feedback>
        </Col>
        <Col>
          <Form.Control
              required
              type="text"
              placeholder="Content"
              value={content}
              onChange={(e)=> setContent(e.target.value)}
              size='lg'
              style={{ width: '25vw' }} 
            />
              <Form.Control.Feedback type="invalid" >Task Content is required.</Form.Control.Feedback>
        </Col>
        <Col>
          <Button type="submit" size='lg' variant="dark" style={{width: "10vw"}}>
            Create Task
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default AddTaskBar