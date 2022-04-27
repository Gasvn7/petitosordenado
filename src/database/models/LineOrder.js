module.exports = (sequelize, dataTypes) => {
    let alias = 'LineOrder';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        product_id: dataTypes.INTEGER,
        order_id: dataTypes.INTEGER,
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const LineOrder = sequelize.define(alias, cols, config);

    LineOrder.associate = models => {
        LineOrder.belongsTo(models.product, {
            as: 'products',
            foreignKey: 'product_id'
        });
        LineOrder.belongsTo(models.order, {
            as: 'orders',
            foreignKey: 'order_id'
        });
    };

    return LineOrder
}