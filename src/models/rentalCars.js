import mongoose from 'mongoose';

const {Schema} = mongoose;

const RentalCarsSchema = new Schema({
  carType: String,            // 차 종류
  carName: String,            // 차 이름
  minPrice: Number,           // 최소 차 가격
  maxPrice: Number,           // 최대 차 가격
  sales: Number,              // 세일 가격
  dibs: Number,               // 찜 수
  picture: String,            // 차 이미지 경로
  isRented: Number,           // 렌트 여부
  isNewCheck: Number,         // 신차 여부
  isUse: Number,              // 사용 여부 (삭제 관련)
  romStar: Number,            // 별점
  rentLocation: String,       // 렌트 위치
  maximumPeople: Number,      // 최대 인원 수
  options: {
    deliveryCheck: Boolean,     // 딜리버리 여부
    fuelType: String,           // 연로 타입
    RearCamera: Boolean,        // 후방 카메라 여부
  },
  registeredDate: {             //  등록 일
    type: Date,
    default: Date.now,
  }
});

const RentalCars = mongoose.model('RentalCars', RentalCarsSchema);
export default RentalCars;