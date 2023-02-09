import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { nameShorthand } from './others/NameShorthand';
import { Link } from 'react-router-dom';
import RoomSkeletonLoading from './others/RoomSkeletonLoading';
import { useDispatch } from 'react-redux';
import { addToFavorite, deleteFavorite } from '../../store/reducers/favoriteRoomSlice';
import { localDeleteFavRoomEndpoint, localGetFavRoomEndpoint } from './others/endpoints';
import DisplayNetworkErr from './others/DisplayNetworkErr';

const FavoriteChatRoom = () => {

    const { user } = useSelector((state: any) => state.auth);

    const { favRoom } = useSelector((state: any) => state.favRoom);

    const dispatch = useDispatch();

    const [data, setData] = React.useState<[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();
    const [deleteRoomStatus, setDeleteRoomStatus] = React.useState<number>();
    const [deleteRoom, setDeleteRoom] = React.useState<any>();

    const removeFavorite = (e: React.SyntheticEvent<HTMLButtonElement>, room: any) => {
        e.preventDefault();

        setDeleteRoom(room)
        removeRoomFromFavorite(user.username, room)
    }

    //async load user favorite room
    async function favoriteRoom(username: string) {
        setLoading(true);

        try {
            const response = await axios.get(localGetFavRoomEndpoint + username)

            setData(response.data);
            setLoading(false);

        } catch (err: any) {
            setLoading(false);
            if (err.code === 'ERR_NETWORK') setError(err.message)
        }

    }

    //async remove room from favorites
    async function removeRoomFromFavorite(username: string, room: any) {

        try {
            const response = await axios.delete(localDeleteFavRoomEndpoint, { data: { username, room } })

            setDeleteRoomStatus(response.status)
        } catch (err) {
            console.log(err)
        }

    }

    //calling get favorites fetch request  after user is updated
    React.useEffect(() => {
        if (user.username !== undefined) {
            favoriteRoom(user.username);
        }
    }, [user])

    //update the favorite slice
    React.useEffect(() => {
        dispatch(addToFavorite(data))
    }, [data])

    //remove favorite room from favorite slice
    React.useEffect(() => {
        if (deleteRoomStatus === 200 && deleteRoom) {
            dispatch(deleteFavorite(deleteRoom))
        }
    }, [deleteRoomStatus, deleteRoom])


    console.log(favRoom)
    return (
        <div className='row justify-content-center'>
            <div className="col-md-10 col-lg-8 flex flex-col space-y-4 items-center">
                <form className='flex flex-col w-full self-start  p-2 sm:p-0'>
                    <h6 className="text-muted font-bold">Search favorite room</h6>
                    <div className='flex bg-slate-100 py-2 px-3 rounded-md'>
                        <input type="search" placeholder='Enter room name' className='grow border-0 outline-none bg-transparent' />
                        <button className='-self-center text-center'>
                            <SearchIcon />
                        </button>
                    </div>
                </form>

                <div className="w-full  flex flex-col space-y-4">

                    {favRoom.length > 0 && favRoom.map((room: any) => {
                        return (
                            <Link to={`/room/${room._id}`} className='flex space-x-3 mt-4 p-1 shadow-md rounded-md bg-slate-100 no-underline relative  hover:bg-emerald-100 transition-all duration-100  text-gray-700' key={room._id}>
                                <div className='rounded-[50%] flex justify-center items-center bg-gradient-to-tr from-blue-600 self-center to-emerald-400 w-[50px] h-[50px] font-bold text-white uppercase'>{nameShorthand(room.room_name)}</div>

                                <div className="flex flex-col grow justify-center">
                                    <div className="font-bold tracking-wide uppercase">{room.room_name}</div>
                                    <div className='relative flex items-center'>
                                        <div className='rounded-pill  text-center no-break bg-white px-2 font-bold shadow-sm'>{room.creator}</div>
                                        <div className='text-emerald-600 p-2 font-bold  text-sm'>Room users ({room.joinedUsers.length})</div>
                                    </div>
                                </div>

                                <Tooltip placement='top' title='Remove' arrow>
                                    <button type='button' onClick={(e: React.SyntheticEvent<HTMLButtonElement>) => removeFavorite(e, room)} className="absolute top-1 right-1 p-1 rounded-full backdrop-blur-lg  bg-white/50">
                                        <DeleteIcon color='info' />
                                    </button>
                                </Tooltip>
                            </Link>
                        )
                    })}

                    {loading && <RoomSkeletonLoading />}

                    {error && <DisplayNetworkErr text={error} />}

                    {!loading && favRoom.length == 0 && !error && (<div className='text-center text-muted'>You have no favorite room</div>)}

                </div>
            </div>
        </div>
    )
}

export default FavoriteChatRoom