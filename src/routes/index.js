import express from 'express';

import user from './user';
import role from './role';
import login from './login';
import permission from './permission';

const app = express();

app.use('/user', user);
app.use('/role', role);
app.use('/login', login);
app.use('/permission', permission);

export default app;
