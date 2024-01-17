const {Sequelize, DataTypes} = require("sequelize")
const config = require("./config.js")

const db = {
    Op: Sequelize.Op
}

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.DIALECT
});

//Database Models
db.user =  require("../modals/user.js")(db, DataTypes);
db.task =  require("../modals/task.js")(db, DataTypes);

//Database Model Relationships
db.user.hasMany(db.task, {foreignKey: {name: "userID", allowNull: false}})
db.task.belongsTo(db.user, {foreignKey: {name: "userID", allowNull: false}})

//Sync option ot seed Data
db.sync = async () => {
    await db.sequelize.sync({force: false})

    //seed data functions
    await seedUserData()
    await seedTaskData()
    
}

async function seedUserData() {
    const count = await db.user.count();
    //Seed Data Only if Empty
    if(count > 0){
        return
    }

    const argon2 = require("argon2");

    let hash = await argon2.hash("1Rashik@#", { type: argon2.argon2id });
    const user1 = {
        userID: "U0001",
        username: "Rashik",
        email: "pommyraj@gmail.com",
        passwordHashed: hash
    }

    hash = await argon2.hash("1Kawish@#", {type: argon2.argon2id});
    const user2 = {
        userID: "U0002",
        username: "Kawish",
        email: "rajkawish@gmail.com",
        passwordHashed: hash
    }

    hash = await argon2.hash("1Abraham@#", {type: argon2.argon2id});
    const user3 = {
        userID: "U0003",
        username: "Abraham",
        email: "josephabraham@gmail.com",
        passwordHashed: hash
    }

    await db.user.bulkCreate([user1, user2, user3])
}

async function seedTaskData(){
    const count = await db.task.count();
    //Seed Data Only if Empty
    if(count > 0){
        return
    }

    const taskSeedData = [
        {taskID: "T0001", title: "Laundry", content: "Make sure to pick up clothes from the line", status: true, userID: "U0001"},
        {taskID: "T0002", title: "Dinner", content: "Make sure to pick up clothes from the line", status: true, userID: "U0001"},
        {taskID: "T0003", title: "Lunch", content: "Make sure to pick up clothes from the line", status: false, userID: "U0001"},
        {taskID: "T0004", title: "Gym", content: "Make sure to pick up clothes from the line", status: true, userID: "U0001"},
        {taskID: "T0005", title: "Coding", content: "Make sure to pick up clothes from the line", status: false, userID: "U0001"},
        {taskID: "T0006", title: "Youtube", content: "Make sure to pick up clothes from the line", status: true, userID: "U0001"},
    ]

    await db.task.bulkCreate(taskSeedData);
}

module.exports = db;