import React from 'react'
import { Link } from 'react-router-dom';
import { nameShorthand } from './NameShorthand';
import Alert from '@mui/material/Alert';
import RoomSkeletonLoading from './RoomSkeletonLoading';

interface IProps {
    searchResult: any[],
    loading: boolean,
    error: {
        error: string
    },
    searchErr: string
}

const SearchResult: React.FC<IProps> = ({ searchResult, loading, error, searchErr }) => {
    return (
        <>
            {searchErr && (<Alert severity='warning'>{searchErr}</Alert>)}
            {searchResult && searchResult.slice(0, 5).map((room: any) => {
                return (
                    <Link to={`/room/${room._id}`} className='flex space-x-3 mt-4 p-1 shadow-md rounded-md bg-slate-100 no-underline hover:bg-emerald-100 transition-all duration-100  text-gray-700' key={room._id}>
                        <div className='rounded-[50%] flex justify-center items-center bg-gradient-to-tr from-blue-600 self-center to-emerald-400 w-[50px] h-[50px] font-bold text-white uppercase'>{
                            nameShorthand(room.room_name)
                        }</div>

                        <div className="flex flex-col grow justify-center">
                            <div className="font-bold tracking-wide uppercase">{room.room_name}</div>
                            <div className='relative flex items-center'>
                                <div className='rounded-pill backdrop-blur-lg text-center no-break bg-white/40 px-2 font-bold shadow-sm'>{room.creator}</div>
                                <div className='text-emerald-600 p-2 font-bold  text-sm'>Users ({room.joinedUsers.length})</div>
                            </div>
                        </div>
                    </Link>
                )
            })}

            {loading && <RoomSkeletonLoading />}
        </>
    )
}

export default SearchResult