module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define(
    "Product",
    {
      ProductID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Product_Name: DataTypes.STRING,
      UnitPrice: DataTypes.FLOAT,
      UnitsInStock: DataTypes.INTEGER,
      UnitsOnOrder: DataTypes.INTEGER,
      Availability: DataTypes.INTEGER,
      Image: DataTypes.STRING
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  Product.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Product.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: false,
        name: 'SupplierID'
      }
    });
    Product.hasMany(models.Order, {
      foreignKey: {
        allowNull: false,
        name: 'FK_ProductID'
      }
    });
    Product.belongsTo(models.Product_Category, {
      foreignKey: {
        allowNull: false,
        name: 'FK_CategoryID'
      }
    });
  };
  return Product;
};
