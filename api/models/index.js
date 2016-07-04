import Sequelize from 'sequelize';
import debug from 'debug';
import Promise from 'bluebird';

// import MemberModel from './Member.js';
// import RoleModel from './Role.js';
// import RoleActionModel from './RoleAction.js';
import EventModel from './Event.js';

const debugDB = debug('ToDoList:Database');

debugDB('Loading Models...');

const TODOLIST_DB = process.env.TODOLIST_DB || 'mysql://root:root@localhost:8889/todolist';
const RESET_DB = process.env.RESET_DB || true;

export const sequelize = new Sequelize(TODOLIST_DB, {
  sync: {
    force: !!RESET_DB,
  },
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
  timezone: '+08:00',
});

export default sequelize;

export const Event = new EventModel(sequelize);
// export const Role = new RoleModel(sequelize);
// export const RoleAction = new RoleActionModel(sequelize);

// Member.associate(sequelize.models);
// Role.associate(sequelize.models);
// EventModel.associate(sequelize.models);

export function migrationData() {
  return new Promise(async (resolve, reject) => {
    if (!RESET_DB) {
      return resolve();
    }

    try {
      await Event.create({
        name: 'TEST INIT',
      });

      return resolve();
    } catch (e) {
      return reject(e);
    }
  });
}
