const db = require("../database/db")
const argon2 = require("argon2")
const moment = require("moment")


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @description get all the users 
 */
exports.getAllUsers = async (req, res) => {
    const users = await db.user.findAll({
        attributes: ['userID', 'username', 'email']
    });
    res.status(200).json(users)
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @description check if email is already in the
 * database or not.
 */
exports.createUser = async (req, res) => {
    const email = req.body.email;
    const user = await db.user.findOne({where: {
        email: email
    }})

    if(user === null){
        //hash the password
        const passwordHashed = await argon2.hash(req.body.password, {type: argon2.argon2id})
        //create user object
        const user = {
            userID: "U" + moment().format('YYMMDDHHmmsss'),
            username: req.body.username,
            email: req.body.email,
            passwordHashed: passwordHashed
        }
        //create user
        
        try{
            db.user.create(user)
            res.status(201).json({
                userID: user.userID
            })
        }catch(error){
            res.status(403).json({
                message: "Error in creating user"
            })
        }
    }else {
        res.status(403).json({
            message: "This email has already been registered with an account"
        })
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @description check if a user with given username and
 * password exists.
 */
exports.findUser = async (req, res)=> {
    const username = req.query.username
    const password = req.query.password

    const user = await db.user.findOne({where: {
        username: username
    }})


    if(user === null){
        res.status(404).json({
            message: `There are no users with the username: ${username}`
        })
    }else if((await argon2.verify(user.passwordHashed, password)) === false){
        const status = await argon2.verify(user.passwordHashed, password)

        res.status(403).json({
            message: `The given password for username: ${username} isn't correct`
        })
    }else{
        res.status(200).json({userID: user.userID})
    }
}