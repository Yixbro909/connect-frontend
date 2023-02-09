import React from 'react'
import Skeleton from '@mui/material/Skeleton';

const RoomSkeletonLoading = () => {
    return (
        <>
            {[1, 2, 3, 4].map((a) => {
                return (
                    <div className='flex space-x-3 mt-4 p-1 shadow-md rounded-md' key={a}>
                        <Skeleton animation="wave" variant="circular" width={50} height={50} />
                        <div className="flex flex-col grow justify-center">
                            <Skeleton animation="wave" height={30} width='70%' />
                            <div className="flex space-x-5">
                                <Skeleton animation="wave" width={70} />
                                <Skeleton animation="wave" width={100} />
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default RoomSkeletonLoading
