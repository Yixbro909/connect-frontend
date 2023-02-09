import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ToolTip from '@mui/material/Tooltip';
import HomeIcon from '@mui/icons-material/Home';

const OfflineBottomNav = () => {
    const navigate = useNavigate();

    const [login, setLogin] = React.useState<boolean>(true);
    const [value, setValue] = React.useState('home');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    //not login user
    const navigateStarter = () => navigate('/')
    const navigateSignup = () => navigate('signup/')
    const navigateLogin = () => navigate('/login')

    return (

        <div className="w-full fixed bg-emerald-400/30 shadow-lg   bottom-0 left-0 md:hidden">
            <BottomNavigation sx={{ width: '100%' }} value={value} onChange={handleChange}>

                <BottomNavigationAction
                    label="Home"
                    value="home"
                    icon={<HomeIcon />}
                    onClick={navigateStarter}
                />

                <BottomNavigationAction
                    label="Signup"
                    value="signup"
                    icon={<PersonAddAltIcon />}
                    onClick={navigateSignup}
                />

                <BottomNavigationAction
                    label="Login"
                    value="login"
                    icon={<LoginIcon />}
                    onClick={navigateLogin}
                />

            </BottomNavigation>
        </div>
    );
}

export default OfflineBottomNav