module.exports = function(sequelize, DataTypes) {
  var Product_Category = sequelize.define(
    "Product_Category",
    {
      ProductCategoryID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      CategoryName: DataTypes.STRING
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  return Product_Category;
};
