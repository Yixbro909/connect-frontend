
import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import SimpleBackdrop from './SimpleBackdrop';
import { localCreateFavRoomEndpoint, localGetFavRoomEndpoint, localLeaveRoomEndpoint } from './endpoints';
import { addToFavorite } from '../../../store/reducers/favoriteRoomSlice';
const actions = [
    { icon: <ExitToAppIcon color='warning' />, name: 'Leave room' },
    { icon: <FavoriteIcon color="error" />, name: 'Mark room as favorite' },
];

interface IProps {
    username: string,
    room: any
}

const BasicSpeedDial: React.FC<IProps> = ({ username, room }) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    const [error, setError] = React.useState<string>()
    const [loading, setLoading] = React.useState<boolean>(false)
    const [leaveStatus, setLeaveStatus] = React.useState<number>();
    const navigate = useNavigate();

    const handleClose = () => setOpen(false)

    //slice dispatch
    const dispatch = useDispatch()
    const handleSpeedDialActions = (e: any) => {
        setOpen(false);

        if (e.currentTarget.children[0].textContent === 'Leave room') {
            console.log('leave room')
            leaveRoom(username, room.room_name)
            console.log(username, room.room_name)
        } else if (e.currentTarget.children[0].textContent === 'Mark room as favorite') {
            markRoomAsFavorite(username, room)
        }
    }

    //async leave room
    async function leaveRoom(username: string, roomName: string) {
        setLoading(true)
        try {
            const updatedRoom = await axios.patch(localLeaveRoomEndpoint, { username, room_name: roomName })
            // console.log(updatedRoom)
            setLeaveStatus(updatedRoom.status);
            setLoading(false)
        } catch (err: any) {
            setLoading(false)
            if (err.response.status === 400) {
                setError(err.response.data.error)
            } else {
                setError(err.message)
            }
        }
    }

    //async mark room as favorite
    async function markRoomAsFavorite(username: string, room: string) {
        try {
            await axios.post(localCreateFavRoomEndpoint, { username, room })

            const { data } = await axios.get(localGetFavRoomEndpoint + username);

            dispatch(addToFavorite(data))
        } catch (err: any) {
            if (err.response.status === 400) {
                console.log(err.response.data.error)
            } else {
                console.log(err);
            }
        }
    }

    React.useEffect(() => {
        if (leaveStatus === 200) {
            navigate('/home');
        }
    }, [leaveStatus])

    return (
        <>
            <Box>
                <Backdrop open={open} />
                <SpeedDial
                    ariaLabel="SpeedDial tooltip example"
                    icon={<SpeedDialIcon />}
                    sx={{ position: 'sticky', fontSize: '10px', bottom: 0 }}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            tooltipOpen
                            onClick={handleSpeedDialActions}
                            sx={{ whiteSpace: 'nowrap' }}
                        />
                    ))}
                </SpeedDial>
            </Box >
            {loading && <SimpleBackdrop text='Leaving room  now ...' />}
        </>
    );
}

export default BasicSpeedDial