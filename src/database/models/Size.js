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
        size: {
            type: dataTypes.STRING,
            allowNull: false
        }
    };
    let config = {
        tableName: 'sizes',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        paranoid: true,
        deletedAt: 'deleted_at'
    }
    const Size = sequelize.define(alias, cols, config);

    Size.associate = models => {
        Size.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'size_id'
        })
    };

    return Size
}