module.exports = (sequelize, dataTypes) => {
    let alias = 'Size';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        Size: {
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
    const Size = sequelize.define(alias, cols, config);

    Size.associate = models => {
        Size.hasMany(models.product, {
            as: 'products', 
            foreignKey: 'size_id'
        })
    };

    return Size
}