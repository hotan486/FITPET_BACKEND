import Lodging, { LodgingList } from '../../models/lodging';

export const register = async (ctx) => {
    console.log("register");

    const { lodgignName, lodgingEnName, lodgingType, lodgingTypeKr, lodgingStar, lodgingClass, lodginSubDescription, lodgingMinMoney, lodgingImg, lodgingLocation, lodgingCheckIn, lodgingCheckOut,
        lodgingFloor, lodgingRoomNum, loadingNumber, lodgingFaxNumber, options
    } = ctx.request.body;


    const lodging = new Lodging({
        lodgignName,
        lodgingEnName,
        lodgingType,
        lodgingTypeKr,
        lodgingStar,
        lodgingClass,
        lodginSubDescription,
        lodgingMinMoney,
        lodgingMaxMoney,
        lodgingImg,
        lodgingLocation,
        lodgingCheckIn,
        lodgingCheckOut,
        lodgingFloor,
        lodgingRoomNum,
        loadingNumber,
        lodgingFaxNumber,
        options: {
            smallDog: options.smallDog,
            middleDong: options.middleDong,
            companionAnimalWith: options.companionAnimalWith,
            companionAnimalPlayground: options.companionAnimalPlayground,
            companionAnimalPool: options.companionAnimalPool,
            wifi: options.wifi,
            fitness: options.fitness,
            pool: options.pool,
            freeParking: options.freeParking,
            reception24Hour: options.reception24Hour,
            hitsNumber: options.hitsNumber,
        }
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
    const displayLableCount = 6;

    // console.log("ctx.query", ctx.query);

    if (page < 1) {
        ctx.status = 400;
        return;
    }

    // 지역
    let region = ctx.query.region;
    if(region === undefined) {
        region = '';
    }

    // 쿼리
    let query;
    if(region) {
        query =  { "region": { $in: [ region ]} };
    }

    try {

        const lodgines = await Lodging.find(query)
            .limit(displayLableCount)
            .skip(page === 1 ? 0 : (page - 1) * 6 - 1)
            .lean()
            .exec();

        const lodginCount = await Lodging.countDocuments()
            .exec();
        let lastPage;

        if (lodginCount / 6 < 1) {
            lastPage = 1;
        } else {
            lastPage = Math.floor(lodginCount / 6) + 1;
        }

        ctx.set('Last-Page', lastPage);
        ctx.body = lodgines;

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

        const lodgines = await Lodging.find({
            // roomId: { $in: reservationList.rooms },
        })
            .limit(8)
            .sort({"options.hitsNumber": -1})
            .lean()
            .exec();


        ctx.body = lodgines;

    } catch (e) {
        ctx.throw(500, e);
    }

};

/*
    숙소읽기
    GET /api/lodging/:id
*/
export const read = async (ctx) => {
    const { id } = ctx.params;
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