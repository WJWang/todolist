import Sequelize from 'sequelize';

export default function (sequelize) {
  const Role = sequelize.define('Role', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Role.hasMany(models.RoleAction);
        Role.belongsToMany(models.Member, {
          through: 'MemberRoles',
        });
      },
    },
  });

  return Role;
}
