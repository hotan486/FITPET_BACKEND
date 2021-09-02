import User from '../../models/user';
import Joi from 'joi';

export const join = async (ctx) => {
  console.log('join');

  const {
    userId,
    userPW,
    userName,
    userPhoneNumber,
    userEmail
  } = ctx.request.body;

  if (userId === undefined || userPW === undefined) {
    console.log("사용자아이디 또는 방번호가 없습니다.");
    ctx.throw(400, {message: "유저아이디 또는 비밀번호가 없습니다."});
    return;
  }

  const userCheck = await User.findByUserId(userId);

  // 계정이 존재하면 에러 처리
  if (userCheck) {
    console.log("이미 존재하는 아이디입니다.");
    ctx.throw(401, {message: "이미 존재하는 아이디입니다."});
    return;
  }

  const user = new User({
    userId,
    userName,
    userPhoneNumber,
    userEmail,
    isUse: 1
  });

  await user.setPassword(userPW); // 비밀번호 설정
  await user.save(); // 데이터베이스에 저장

  ctx.status = 200;

};

/*
  POST /api/auth/login
  {
    email: 'velopert',
    password: 'mypass123'
  }
*/
// 일반 로그인
export const login = async (ctx) => {
  const {userId, userPW} = ctx.request.body;
  const validate_obj = {userId, userPW};

  const schema = Joi.object().keys({
    userId: Joi.string().required(),
    userPW: Joi.string().required(),
  });
  const result = schema.validate(validate_obj);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  // email, password 가 없으면 에러 처리
  if (!userId || !userPW) {
    ctx.status = 401; // Unauthorized
    return;
  }

  try {
    const user = await User.findByUserId(userId);

    // 계정이 존재하지 않으면 에러 처리
    if (!user) {
      ctx.status = 401;
      return;
    }

    const valid = await user.checkPassword(userPW);
    // 잘못된 비밀번호
    if (!valid) {
      ctx.status = 401;
      return;
    }

    ctx.body = user.serialize();
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });

  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  GET /api/auth/check
*/
export const check = async (ctx) => {
  const {user} = ctx.state;
  console.log("체크", user);
  if (!user) {
    // 로그인중 아님
    ctx.status = 401; // Unauthorized
    return;
  }
  ctx.body = user;
};

/*
    POST /api/auth/logout
*/
export const logout = async (ctx) => {
  ctx.cookies.set('access_token');
  ctx.status = 204; // No Content
};
