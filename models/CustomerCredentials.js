module.exports = function(sequelize, DataTypes) {
  var CustomerCred = sequelize.define(
    "CustomerCredentials",
    {
      UserName: DataTypes.STRING,
      Password: DataTypes.STRING
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  CustomerCred.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    CustomerCred.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: false,
        name: 'FK_CustomerID'
      }
    });
  };
  return CustomerCred;
};
