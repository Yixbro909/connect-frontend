import React from 'react'
import AOS from 'aos';
import { Link } from 'react-router-dom';
const RecentChatAds = () => {


    React.useEffect(() => {
        AOS.init();
    }, [])
    return (

        <div data-aos='fade-left' className="card border-0 shadow-lg w-full lg:w-[80%]">
            <h6 className="card-header text-primary">Recent Chats</h6>
            <div className="card-body">
                <ul className="list-group list-group-flush">

                    {/* <li className="list-group-item">
                        <div className="flex justify-between space-x-6">
                            <div className='rounded-[50%] flex justify-center items-center bg-gradient-to-tr from-blue-600 to-emerald-400 text-white w-[40px] h-[40px] font-bold'>JS</div>
                            <div className="flex flex-col grow justify-center">
                                <div className="font-bold tracking-wide">JS developers</div>
                                <div>Hey guys</div>
                            </div>
                        </div>
                    </li> */}

                    <div className="text-muted">Service not available now ...</div>


                </ul>

            </div>
            <div className="card-footer bg-white border-top-0">
                <Link to="/room-messages" className='text-decoration-none text-sm'>View more</Link>
            </div>
        </div>

    )
}

export default RecentChatAds
