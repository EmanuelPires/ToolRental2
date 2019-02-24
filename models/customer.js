module.exports = function(sequelize, DataTypes) {
  var CustomerCred = sequelize.define("CustomerCredentials", {
    FK_customerID: DataTypes.INTEGER,
    UserName: DataTypes.STRING,
    Password: DataTypes.STRING
  });
  return CustomerCred;
};
