import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate } from 'react-router-dom';
import ToolTip from '@mui/material/Tooltip';
import HomeIcon from '@mui/icons-material/Home';
import ForumIcon from '@mui/icons-material/Forum';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MyAccount from '../modal/MyAccount';

import { logOut } from '../../store/reducers/authSlice';
import { useDispatch } from 'react-redux';

const OnlineBottomNav = () => {
    const navigate = useNavigate();

    const [openMyAcc, setOpenMyAcc] = React.useState(false)

    const [value, setValue] = React.useState('home');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    //dispatch
    const dispatch = useDispatch();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpenMyAcc(true)
    }

    const handleLogout = () => {
        //logout user
        dispatch(logOut());

        navigate('/')
        setAnchorEl(null);
    }

    //login user
    const navigateHome = () => navigate('/home');
    const navigateChatMessages = () => navigate('/room-messages');
    const navigateFavRooms = () => navigate('/favorite-room');
    return (
        <>

            <div className="w-full fixed bg-emerald-400/30 shadow-lg   bottom-0 left-0 md:hidden">
                <BottomNavigation sx={{ width: '100%' }} value={value} onChange={handleChange}>

                    <BottomNavigationAction
                        label="Home"
                        value="home"
                        icon={<HomeIcon />}
                        onClick={navigateHome}
                    />

                    <BottomNavigationAction
                        label="RoomMessages"
                        value="roommessages"
                        icon={<ForumIcon />}
                        onClick={navigateChatMessages}
                    />

                    <BottomNavigationAction
                        label="FavRoom"
                        value="favroom"
                        icon={<FavoriteIcon />}
                        onClick={navigateFavRooms}
                    />

                    <BottomNavigationAction
                        label="Settings"
                        value="settings"
                        icon={<SettingsIcon />}
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    />
                </BottomNavigation>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </div>
            <MyAccount open={openMyAcc} handleClose={() => setOpenMyAcc(false)} />
        </>
    );
}


export default OnlineBottomNav