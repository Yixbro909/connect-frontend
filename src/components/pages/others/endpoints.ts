
const localhost = 'http://localhost:9000'
const liveHost = 'https://connect-backend-production-59fc.up.railway.app/'

export const localLoginEndPoint = liveHost + '/user/login'
export const localSignupEndPoint = liveHost + '/user/signup'
export const localCreateRoomEndPoint = liveHost + '/room/createroom'
export const localGetAllRoomsEndPoint = liveHost + '/room/getrooms';
export const localGetOneRoomByRooNameEndPoint = liveHost + '/room/getroom/search/'
export const localGetOneRoomByIdEndPoint = liveHost + '/room/getroom/';
export const localJoinRoomEndpoint = liveHost + '/room/joinroom/';
export const localGetFavRoomEndpoint = liveHost + '/favorite_room/get_fav_room/';
export const localDeleteFavRoomEndpoint = liveHost + '/favorite_room/del_fav_room/'
export const localLeaveRoomEndpoint = liveHost + '/room/leaveroom'
export const localCreateFavRoomEndpoint = liveHost + '/favorite_room/create_fav_room'