module.exports = (db, DataTypes) => 
    db.sequelize.define("user",{
        userID: {
            type: DataTypes.STRING(32),
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true,
            isEmail: true,
            validate: {
                is: /^[\S][a-zA-Z0-9]*@[a-zA-Z0-9]+(?!.*\.\.)(?!.*\.$)\.[a-zA-Z0-9\.]+$/
            }
        },
        passwordHashed:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'user',
    })