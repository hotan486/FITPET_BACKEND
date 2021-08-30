import mongoose, { Schema } from 'mongoose';

const RentalCarsSchema = new Schema({
    carType: String,            // 차 종류
    carName: String,            // 차 이름
    price: Number,              // 차 가격
    sales: Number,              // 세일 가격
    dibs: Number,               // 
    picture: String,            // 차 이미지 경로
    isRented: Number,           // 렌트 수
    isNewCheck: Number,         // 신차 수
    isUse: Number,              // 사용 수
    romStar: Number,            // 별점
    rentLocation: String,       // 렌트 위치
    maximumPeople: Number,      // 최대몇명
    options: {
        deliveryCheck: Boolean,     // 딜리버리 여부
        fuelType: String,           // 연로 타입
        RearCamera: Boolean,        // 후방 카메라 여부
    },
    registedDate: {             //  등록일
        type: Date,
        default: Date.now,
    }
});

const RentalCars = mongoose.model('RentalCars', RentalCarsSchema);
export default RentalCars;