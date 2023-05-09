module.exports = (sequelize, dataTypes) => {

    let alias = 'User';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        surname: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        level_id: {
            type: dataTypes.INTEGER
        },
        image: {
            type: dataTypes.STRING
        },
        createdAt: {
            type: dataTypes.DATE
        },
        updatedAt: {
            type: dataTypes.DATE
        },
        deletedAt: {
            type: dataTypes.DATE
        }
    };

    let config = {
        tableName: 'users',
        timestamps: true,
        paranoid: true
    };

    const User = sequelize.define(alias, cols, config)

    User.associate = function(models) {
    User.belongsTo(models.Level,{
        foreignKey: 'level_id',
        as: 'level'
    })
    }
    

    return User;
}