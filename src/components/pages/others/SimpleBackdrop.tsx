import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface IProps {
    text: string
}

const SimpleBackdrop: React.FC<IProps> = ({ text }) => {
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <div className='text-center mr-3'>{text}</div>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

export default SimpleBackdrop