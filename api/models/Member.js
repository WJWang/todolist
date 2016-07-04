import Sequelize from 'sequelize';
import bcrypt from 'bcryptjs';

export default function (sequelize) {
  const Member = sequelize.define('Member', {
    account: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Member.belongsToMany(models.Role, {
          through: 'MemberRoles',
        });
      },
    },

    instanceMethods: {
      validPassword(password) {
        return bcrypt.compareSync(password, this.password);
      },
    },

    hooks: {
      beforeCreate: (member) => {
        if (member.password) {
          const salt = bcrypt.genSaltSync(10);
          member.password = bcrypt.hashSync(member.password, salt);
        }

        return member;
      },
    },
  });

  return Member;
}
