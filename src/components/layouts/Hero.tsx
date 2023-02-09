import React from 'react'
import CreateRoomModal from '../modal/CreateRoomModal';
import JoinRoomModal from '../modal/JoinRoomModal';
import AOS from 'aos';

const Hero = () => {

    const [openCreateRoomModal, setOpenCreateRoomModal] = React.useState<boolean>(false);
    const [openJoinRoomModal, setOpenJoinRoomModal] = React.useState<boolean>(false)

    const openCreateRoom = () => setOpenCreateRoomModal(true);

    const openJoinRoom = () => setOpenJoinRoomModal(true);

    React.useEffect(() => {
        AOS.init();
    })
    return (
        <section className='row flex-col-reverse md:flex-row gap-y-5' id="hero">
            <div data-aos='fade-right' className="col-md-6">
                <img src="/illustrations/social_illustration.svg" alt="social friends illustrations" />
            </div>

            <div data-aos='fade-left' className="col-md-6 flex flex-col space-y-3 drop-shadow-lg">
                <div className='flex flex-col space-y-2'>
                    <h1 className="text-5xl bg-clip-text text-transparent bg-gradient-to-br from-emerald-400 font-black to-blue-600" id="hero-heading">Join and create chatrooms for your social engagement</h1>
                    <p className="text-gray-800">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, cupiditate expedita at numquam libero magnam vero ea porro aliquid atque.</p>
                </div>

                <div className='flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 mt-4'>
                    <button className='px-5 py-3 outline-none border-0 rounded-md uppercase ring-2 ring-emerald-400 text-emerald-400  font-bold ' onClick={openJoinRoom}>Join Room</button>
                    <button className='uppercase px-5 py-3 bg-blue-600 outline-none border-0 rounded-md ring-2 ring-emerald-400 text-white  font-bold' onClick={openCreateRoom}>Create Room</button>
                </div>
            </div>

            {/* OPEN ROOM CATEGORY MODAL */}
            <JoinRoomModal setOpenJoinRoomModal={setOpenJoinRoomModal} openJoinRoomModal={openJoinRoomModal} />
            <CreateRoomModal setOpenCreateRoomModal={setOpenCreateRoomModal} openCreateRoomModal={openCreateRoomModal} />
        </section>
    )
}

export default Hero