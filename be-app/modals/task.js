module.exports = (db, DataTypes) => 
    db.sequelize.define("task",{
        taskID: {
            type: DataTypes.STRING(32),
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        content: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }

    },
    {
        tableName: 'task',
    })