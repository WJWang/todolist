import Sequelize from 'sequelize';

export const CREATE_MEMBER = 'CREATE_MEMBER';
export const ASSIGN_MEMBER_ROLE = 'ASSIGN_MEMBER_ROLE';

export default function (sequelize) {
  const RoleAction = sequelize.define('RoleAction', {
    action: {
      type: Sequelize.ENUM(
        CREATE_MEMBER,
        ASSIGN_MEMBER_ROLE,
      ),
      allowNull: false,
    },
  }, {
    indexes: [{
      unique: true,
      fields: [
        'action',
        'RoleId',
      ],
    }],
    classMethods: {
      associate: (models) => {
        RoleAction.belongsTo(models.Role);
      },
    },
  });

  return RoleAction;
}
