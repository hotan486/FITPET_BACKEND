import RentCars from '../../models/rentalCars';

/*
    렌트카 등록하기
    POST /api/rentcar/register
*/
export const register = async (ctx) => {
  console.log("rentCar register");

  const {
    carType,
    carName,
    price,
    sales,
    dibs,
    picture,
    isRented,
    isNewCheck,
    isUse,
    romStar,
    rentLocation,
    maximumPeople,
    options
  } = ctx.request.body;

  const rentcars = new RentCars({
    carType,
    carName,
    price,
    sales,
    dibs,
    picture,
    isRented,
    isNewCheck,
    isUse,
    romStar,
    rentLocation,
    maximumPeople,
    options: {
      deliveryCheck: options.deliveryCheck,
      fuelType: options.fuelType,
      RearCamera: options.RearCamera,
    }
  });

  await rentcars.save(); // 데이터베이스에 저장
  ctx.status = 200;

}

/*
    렌트카 불러오기
    GET /api/rentcar/list
*/
export const list = async (ctx) => {
  console.log('rentCar list');
  const page = parseInt(ctx.query.nowPage || '1', 6);

  console.log("ctx.query", ctx.query.nowPage);
  console.log("page", page);
  const displayLabelCount = 6;

  // console.log("ctx.query", ctx.query);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  try {

    const rentcars = await RentCars.find()
    .limit(displayLabelCount)
    .skip(page === 1 ? 0 : (page - 1) * 6 - 1)
    .lean()
    .exec();

    const rentcarsCount = await RentCars.countDocuments()
    .exec();
    let lastPage;

    if (rentcarsCount / 6 < 1) {
      lastPage = 1;
    } else {
      lastPage = Math.floor(rentcarsCount / 6) + 1;
    }

    ctx.set('Last-Page', lastPage);
    ctx.body = rentcars;

  } catch (e) {
    ctx.throw(500, e);
  }

};
