module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        name: {
            type: dataTypes.STRING,
            /*  allowNull: false */
        },
        price: {
            type: dataTypes.INTEGER,
            /*    allowNull: false */
        },
        quantity: {
            type: dataTypes.INTEGER,
            /* allowNull: false */
        },
        details: {
            type: dataTypes.STRING,
            /* allowNull: false */
        },
        image: {
            type: dataTypes.STRING,
            allowNull: true
        },
        brand_id: dataTypes.INTEGER,
        category_id: dataTypes.INTEGER,
        size_id: dataTypes.INTEGER,
    };
    let config = {
        tableName: 'products',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Product = sequelize.define(alias, cols, config);

    Product.associate = models => {
        Product.belongsTo(models.Category, {
            as: 'categories',
            foreignKey: 'category_id'
        });
        Product.belongsTo(models.Brand, {
            as: 'brands',
            foreignKey: 'brand_id'
        });
        Product.belongsTo(models.Size, {
            as: 'sizes',
            foreignKey: 'size_id'
        });
        Product.belongsToMany(models.Order, {
            as: 'orders',
            through: 'lineOrder',
            foreignKey: 'product_id',
            otherKey: 'order_id',
            timestamps: false
        });
    };

    return Product
}