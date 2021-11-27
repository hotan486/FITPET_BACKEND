import mongoose from 'mongoose';

const {Schema} = mongoose;

const roomInfoSimple = new Schema({
    room_id: String, // 객실 ID
    room_name: String, // 객실 이름
    room_img_main: String, // 객실 대표 이미지
});

const LodgingSchema = new Schema({
    lod_name_kr: String, // 숙소이름
    lod_name_en: String, // 숙소 영어이름
    lod_type: String, // 종류
    lod_rating: Number, // 평점
    lod_rate_count: Number, // 평가 수
    lod_star: Number, // 몇성급인지(1,2,3,4,5)
    lod_dip: Number, // 찜 수
    lod_place: {
        lat: Number, // 위도
        lon: Number // 경도
    },
    lod_region: String, // 숙소 지역
    lod_address: String, // 상세 주소
    lod_Phone: String, // 숙소 연락처
    lod_info: String, // 서브 설명
    lod_price: Number, // 가격
    lod_discount: Number, // 할인율
    lod_check_in_time: Number, // 숙소 체크인 시간
    lod_check_out_time: Number, // 숙소 체크 아웃 시간
    lod_img_main: String, // 대표 이미지
    lod_img: [String], // 이미지 경로들
    lod_is_use: Boolean, // 숙소 사용 중인지
    lod_is_del: Boolean, // 숙소 데이터 삭제되었는지
    lod_is_pet: Boolean, // 반려동물 여부
    pet_options: {
        dog_all: Boolean, // 모든 견종
        dog_s: Boolean, // 소형견 여부
        dog_m: Boolean, // 중형견 여부
        dog_b: Boolean, // 대형견 여부
        dog_fierce: Boolean, // 맹견 여부
        cat: Boolean, // 고양이 여부
        dry_room: Boolean, // 드라이룸 여부
        pool_pet: Boolean, // 애견 운동장
        spa_pet: Boolean, // 애견 스파
        shower_pet: Boolean, // 애견 샤워장
        self_bath: Boolean, // 셀프목욕
        playground: Boolean, // 애견 놀이터
        product: Boolean // 반려동물용품제공
    },
    options: {
        grass_yard: Boolean, // 잔디마당
        photo_zone: Boolean, // 포토존
        pool: Boolean, // 수영장 여부
        spa: Boolean, // 스파 여부
        wifi: Boolean, // 와이파이
        bbq: Boolean, // 바베큐
        bbq_each: Boolean, // 개별 바베큐
        cafe: Boolean, // 카페여부
        restaurant: Boolean, // 레스토랑 여부
        cooking: Boolean, // 취사가능
        baggage: Boolean, // 수하물 보관
        all_day: Boolean, // 24시리셉션
        fitness: Boolean, // 피트니스 센터
        laundry: Boolean, // 세탁 여부
        business: Boolean, // 비즈니스 시설
        for_disabled: Boolean, // 장애인 편의시설
    },
    rooms: [roomInfoSimple] // 객실 정보
});

const LodgingListSchema = new Schema({
    lodgings: [
        {
            type: String,
            ref: 'Lodging',
        },
    ],
});

export const Lodging = mongoose.model('Lodging', LodgingSchema);

export const LodgingList = mongoose.model(
    'LodgingList',
    LodgingListSchema,
);

// export default Lodging;
