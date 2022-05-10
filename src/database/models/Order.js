module.exports = (sequelize, dataTypes) => {
    let alias = 'Order';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        Status: dataTypes.ENUM('carrito', 'creada', 'procesando', 'cancelada', 'completa'),
        date: {
            type: dataTypes.DATE
        },
        user_id: dataTypes.INTEGER,
    };
    let config = {
        tableName: 'orders',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        paranoid: true,
        deletedAt: 'deleted_at'
    }
    const Order = sequelize.define(alias, cols, config);

    Order.associate = models => {
        Order.belongsTo(models.User, {
            as: 'users',
            foreignKey: 'user_id',
        });
        Order.belongsToMany(models.Product, {
            as: 'products',
            through: 'lineOrder',
            foreignKey: 'order_id',
            otherKey: 'product_id',
            timestamps: false
        });
    };

    return Order
}