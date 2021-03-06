import Lodging from '../../models/lodging';

// 숙소등록
export const register = async (ctx) => {
  console.log("register");

  const {
    lodgingType, // 숙소 유형,종류
    lodgignName,  // 숙소이름
    lodgingEnName, // 숙소 영어이름
    lodgingStar,    // 별점
    lodgingClass,   // 몇성급인지(1,2,3,4,5)
    lodginSubDescription, // 서브 설명
    lodgingLocation,  // 숙소위치

    //lodgingMainImg, // 숙소 대표 이미지
    //lodgingImgs, // 숙소 상세 이미지
    //lodgingSlideImg, // 숙소 슬라이드 이미지
    //lodgingPopularityImg, // 인기 숙소 이미지

    options, // 옵션
  } = ctx.request.body;

  const lodging = new Lodging({
    lodgingType, // 숙소 유형,종류
    lodgignName,  // 숙소이름
    lodgingEnName, // 숙소 영어이름
    lodgingStar,    // 별점
    lodgingClass,   // 몇성급인지(1,2,3,4,5)
    lodginSubDescription, // 서브 설명
    lodgingLocation,  // 숙소위치
    //lodgingMainImg, // 숙소 대표 이미지
    //lodgingImgs, // 숙소 상세 이미지
    //lodgingSlideImg, // 숙소 슬라이드 이미지
    //lodgingPopularityImg, // 인기 숙소 이미지

    options: {
      smallDogYN: options.smallDogYN,    // 소형견 여부
      middleDongYN: options.middleDongYN,  // 중형견 여부
      bigDogYN: options.bigDogYN, // 대형견 여부
      catYN: options.catYN, // 고양이 여부
      dryRoomYN: options.dryRoomYN, // 드라이룸 여부
      inPoolYN: options.inPoolYN, // 실내 수영장 여부 
      petPlaygroundYN: options.petPlaygroundYN, // 애견 운동장
      selfBathYN: options.selfBathYN, // 셀프목욕
      petSpaYN: options.petSpaYN, // 애견 스파
      petShowerYN: options.petShowerYN, // 애견 샤워장
      petDogPlaygroundYN: options.petDogPlaygroundYN, // 애견 놀이터
      grassYardYN: options.grassYardYN, // 잔디마당
      photozoneYN: options.photozoneYN, // 포토존
      petProductsYN: options.petProductsYN, // 반려동물용품제공
      petWithYN: options.petWithYN, // 반려동물 동반
      allDogBreedYN: options.allDogBreedYN, // 모든견종
      fierceDogOffLimitsYN: options.fierceDogOffLimitsYN, // 맹견출입금지
      wifYN: options.wifYN, // 와이파이
      eachBarbecueYN: options.eachBarbecueYN, // 개별 바베큐
      cafeYN: options.cafeYN, // 카페여부
      restaurantYN: options.restaurantYN, // 레스토랑 여부
      cookingYN: options.cookingYN, // 취사가능
      baggageStorageYN: options.baggageStorageYN, // 수하물 보관
      reception24HourYN: options.reception24HourYN, // 24시리셉션
      fitnessYN: options.fitnessYN, // 피트니스 센터
      spaYN: options.spaYN, // 스파 여부
      laundryYN: options.laundryYN, // 세탁 여부
      poolYN: options.poolYN, // 수영장 여부
      businessFacilitiesYN: options.businessFacilitiesYN, // 비즈니스 시설
      facilitiesforTheDisabledYN: options.facilitiesforTheDisabledYN, // 장애인 편의시설
    },
  });

  await lodging.save(); // 데이터베이스에 저장
  ctx.status = 200;

}

