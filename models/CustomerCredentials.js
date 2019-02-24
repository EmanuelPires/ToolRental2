module.exports = function(sequelize, DataTypes) {
  var CustomerCred = sequelize.define(
    "CustomerCredentials",
    {
      FK_customerID: DataTypes.INTEGER,
      UserName: DataTypes.STRING,
      Password: DataTypes.STRING
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  return CustomerCred;
};
