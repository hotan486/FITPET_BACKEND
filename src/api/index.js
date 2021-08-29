import Router from 'koa-router';
import auth from './auth';
import lodging from './lodging';
import room from './room';
import rentcar from './rentcar';

const api = new Router();

api.use('/auth', auth.routes());
api.use('/lodging', lodging.routes());
api.use('/room', room.routes());
api.use('/rentcar', rentcar.routes());

// 라우터를 내보냅니다.
export default api;