/*
    숙소 불러오기
    GET /api/lodging/list
*/
export const list = async (ctx) => {
  console.log('list');

  const page = parseInt(ctx.query.nowPage || '1', 6);

  console.log("ctx.query", ctx.query.nowPage);
  console.log("page", page);
  const displayLabelCount = 6;

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  // 지역
  let region = ctx.query.region;
  if (region === undefined) {
    region = '';
  }

  // 호텔 성급
  let lodgingClass = ctx.query.lodgingClass;
  if (lodgingClass === undefined) {
    lodgingClass = '';
  }

  // 셀렉트 쿼리
  let query = {}
  if (region) {
    query.region = {$in: [region]};
    // {"region": {$in: [region]}};
  }

  // 호텔 성급 검색
  if(lodgingClass) {

    const hotelGradeList = lodgingClass.split(',');

    // 검색 성급
    let searchLodgingClassList = [];
    hotelGradeList.forEach(item => {
      searchLodgingClassList.push(item + "성급");
    });

    query.lodgingClass = {$in: searchLodgingClassList};
    
  }

  // 평점,별점
  let lodgingStar = ctx.query.lodgingStar;
  if (lodgingStar === undefined) {
    lodgingStar = '';
  }

  if(lodgingStar) {

    const lodgingStarList = lodgingStar.split(',');

    // 검색 평점
    let searchLodgingStarList = [];
    lodgingStarList.forEach(item => {
      searchLodgingStarList.push(Number(item));
    });


    query.lodgingStar = {$in: searchLodgingStarList};

  }

  // 숙소타입
  let lodgingType = ctx.query.lodgingType;
  if(lodgingType === undefined) {
    lodgingType = '';
  }

  if(lodgingType) {
    query.lodgingType = {$in: lodgingType};
  }

  // 시작날짜
  let startDt = ctx.query.startDt;
  if(startDt === undefined) {
    startDt = '';
  }

  // 종료날짜
  let endDt = ctx.query.endDt;
  if(endDt === undefined) {
    endDt = '';
  }


  //////////
  // 인원선택

  // 객실수
  let room = ctx.query.room;
  if(room === undefined) {
    room = '';
  }

  // 성인
  let adult = ctx.query.adult;
  if(adult === undefined) {
    adult = '';
  }


  // 어린이(만 12세미만)
  let child = ctx.query.child;
  if(child === undefined) {
    child = '';
  }

  // 소형견
  let smallSizedDogs = ctx.query.smallSizedDogs;
  if(smallSizedDogs === undefined) {
    smallSizedDogs = '';
  }

  // 중형견
  let mediumSizedDogs = ctx.query.mediumSizedDogs;
  if(mediumSizedDogs === undefined) {
    mediumSizedDogs = '';
  }

  // 대형견
  let bigSizedDogs = ctx.query.bigSizedDogs;
  if(bigSizedDogs === undefined) {
    bigSizedDogs = '';
  }

  // 고양이
  let cats = ctx.query.cats;
  if(cats === undefined) {
    cats = '';
  }


  // 인원선택
  /////////


  // 정렬
  let selectSort = ctx.query.selectSort;
  if(selectSort === undefined) {
    selectSort = '';
  }

  // 정렬쿼리
  let sortQuery;
  if (selectSort) {

    if(selectSort === 'moneyDesc') {
      sortQuery = {"lodgingMinMoney": -1 };
    } else if(selectSort === 'moneyAsc') {
      sortQuery = {"lodgingMinMoney": 1 };
    }

  }

  try {

    const lodgings = await Lodging.find(query)
    .sort(sortQuery)
    .limit(displayLabelCount)
    .skip(page === 1 ? 0 : (page - 1) * 6 - 1)
    .lean()
    .exec();

    const lodgingCount = await Lodging.countDocuments()
    .exec();
    let lastPage;

    if (lodgingCount / 6 < 1) {
      lastPage = 1;
    } else {
      lastPage = Math.floor(lodgingCount / 6) + 1;
    }

    ctx.set('Last-Page', lastPage);
    ctx.body = lodgings;

  } catch (e) {
    ctx.throw(500, e);
  }

};

/*
    숙소 인기있는 숙소 8개 불러오기
    GET /api/lodging/hitsList
*/
export const hitsList = async (ctx) => {
  console.log('hitsList');

  try {

    const lodgings = await Lodging.find({
      // roomId: { $in: reservationList.rooms },
    })
    .limit(8)
    .sort({"options.hitsNumber": -1})
    .lean()
    .exec();

    ctx.body = lodgings;

  } catch (e) {
    ctx.throw(500, e);
  }

};

/*
    숙소읽기
    GET /api/lodging/:id
*/
export const read = async (ctx) => {
  const {id} = ctx.params;
  try {

    const lodging = await Lodging.findById(id);

    // 숙소 존재하지 않을 때
    if (!lodging) {
      ctx.throw(400, {message: "숙소정보가 존재하지않습니다."});
      return;
    }
    ctx.status = 200;
    ctx.body = lodging;
  } catch (e) {
    ctx.throw(500, e);
  }
};