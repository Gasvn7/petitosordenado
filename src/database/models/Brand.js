
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
        },
        /*  created_at: dataTypes.TIMESTAMP,
         updated_at: dataTypes.TIMESTAMP, */
    };
    let config = {
        tableName: 'brands',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        paranoid: true,
        deletedAt: 'deleted_at'
    }
    const Brand = sequelize.define(alias, cols, config);

    Brand.associate = models => {
        Brand.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'brand_id'
        })
    };



    return Brand
}