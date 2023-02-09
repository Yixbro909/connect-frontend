
const localhost = 'http://localhost:9000'
const liveHost = 'https://connect-eta-smoky.vercel.app'

export const localLoginEndPoint = localhost + '/user/login'
export const localSignupEndPoint = localhost + '/user/signup'
export const localCreateRoomEndPoint = localhost + '/room/createroom'
export const localGetAllRoomsEndPoint = localhost + '/room/getrooms';
export const localGetOneRoomByRooNameEndPoint = localhost + '/room/getroom/search/'
export const localGetOneRoomByIdEndPoint = localhost + '/room/getroom/';
export const localJoinRoomEndpoint = localhost + '/room/joinroom/';
export const localGetFavRoomEndpoint = localhost + '/favorite_room/get_fav_room/';
export const localDeleteFavRoomEndpoint = localhost + '/favorite_room/del_fav_room/'
export const localLeaveRoomEndpoint = localhost + '/room/leaveroom'
export const localCreateFavRoomEndpoint = localhost + '/favorite_room/create_fav_room'