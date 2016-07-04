import Sequelize from 'sequelize';


export default function (sequelize) {
  const Event = sequelize.define('Event', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM('completed', 'active', 'unfinished'),
      defaultValue: 'unfinished',
      allowNull: false,
    },
  }, {
    classMethods: {
      // associate: (models) => {
        // Event.belongsToMany(models.Role, {
        //   through: 'EventRoles',
        // });
      // },
    },

    instanceMethods: {
      // validPassword(password) {
      //   return bcrypt.compareSync(password, this.password);
      // },
    },

    hooks: {
      // beforeCreate: (member) => {
      //   if (member.password) {
      //     const salt = bcrypt.genSaltSync(10);
      //     member.password = bcrypt.hashSync(member.password, salt);
      //   }
      //
      //   return member;
      // },
    },
  });

  return Event;
}
