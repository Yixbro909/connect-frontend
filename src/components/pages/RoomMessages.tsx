import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { nameShorthand } from './others/NameShorthand';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const RoomMessages = () => {

    const { user } = useSelector((state: any) => state.auth)
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        const recentChatAsync = async () => {

            try {

                const room = await axios.post('http://localhost:9000/recentchats/', {
                    username:
                        user.username
                })
                setData(room.data)
            } catch (err) {
                console.log(err)
            }

        }

        // if (user.username) recentChatAsync()

    }, [])

    data.length > 0 && console.log(Object.keys(data[0]));

    return (
        <div className='row justify-content-center items-center'>
            <div className="col-md-10 col-lg-8 flex flex-col space-y-4 items-center">
                {/* <form className='flex flex-col w-full  self-start  p-2 sm:p-0'>
                    <h6 className="text-muted font-bold">Search recent chat rooms</h6>
                    <div className='flex bg-slate-100 py-2 px-3 rounded-md'>
                        <input type="search" placeholder='Enter room name' className='grow border-0 outline-none bg-transparent' />
                        <button className='-self-center text-center'>
                            <SearchIcon />
                        </button>
                    </div>
                </form>

                <div className='w-full  flex flex-col space-y-4'>

                    {data.length > 0 && data.map((room: any) => {
                        return (
                            <Link to={`/room/${room.roomID}`} className='flex space-x-3 mt-4 p-1 shadow-md rounded-md bg-slate-100 no-underline relative  hover:bg-emerald-100 transition-all duration-100  text-gray-700' key={room._id}>
                                {!room.readStatus ? <span class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                                    <span class="visually-hidden">New alerts</span>
                                </span> : ""}
                                <div className='rounded-[50%] flex justify-center items-center bg-gradient-to-tr from-blue-600 self-center to-emerald-400 w-[50px] h-[50px] font-bold text-white uppercase'>{nameShorthand(room.room_name)}</div>

                                <div className="flex flex-col grow justify-center">
                                    <div className="font-bold tracking-wide uppercase">{room.room_name}</div>
                                    <div className='relative flex items-center'>
                                        <div className=' text-center no-break bg-white px-2 text-muted'>{room[Object.keys(room)[1]].message}</div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}

                </div> */}
                <div className="col md:max-w-[500px] mx-auto mt-24 self-center">
                    <Alert severity='info' style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' }}>
                        <AlertTitle>Service not available</AlertTitle>
                        Our dev team are working on this feature, STAY TUNE <strong>Go back</strong>
                    </Alert>
                </div>
            </div>
        </div>
    )
}

export default RoomMessages
