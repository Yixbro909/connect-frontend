import React from 'react'
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Stack from '@mui/material/Stack';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ForumIcon from '@mui/icons-material/Forum';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import { Badge, IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AOS from 'aos';
import { logOut } from '../../store/reducers/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import MyAccount from '../modal/MyAccount';
import { setSourceMapRange } from 'typescript';

interface IProps {
    count: any
}

const Navbar: React.FC<IProps> = ({ count }) => {

    const [openMyAcc, setOpenMyAcc] = React.useState(false)

    const [login, setLogin] = React.useState<boolean>(false);

    const [activeLink, setActiveLink] = React.useState<string>('home');

    //useDisaptch
    const dispatch = useDispatch();
    const { user } = useSelector((state: any) => state.auth);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const navigate = useNavigate();


    const handleClose = () => {
        setAnchorEl(null);
        setActiveLink('settings')
        setOpenMyAcc(true)

        console.log(openMyAcc)
    };

    const handleLogout = () => {
        //hanleLogout
        dispatch(logOut());
        navigate('/login')
        setAnchorEl(null);
    }

    React.useEffect(() => {
        AOS.init();
    }, [])

    return (
        <>
            <nav className="navbar fixed-top p-3 drop-shadow-lg backdrop-blur-md bg-white/70">
                <div className="container-md justify-content-center items-center flex-no-wrap">
                    <Link to="/" className="nav-brand bg-clip-text text-transparent bg-gradient-to-br from-emerald-400 to-blue-600  font-bold no-underline text-4xl">Connect</Link>

                    <ul className="hidden md:navbar-nav md:flex  mt-3 lg:mt-0  grow align-self-center justify-center lg:justify-end  space-x-9 mb-0">
                        {
                            !user.email ?
                                <>
                                    <li className="nav-item">
                                        <Link to="signup" className='no-underline'>
                                            <Button variant="outlined" startIcon={<PersonAddAltIcon />}>Signup</ Button>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/login" className='no-underline'>
                                            <Button variant="contained" startIcon={<LoginIcon />}>Login</Button>
                                        </Link>
                                    </li>

                                </>
                                :
                                <>
                                    <li className="nav-item" onClick={() => setActiveLink('home')}>
                                        <Link to="/home" className='no-underline'>
                                            <Button variant="text" color={activeLink === 'home' ? 'primary' : 'info'} startIcon={<HomeIcon />}>Home</ Button>
                                        </Link>
                                    </li>

                                    <Badge badgeContent={count} color="error">
                                        <li className="nav-item" onClick={() => setActiveLink('room messages')}>
                                            <Link to="/room-messages" className='no-underline' onClick={() => setActiveLink('room message')}>
                                                <Button variant="text" color={activeLink === 'room messages' ? 'primary' : 'info'} startIcon={<ForumIcon />}>Room messages</Button>
                                            </Link>
                                        </li>
                                    </Badge>

                                    <li className="nav-item">
                                        <Link to="/favorite-room" className='no-underline' onClick={() => setActiveLink('favorite room')}>
                                            <Button variant="text" color={activeLink === 'favorite room' ? 'primary' : 'info'} startIcon={<FavoriteIcon />}>Favorite Rooms</Button>
                                        </Link>
                                    </li>

                                    <Button
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                        color={activeLink === 'settings' ? 'primary' : 'info'}
                                        sx={{ display: 'flex', justifyContent: 'center', 'alignItems': 'center' }}
                                    >
                                        <div className="mr-2">
                                            <SettingsIcon />
                                        </div>
                                        <span>Settings</span>

                                    </Button>

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
                                </>
                        }
                    </ul>
                </div>
            </nav>

            {/* MODAL */}

            <MyAccount open={openMyAcc} handleClose={() => setOpenMyAcc(false)} />
        </>
    )
}


export default Navbar
