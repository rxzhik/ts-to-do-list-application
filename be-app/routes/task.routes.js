module.exports = (express, app) => {
    const controllers = require("../controllers/task.controllers")
    const router = express.Router()

    //createTask
    router.post("/createTask/:userID", controllers.createTask)

    //get all task
    router.get("/all-tasks/:userID", controllers.getAllTaskByUserID)

    //get active task
    router.get("/active-tasks/:userID", controllers.getActiveTaskByUserID)
    
    //get completed task
    router.get("/completed-tasks/:userID", controllers.getCompletedTaskByUserID)

    //delete task   
    router.delete("/delete/:taskID", controllers.deleteTaskbyTaskID)

    //edit task content
    router.put("/edit-content/:taskID", controllers.editTask)

    //change task status to false
    router.put("/edit-status/:taskID", controllers.editTaskStatusToFalse)

    //Add routes to server
    app.use("/api/tasks", router)
}