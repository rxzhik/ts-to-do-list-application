module.exports = (express, app) => {
    const controller = require("../controllers/user.controllers")
    const router = express.Router()

    //create a user
    router.post("/createUser", controller.createUser);

    //find a user
    router.get("/findUser", controller.findUser)

    //get all users
    router.get("/", controller.getAllUsers)

    //Add routes to server
    app.use("/api/users", router)
}