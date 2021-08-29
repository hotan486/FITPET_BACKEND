import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const coupons = mongoose.Schema({
  name: String,
  discount: Number
});

const UserSchema = new Schema({
  userId: String,
  userPW: String,
  userName: String,
  userPhoneNumber: String,
  userEmail: String,
  coupons: [coupons],
  isUse: Number,
  registedDate: {             //  회원 가입일
    type: Date,
    default: Date.now,
  }
});

//패스워드 설정
UserSchema.methods.setPassword = async function(password) {
  const hash = await bcrypt.hash(password, 10);
  this.userPW = hash;
};

//패스워드 비교
UserSchema.methods.checkPassword = async function(password) {
  const result = await bcrypt.compare(password, this.userPW);
  return result; // true / false
};

UserSchema.methods.serialize = function() {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

UserSchema.methods.generateToken = function() {
  const token = jwt.sign(
    // 첫번째 파라미터엔 토큰 안에 집어넣고 싶은 데이터를 넣습니다
    {
      _id: this.id,
      userId: this.userId,
      userName: this.userName,
    },
    process.env.JWT_SECRET, // 두번째 파라미터에는 JWT 암호를 넣습니다
    {
      expiresIn: '7d', // 7일동안 유효함
    },
  );
  return token;
};

// 등록된 아이디 확인
UserSchema.statics.findByUserId = function(userId){
  return this.findOne({ userId });
}

const User = mongoose.model('User', UserSchema);
export default User;
