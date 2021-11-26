import Router from 'koa-router';
import auth from './auth/index.js';
import lodging from './lodging/index.js';
import room from './room/index.js';
import rentcar from './rentcar/index.js';

const api = new Router();

api.use('/auth', auth.routes());
api.use('/lodging', lodging.routes());
api.use('/room', room.routes());
api.use('/rentcar', rentcar.routes());

// 라우터를 내보냅니다.
export default api;