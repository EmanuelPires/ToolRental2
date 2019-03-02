module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define(
    "Customer",
    {
      CustomerID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Name: DataTypes.STRING,
      Phone: DataTypes.STRING,
      Street: DataTypes.STRING,
      City: DataTypes.STRING,
      State: DataTypes.STRING,
      Country: DataTypes.STRING,
      Zipcode: DataTypes.INTEGER
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  Customer.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Customer.hasMany(models.Order, {
      foreignKey: {
        allowNull: false,
        name: "FK_CustomerID"
      }
    });

    Customer.hasMany(models.Product, {
      foreignKey: {
        allowNull: false,
        name: "SupplierID"
      }
    });
  };
  return Customer;
};
