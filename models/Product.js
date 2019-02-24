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
      SupplierID: DataTypes.INTEGER,
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
  return Product;
};
