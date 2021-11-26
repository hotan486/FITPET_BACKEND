import Router from 'koa-router';
import * as rentCarCtrl from './rentcar.ctrl.js';

const rentcar = new Router();

rentcar.get('/list', rentCarCtrl.list);
rentcar.get('/listRead/:kind', rentCarCtrl.listRead);
rentcar.get('/listNew', rentCarCtrl.listNew);
rentcar.get('/:id', rentCarCtrl.read);
rentcar.post('/register', rentCarCtrl.register);

export default rentcar;