import React from 'react'
import { Alert, AlertTitle } from '@mui/material';


interface IProps {
    text: string
}
const DisplayNetworkErr: React.FC<IProps> = ({ text }) => {

    return (
        <div className="md:max-w-[500px] mx-auto mt-24">
            <Alert severity='error'>
                <AlertTitle>{text}</AlertTitle>
                You're offline, connect to a Wi-Fi or turn-on your mobile data and - <strong className="cursor-pointer" onClick={() => location.reload()}>Refresh</strong>
            </Alert>
        </div>
    )
}

export default DisplayNetworkErr