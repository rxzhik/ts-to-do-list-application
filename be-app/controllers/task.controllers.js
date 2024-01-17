const db = require("../database/db")
const argon2 = require("argon2")
const moment = require("moment")

//get all task by user ID
exports.getAllTaskByUserID = async (req, res) => {
    const userID = req.params.userID;
    console.log(userID)
    const allTasks = await db.task.findAll({where: {
        userID: userID
    }})
    res.status(200).json(allTasks)
}
//get completed task by user ID
exports.getCompletedTaskByUserID = async (req, res) => {
    const userID = req.params.userID;
    const allTasks = await db.task.findAll({where: {
        userID: userID,
        status: false
    }})
    res.status(200).json(allTasks)
}
//get active task by user ID
exports.getActiveTaskByUserID = async (req, res) => {
    const userID = req.params.userID;
    const allTasks = await db.task.findAll({where: {
        userID: userID,
        status: true
    }})
    res.status(200).json(allTasks)
}

//add task
exports.createTask = async (req, res) => {
    const userID = req.params.userID;
    const task = {
        taskID: "T" + moment().format('YYMMDDHHmmsss'),
        title: req.body.title,
        content: req.body.content,
        status: req.body.status,
        userID: userID
    }

    try{
        await db.task.create(task)
        res.status(201).json(task)
    }catch(error){
        res.status(403).json({
            message: "Error in creating task"
        })
    }
}

//delete task
exports.deleteTaskbyTaskID = async (req, res) => {
    const taskID = req.params.taskID

    const task = await db.task.findOne({
        where: {
            taskID: taskID
        }
    })

    if(task !== null){
        try {
            await db.task.destroy({
                where: {
                    taskID: taskID
                }
            })
            res.status(204)
        }catch (error){
            res.status().json({
                message: `ERROR in deleting the task with task id: ${taskID}`
            })
        }
    }else{
        res.status(404).json({
            message: `Task with id ${taskID} doesn't exist`
        })
    }
}

//edit task
exports.editTask = async (req, res) => {
    const taskID = req.params.taskID
    const task = await db.task.findOne({
        where: {
            taskID: taskID
        }
    })
    if(task !== null){
        const task = {
            content: req.body.content
        }

        try{
            await db.task.update(task, {
                where: {
                    taskID: taskID
                }
            })
            res.status(204).send()
        }catch(error){
            res.status(400).json({
                message: "Error in editing the task"
            })
        }
    }else{
        res.status(404).json({
            message: "Task not Found"
        })
    }
}

//move task to done (Could use edit task for this one)
exports.editTaskStatusToFalse = async (req, res) => {
    const taskID = req.params.taskID
    const task = await db.task.findOne({
        where: {
            taskID: taskID
        }
    })
    if(task !== null){
        const task = {
            status: false
        }

        try{
            await db.task.update(task, {
                where: {
                    taskID: taskID
                }
            })
            //don't forget the send() function here
            res.status(204).send()
        }catch(error){
            res.status(400).json({
                message: "Error in editing the task status to false"
            })
        }
    }else{
        res.status(404).json({
            message: "Task not Found"
        })
    }
}