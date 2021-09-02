require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import jwtMiddleware from './lib/jwtMiddleware';

import serve from 'koa-static';
import mount from 'koa-mount';

const {PORT, MONGO_URI} = process.env;

mongoose
.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(e => {
  console.error(e);
});

import api from './api';

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use('/api', api.routes()); // api 라우트 적용

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());
app.use(jwtMiddleware);

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

app.use(mount('/public', serve('./public')));
app.use(router.middleware())

// PORT 가 지정되어있지 않다면 61010 을 사용
const port = PORT || 61010;

app.listen(port, () => {
  console.log('http 서버 오픈 %d', port);
});