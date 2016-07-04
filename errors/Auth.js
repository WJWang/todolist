var util = require('util');

var NotMatch = function (data) {
  this.name = 'NotMatchError';
  this.message = data || 'Password Not Match';
  this.code = 400;
};

util.inherits(NotMatch, Error);

var ExpiredToken = function (data) {
  this.name = 'ExpiredTokenError';
  this.message = data || 'Token Expired';
  this.code = 400;
};

util.inherits(ExpiredToken, Error);

var AccountExisted = function (data) {
  this.name = 'AccountExistedError';
  this.message = data || 'Account Existed';
  this.code = 401;
};

util.inherits(AccountExisted, Error);

var Permission = function (data) {
  this.name = 'PermissionDeny';
  this.message = data || 'Can not access.';
  this.code = 400;
};

util.inherits(Permission, Error);

module.exports = {
  NotMatch: NotMatch,
  ExpiredToken: ExpiredToken,
  AccountExisted: AccountExisted,
  Permission: Permission
};
