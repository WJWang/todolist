import { Router } from 'express';
import debug from 'debug';
import GeneralError from '../../errors/General.js';

import {
  Event,
} from '../models/index.js';

const router = new Router();

router.get('/:status', async (req, res) => {
  const statusPara = req.params.status.toLowerCase();
  if (statusPara !== 'all' && statusPara !== 'active' && statusPara !== 'completed') {
    return res.json(new GeneralError.Parameter());
  }

  if (statusPara === 'all') {
    try {
      return res.json(await Event.findAll());
    } catch (e) {
      debug(e);
      return res.json(new GeneralError.Database());
    }
  } else {
    const eventResults = await Event.findAll({
      where: {
        status: statusPara,
      },
    });
    return res.json(eventResults);
  }
});

router.post('/', async (req, res) => {
  if(!req.body.name) {
    return res.json(new GeneralError.Parameter());
  }
  //TODO...
});


export default router;
