import mongoose from 'mongoose';

const {Schema} = mongoose;

const RoomSchema = new Schema({
  loadingId: String, // 숙소아이디
  roomName: String, // 객실이름
  breakfastCheck: Boolean, // 조식 여부
  freeReservationCancelCheck: Boolean, // 무료예약취소 여부
  maximumPeople: Number, // 최대몇명
  pocketPupNumber: Number, // 소형견 몇마리
  roomCheckIn: String,  // 객실 체크인
  roomCheckOut: String, // 객실 체크아웃
  roomPrice: Number, // 객실가격
  discountRate: Number, // 할인율
  roomSize: Number, // 객실 사이즈
  roomType: String, // 객실타입
});

const Room = mongoose.model('Room', RoomSchema);

export default Room;