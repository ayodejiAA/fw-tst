import express, { json } from 'express';
import debug from 'debug';

import validateRule from './controllers/validateRule';
import {
  serverErrorHandler,
  notFoundErrorHandler
} from './middlewares';

const debugLog = debug('app:server');

const app = express();
app.use(json());

app.get('/', (_req, res) => res.status(200).json({
  message: 'My Rule-Validation API',
  status: 'success',
  data: {
    name: 'Ayodeji Afolabi',
    github: '@ayodejiaa',
    email: 'afolabiayodejia@gmail.com',
    mobile: '08100177435',
    twitter: '@dev_ayo'
  }
}));

app.post('/validate-rule', validateRule);
app.use(serverErrorHandler);
app.use(notFoundErrorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  debugLog('Application successfully started');
  debugLog(`Server running at http://localhost:${PORT}`);
});
