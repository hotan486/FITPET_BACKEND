import Router from 'koa-router';
import * as rentCarCtrl from './rentcar.ctrl';

const rentcar = new Router();

rentcar.get('/list', rentCarCtrl.list);
rentcar.get('/:id', rentCarCtrl.read);
rentcar.post('/register', rentCarCtrl.register);

export default rentcar;