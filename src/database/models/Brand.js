module.exports = (sequelize, dataTypes) => {
    let alias = 'Brand';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        brand: {
            type: dataTypes.STRING,
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Brand = sequelize.define(alias, cols, config);

    Brand.associate = models => {
        Brand.hasMany(models.product, {
            as: 'products',
            foreignKey: 'brand_id'
        })
    };

    return Brand
}