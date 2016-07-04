import express from 'express';
import db, {
  migrationData,
} from './models/index.js';
import debug from 'debug';
import bodyParser from 'body-parser';
import cors from 'cors';

// Routes
import AuthRouter, {
  aclInjector,
} from './routes/auth.js';

const debugServer = debug('ToDoList:Server');

// Sync Server
(async () => {
  try {
    await db.sync();
    await migrationData();
  } catch (e) {
    debugServer('Sync database failed:', e);
  }
})();

const PORT = process.env.PORT || 9910;
const NODE_ENV = process.env.NODE_ENV || 'development';
const app = express();

if (NODE_ENV !== 'production') {
  app.use(cors());
}

app.use(bodyParser.json());

// app.use('/auth', AuthRouter);

app.use(aclInjector);

app.listen(PORT, (err) => {
  if (err) {
    debugServer('Listen server on port %s error: %s', PORT, err);
  } else {
    debugServer('Server listen on port', PORT);
  }
});
