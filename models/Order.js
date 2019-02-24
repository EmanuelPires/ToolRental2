module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define(
    "Order",
    {
      OrderID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      FK_ProductID: DataTypes.INTEGER,
      OrderDate: DataTypes.DATE,
      PickUpDate: DataTypes.DATE,
      OrderCost: DataTypes.DECIMAL,
      OrderQuantity: DataTypes.INTEGER,
      PickUp: DataTypes.INTEGER
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  return Order;
};
