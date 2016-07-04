import Sequelize from 'sequelize';
import debug from 'debug';
import Promise from 'bluebird';

import MemberModel from './Member.js';
import RoleModel from './Role.js';
import RoleActionModel from './RoleAction.js';

const debugDB = debug('YiGuang:Database');

debugDB('Loading Models...');

const YIGUANG_DB = process.env.YIGUANG_DB || 'mariadb://rytass:rytass2O15@localhost/yiguang';
const RESET_DB = process.env.RESET_DB || false;

export const sequelize = new Sequelize(YIGUANG_DB, {
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

export const Member = new MemberModel(sequelize);
export const Role = new RoleModel(sequelize);
export const RoleAction = new RoleActionModel(sequelize);

Member.associate(sequelize.models);
Role.associate(sequelize.models);
RoleAction.associate(sequelize.models);

export function migrationData() {
  return new Promise(async (resolve, reject) => {
    if (!RESET_DB) {
      return resolve();
    }

    try {
      await Member.create({
        account: process.env.ADMIN_ACCOUNT || 'admin',
        password: process.env.ADMIN_PASSWORD || 'admin',
        name: process.env.ADMIN_NAME || 'Rytass',
        phone: process.env.ADMIN_PHONE || '0988111111',
      });

      return resolve();
    } catch (e) {
      return reject(e);
    }
  });
}
