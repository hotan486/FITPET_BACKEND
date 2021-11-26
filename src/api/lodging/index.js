import Router from 'koa-router';
import * as lodgingCtrl from './lodging.ctrl.js';

const lodging = new Router();

lodging.get('/list', lodgingCtrl.list);
lodging.get('/hitsList', lodgingCtrl.hitsList);
lodging.post('/register', lodgingCtrl.register);
lodging.get('/:id', lodgingCtrl.read);

export default lodging;