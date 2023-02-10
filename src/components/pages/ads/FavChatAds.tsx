import React from 'react'
import AOS from 'aos';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { nameShorthand } from '../others/NameShorthand';
import { localGetOneRoomByIdEndPoint } from '../others/endpoints';
import axios from 'axios';

const FavChatAds = () => {

    const { favRoom } = useSelector((state: any) => state.favRoom);

    React.useEffect(() => {
        AOS.init();
    }, [])



    return (

        <div data-aos='fade-left' className="card border-0 shadow-lg w-full lg:w-[80%]">
            <h6 className="card-header text-primary">Favorite Chat</h6>
            <div className="card-body">
                <ul className="list-group list-group-flush">

                    {favRoom.length > 0 ? favRoom.map((fav: any) => {
                        return (

                            <Link to={`/room/${fav._id}`} className="list-group-item" key={fav._id}>
                                <div className="flex justify-between space-x-6">
                                    <div className='rounded-[50%] flex justify-center items-center bg-gradient-to-tr from-blue-600 to-emerald-400 text-white w-[40px] h-[40px] font-bold uppercase'>{nameShorthand(fav.room_name)}</div>
                                    <div className="flex flex-col grow justify-center">
                                        <div className="font-bold tracking-wide uppercase">{fav.room_name}</div>
                                        {/* <div className="text-muted text-sm">{fav.messages.length > 0 ? fav.messages[fav.messages.length - 1].message : 'no messages yet...'}</div> */}
                                    </div>
                                </div>
                            </Link>
                        )
                    }) : (<div className='text-sm text-gray-500 text-center'>You have no favorites room ...</div>)}


                    {/* <li className="list-group-item">
                        <div className="flex justify-between space-x-6">
                            <div className='rounded-[50%] flex justify-center items-center bg-gradient-to-tr from-blue-600 to-emerald-400 w-[40px] h-[40px] font-bold text-white'>FO</div>
                            <div className="flex flex-col grow justify-center">
                                <div className="font-bold tracking-wide">Food Network</div>
                                <div>what dish are the ....</div>
                            </div>
                        </div>
                    </li>

                    <li className="list-group-item">
                        <div className="flex justify-between space-x-6">
                            <div className='rounded-[50%] flex justify-center items-center bg-gradient-to-tr from-blue-600 to-emerald-400 w-[40px] h-[40px] font-bold text-white'>P</div>
                            <div className="flex flex-col grow justify-center">
                                <div className="font-bold tracking-wide">Dev Job needed</div>
                                <div>Any applicant ???</div>
                            </div>
                        </div>
                    </li> */}

                </ul>
            </div>


            <div className="card-footer bg-white border-top-0">
                <Link to="/favorite-room" className='text-decoration-none text-sm'>View more</Link>
            </div>
        </div>

    )
}

export default FavChatAds
