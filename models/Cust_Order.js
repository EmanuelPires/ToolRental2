module.exports = function(sequelize, DataTypes) {
  var Cust_Order = sequelize.define(
    "Cust_Order",
    {
      Cust_Order_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      FK_CustomerID: DataTypes.INTEGER,
      FK_OrderID: DataTypes.INTEGER
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  return Cust_Order;
};
