import Room from '../../models/room';

/*
    객실 등록하기
    POST /api/room/register
*/
export const register = async (ctx) => {
    console.log('register');
    
    const { loadingId, roomName, breakfastCheck, freeReservationCancelCheck, maximumPeople, pocketpupNumber, roomCheckIn, roomCheckOut, roomPrice, 
        discountRate, roomSize, roomType } = ctx.request.body;


    if(loadingId === undefined) {
        console.log("숙소아이디가 없습니다.");
        ctx.throw(400, {message: "숙소아이디가 없습니다."});
        return;
    } 
    
    const room = new Room({
        loadingId,
        roomName,
        breakfastCheck,
        freeReservationCancelCheck,
        maximumPeople,
        pocketpupNumber,
        roomCheckIn,
        roomCheckOut,
        roomPrice,
        discountRate,
        roomSize,
        roomType
    });


    await room.save(); // 데이터베이스에 저장
    ctx.status = 200;

};

/*
    숙소 불러오기
    GET /api/room/list
*/
export const list = async (ctx) => {
    console.log('list');

    const { id } = ctx.params;
    try {

        const Rooms = await Room.find({
            "loadingId": id
        })
        .lean()
        .exec();

        ctx.status = 200;
        ctx.body = Rooms;

        // 숙소 존재하지 않을 때
        if (!Rooms) {
            ctx.throw(400, {message: "숙소의 객실리스트가 존재하지않습니다."});
            return;
        }
        ctx.status = 200;
        ctx.body = Rooms;

    } catch (e) {
        ctx.throw(500, e);
    }

};

