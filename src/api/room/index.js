import Router from 'koa-router';
import * as roomCtrl from './room.ctrl.js';

const room = new Router();

room.post('/register', roomCtrl.register);
room.get('/:id', roomCtrl.list);
// lodging.get('/:id', roomCtrl.read);

export default room;