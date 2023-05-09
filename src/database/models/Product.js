module.exports = (sequelize, dataTypes) => {

    let alias = 'Product';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.DECIMAL
        },
        discount: {
            type: dataTypes.INTEGER
        },
        description: {
            type: dataTypes.TEXT
        },
        image: {
            type: dataTypes.STRING
        },
        category_id: {
            type: dataTypes.INTEGER
        },
        createdAt: {
            type: dataTypes.DATE
        },
        user_created: {
            type: dataTypes.STRING
        },
        updatedAt: {
            type: dataTypes.DATE
        },
        deletedAt: {
            type: dataTypes.DATE
        }
    };

    let config = {
        tableName: 'products',
        timestamps: true,
        paranoid: true
    };

    const Product = sequelize.define(alias, cols, config)

    Product.associate = function(models) {
        Product.belongsTo(models.Category,{
            foreignKey: 'category_id',
            as: 'category'
        })
    }

    return Product;
}