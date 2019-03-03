module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define(
    "Order",
    {
      OrderID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      OrderDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      PickUpDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      OrderCost: DataTypes.DECIMAL,
      OrderQuantity: DataTypes.INTEGER,
      PickUp: DataTypes.INTEGER
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  Order.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Order.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: false,
        name: "FK_CustomerID"
      }
    });
  };
  Order.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Order.belongsTo(models.Product, {
      foreignKey: {
        allowNull: false,
        name: "FK_ProductID"
      }
    });
  };
  return Order;
};
