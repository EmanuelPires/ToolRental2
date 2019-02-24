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
  return Customer;
};
