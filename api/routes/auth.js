import { Router } from 'express';
import RouteKeeper from 'express-route-keeper';
import debug from 'debug';
import jwt from 'jsonwebtoken';
import {
  Member,
  Role,
  RoleAction,
} from '../models/index.js';

const JWT_TOKEN = process.env.JWT_TOKEN || '_YiGuang*Rytass$';
const debugACL = debug('YiGuang:ACL');

const keeper = new RouteKeeper();
const router = new Router();

router.post('/login', keeper({
  account: String,
  password: String,
}), async (req, res) => {
  const member = await Member.findOne({
    where: {
      account: req.body.account,
    },
    include: [{
      model: Role,
      required: false,
      attributes: [
        'name',
      ],
      include: [{
        model: RoleAction,
        required: false,
        attributes: [
          'action',
        ],
      }],
    }],
  });

  if (!member) {
    res.status(401);
    res.json({
      message: 'Resource not found',
    });
  }

  if (member.validPassword(req.body.password)) {
    const memberActions = [];
    member.Roles.forEach((role) => {
      role.RoleActions.forEach((roleAction) => memberActions.push(roleAction.action));
    });

    const tokenPayload = {
      id: member.id,
      account: member.account,
      name: member.name,
      phone: member.phone,
      roles: member.Roles.map((role) => role.name),
      actions: memberActions,
    };

    res.json({
      accessToken: jwt.sign(tokenPayload, JWT_TOKEN, {
        expiresIn: '14d',
      }),
      ...tokenPayload,
    });
  } else {
    res.status(401);
    res.json({
      message: 'Password invalid.',
    });
  }
});

export default router;

export async function aclInjector(req, res, next) {
  const jwtToken = req.headers.authorization;
  req.tokenPayload = {};

  if (jwtToken) {
    jwt.verify(jwtToken.replace(/^Bearer\s/, ''), JWT_TOKEN, async (err, payloads) => {
      if (err) {
        debugACL(err);

        req.aclActions = [];
        next();
      } else {
        req.aclActions = payloads.actions;
        req.tokenPayload = payloads;
        next();
      }
    });
  } else {
    req.aclActions = [];
    next();
  }
}
