import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import ForumIcon from '@mui/icons-material/Forum';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, handleError } from '../../store/reducers/authSlice';
import axios from 'axios';
import { localCreateRoomEndPoint, localGetOneRoomByRooNameEndPoint, localLoginEndPoint } from '../pages/others/endpoints';

interface State {
    // amount: string;
    password: string;
    // weight: string;
    // weightRange: string;
    showPassword: boolean;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80vh',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 28,
    p: 4,
};

const responsiveStyle = {
    width: '100%',
    height: '100vh',
    borderRadius: '0',
    bgcolor: 'white',
}

interface IProps {
    openJoinRoomModal: boolean,
    setOpenJoinRoomModal: (x: boolean) => void
}

const JoinRoomModal: React.FC<IProps> = ({ openJoinRoomModal, setOpenJoinRoomModal }) => {

    const matches = useMediaQuery('(max-width: 600px)');

    const { user: auth } = useSelector((state: any) => state.auth)

    const [roomName, setRoomName] = React.useState<string>('');
    const [roomID, setRoomID] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');

    const [values, setValues] = React.useState<State>({
        // amount: '',
        password: '',
        // weight: '',
        // weightRange: '',
        showPassword: false,
    });

    const dispatch = useDispatch();
    const { err } = useSelector((state: any) => state.auth);
    const navigate = useNavigate();

    //close modal
    const handleClose = () => {
        setOpenJoinRoomModal(false);

        dispatch(handleError(''))

    };
    //fetch user status
    const [user, setUser] = React.useState()
    const [error, setError] = React.useState<string>()
    const [loading, setLoading] = React.useState(false)

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetchUser(email, values.password)

    }

    //Async login
    async function fetchUser(email: string, password: string) {
        setLoading(true);

        try {

            let loginRes: any
            let roomRes;

            if (!auth.username) {
                loginRes = await axios.post(localLoginEndPoint, { email, password })

                roomRes = await axios.get(localGetOneRoomByRooNameEndPoint + roomName.trim());
                dispatch(login(loginRes.data))


            } else {
                roomRes = await axios.get(localGetOneRoomByRooNameEndPoint + roomName.trim());
                setUser(auth)
                dispatch(login(auth))


            }

            setRoomID(roomRes.data._id);
            setLoading(false);
        } catch (err: any) {
            setError(err.response.data.error);
            setLoading(false)
        }
    }

    //sucess
    React.useEffect(() => {
        if (roomID) navigate('/room/' + roomID);
    }, [roomID])

    //errror
    React.useEffect(() => {
        if (!undefined) {
            if (error) {
                dispatch(handleError(error))
            }
        }

    }, [error])

    return (
        <div>
            <Modal
                open={openJoinRoomModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={matches ? responsiveStyle : style}>

                    <div className="container-fluid">
                        <h1 className='createroom-heading bg-clip-text text-transparent bg-gradient-to-tr from-emerald-400 to-blue-600 text-center pt-3'>
                            Join  Room
                        </h1>
                        <form action="" className='w-full md:w-1/2 mx-auto mt-5 items-center justify-center flex flex-col' onSubmit={handleSubmit}>
                            <Stack direction='column' spacing={3} sx={{ width: '100%' }}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <ForumIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField id="Roomname" color='secondary' type="roomname" label="Enter room name" variant="standard" sx={{ width: '100%' }} required onChange={(e) => setRoomName(e.currentTarget.value)} />
                                </Box>

                                {!auth.username ? <>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField id="Email" color='secondary' type="email" label="Email" variant="standard" sx={{ width: '100%' }} required onChange={(e) => setEmail(e.currentTarget.value)} />
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <FormControl sx={{ m: 0, width: '100%' }} color="secondary" variant="standard">
                                            <InputLabel htmlFor="standard-adornment-password">Password</
                                            InputLabel>
                                            <Input
                                                id="standard-adornment-password"
                                                type={values.showPassword ? 'text' : 'password'}
                                                value={values.password}
                                                onChange={handleChange('password')}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                        >
                                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </Box>

                                </> : ''}

                            </Stack>

                            <button disabled={loading} type="submit" className={`${loading ? 'bg-gray-300 text-gray-700' : 'bg-gradient-to-br from-emerald-400'} to-blue-600 transition-all duration-200 self-start outline-none border-0 mt-5 font-bold text-white  rounded-md px-4 py-2`}>{loading ? 'loading ...' : 'Join now'}</button>
                            {err ? <Alert severity='error' sx={{ marginTop: '15px', alignSelf: 'start', width: '100%' }}>{err}</Alert> : ''}
                            <div className="small-text self-start mt-3 text-muted">Don't have an account ? <Link to="/signup">Signup</Link></div>
                        </form>
                    </div>

                    <button className='flex flex-col absolute top-5 right-5 items-center justify-center' onClick={handleClose}>
                        <HighlightOffIcon />
                    </button>
                </Box>
            </Modal>
        </div>
    );
}

export default JoinRoomModal;