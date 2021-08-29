import mongoose, { Schema } from 'mongoose';

const LodgingSchema = new Schema({
  lodgignName: String,  // 숙소이름
  lodgingEnName : String, // 숙소 영어이름
  lodgingType: String,    // 종류(호텔, 모텔)
  lodgingTypeKr: String,  // 종류 - 한글이름
  lodgingStar: Number,    // 별점
  lodgingClass: String,   // 몇성급인지(1,2,3,4,5)
  lodginSubDescription: String, // 서브 설명
  lodgingMinMoney: Number, // 최소금액
  lodgingMaxMoney: Number, // 최대금액
  lodgingImg: String,   // 숙소 이미지
  lodgingLocation: String,  // 숙소위치
  lodgingCheckIn: String,  // 숙소 체크인
  lodgingCheckOut: String, // 숙소 체크아웃
  lodgingFloor: Number, // 숙소 층 수
  lodgingRoomNum: Number, // 숙소 객실 수량
  loadingNumber: String,    // 숙소 전화번호
  lodgingFaxNumber: String, // 숙소 팩스번호
  options: {
    smallDog: Boolean,    // 소형견 여부
    middleDong: Boolean,  // 중형견 여부
    companionAnimalWith: Boolean, // 반려동물동반
    companionAnimalPlayground: Boolean, // 반려동물운동장
    companionAnimalPool: Boolean, // 반려동물 수영장
    wifi: Boolean,  // 와이파이
    fitness: Boolean, // 피트니스 센터
    pool: Boolean, // 수영장
    freeParking: Boolean, // 무료주차
    reception24Hour: Boolean, // 24시리셉션
    hitsNumber: Number, // 조회 수
  },
  region: String, // 지역
});

const LodgingListSchema = new Schema({
  lodgins: [
      {
          type: String,
          ref: 'Lodging',
      },
  ],
});

const Lodging = mongoose.model('Lodging', LodgingSchema);

export const LodgingList = mongoose.model(
  'LodgingList',
  LodgingListSchema,
);


export default Lodging;
