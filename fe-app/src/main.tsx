import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { initTasks } from './data/taskRepo.tsx';
// import { initUsers } from './data/userRepo.tsx';


//initializing the localStorage
initTasks();
// initUsers();

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)
