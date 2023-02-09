import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert';

//redux actions
import { useDispatch, useSelector } from 'react-redux';
import { login, handleError } from '../../store/reducers/authSlice'
import { localSignupEndPoint } from './others/endpoints';

interface State {
    // amount: string;
    password: string;
    // weight: string;
    // weightRange: string;
    showPassword: boolean;
}


const SignupPage = () => {

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const [values, setValues] = React.useState<State>({
        // amount: '',
        password: '',
        // weight: '',
        // weightRange: '',
        showPassword: false,
    });

    //fetch user status
    const [user, setUser] = React.useState<string>()
    const [error, setError] = React.useState<string>()
    const [loading, setLoading] = React.useState<boolean>(false)

    //dispatch and get state
    const dispatch = useDispatch();
    const { err } = useSelector((state: any) => state.auth)

    const navigate = useNavigate();

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

        fetchUser(email, values.password, username);
    }


    //Asynclogin
    async function fetchUser(email: string, password: string, username: string) {
        setLoading(true)

        try {
            const response = await axios.post(localSignupEndPoint, { email, password, username });
            setLoading(false);
            setUser(response.data);
        } catch (err: any) {
            setLoading(false);
            setError(err.response.data.error);
        }
    }

    React.useEffect(() => {
        dispatch(handleError(''))
    }, [])

    //sucess
    React.useEffect(() => {
        if (!undefined) {
            if (user) {
                dispatch(login(user))
                navigate('/home');
            }
        }

    }, [user])

    //errror
    React.useEffect(() => {
        if (!undefined) {
            if (error) {
                dispatch(handleError(error))
            }
        }

    }, [error])


    return (
        <div className='row justify-center items-center h-[80vh]'>
            <div className="col-md-9 col-lg-6 p-5 backdrop-blur-md bg-gradient-to-t from-emerald-50/60 to-transparent  md:shadow-md shadow-blue-500/30  rounded-md">
                <h1 className=" text-blue-600 tracking-wide" id="login-heading">
                    Signup
                </h1>
                <form action="" className='flex flex-col mt-5' onSubmit={handleSubmit}>
                    <Stack direction='column' spacing={3}>

                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="username" label="Username" variant="standard" sx={{ width: '100%' }} required onChange={(e) => setUsername(e.currentTarget.value)} value={username} />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="Email" type="email" label="Email" variant="standard" sx={{ width: '100%' }} required onChange={(e) => setEmail(e.currentTarget.value)} value={email} />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <FormControl sx={{ m: 0, width: '100%' }} variant="standard">
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
                    </Stack>

                    <div className="mt-5 self-start">
                        <Button variant='contained' type="submit" disabled={loading}>{loading ? 'Loading...' : 'Signup'}</Button>
                    </div>

                    {err ? <Alert severity='error' sx={{ marginTop: '15px' }}>{err}</Alert> : ''}
                    <div className="small-text mt-3 text-muted">Do you have account ?  <Link to="/login">Login</Link></div>
                </form>
            </div>
        </div>
    )
}

export default SignupPage