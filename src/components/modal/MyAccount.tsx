import React from 'react'
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import { DividerText } from '../pages/others/DividerText';
import useMediaQuery from '@mui/material/useMediaQuery';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));


const style = {
    position: 'absolute' as 'absolute',
    top: '20%',
    right: '10%',
    // transform: 'translate(-50%, -50%)',
    width: '400px',
    padding: 10,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 28,
    p: 4,
};

const mobileScreens = {
    position: 'absolute' as 'absolute',
    top: '15%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '90%',
    padding: 10,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 28,
    p: 4,
}


interface IProps {
    open: boolean,
    handleClose: () => void
}

const MyAccount: React.FC<IProps> = ({ open, handleClose }) => {

    const { user } = useSelector((state: any) => state.auth)

    console.log(user);

    const matches = useMediaQuery('(max-width: 767px)');


    console.log(matches);
    return (
        <>
            {open && (
                <Backdrop sx={{ zIndex: 99 }} open={open} >
                    <ClickAwayListener onClickAway={handleClose}>
                        <Box sx={!matches ? style : mobileScreens}>
                            <Stack direction="row" spacing={3}>
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                    sx={{ alignSelf: 'center' }}
                                >
                                    <Avatar sx={{ bgcolor: '#2563eb' }} alt={String(user.username).toUpperCase()} src="#" />

                                </StyledBadge>
                                <div className='flex space-x-3 items-center grow'>
                                    <div className="flex flex-col space-y-1 grow">
                                        <div className="flex items-center space-x-2">
                                            <AccountCircleIcon fontSize='small' color="info" />
                                            <div className='text-2xl font-bold text-muted'>{user.username}</div>
                                        </div>
                                        <Divider color='#8888' />
                                        {/* <DividerText text='' /> */}

                                        <div className="flex space-x-2 items-center">
                                            <EmailIcon fontSize="small" color="info" />
                                            <div className='text-muted'>{user.email}</div>
                                        </div>
                                    </div>
                                </div>
                            </Stack>
                        </Box>
                    </ClickAwayListener>
                </Backdrop>
            )}

        </>
    )
}

export default MyAccount