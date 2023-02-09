import React from 'react'
import Navbar from './components/layouts/Navbar'
import Hero from './components/layouts/Hero'
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import OfflineBottomNav from './components/layouts/OfflineBottomNav';
import OnlineBottomNav from './components/layouts/OnlineBottomNav';
import Home from './components/pages/Home';
import RoomMessages from './components/pages/RoomMessages';
import FavoriteChatRoom from './components/pages/FavoriteChatRoom';
import Messages from './components/pages/Messages';
import 'aos/dist/aos.css';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './store/reducers/authSlice';
import MyAccount from './components/modal/MyAccount';

//socket connection
import { socket } from './components/hooks/useSocket';

const theme = createTheme({
    palette: {
        secondary: {
            main: '#00c853'
        },
        primary: {
            main: '#2563eb'
        },
        info: {
            main: '#888'
        }
    }
})



const App = () => {
    const { user, err } = useSelector((state: any) => state.auth);
    const { chats } = useSelector((state: any) => state.chats);
    const [count, setCount] = React.useState();
    const dispatch = useDispatch();

    socket.on('newMessages', (data: any) => {
        console.log(data);
    })
    React.useEffect(() => {
        const localUser = localStorage.getItem('user');
        if (localUser) {
            dispatch(login(JSON.parse(localUser)))
        }

    }, [])

    React.useEffect(() => {
        if (user.username) {
            //get username and push to the server
            socket.emit('getUsername', user.username)
        }
    }, [user])

    // socket.emit('test', 'testing');

    return (
        <ThemeProvider theme={theme}>
            <div className='container-lg'>
                <Navbar count={count} />
                <main className='container-md mt-[30%] sm:mt-[20%] md:mt-[18%] lg:mt-[13%] mb-16'>
                    <Routes>
                        <Route path="/" element={<Hero />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path='home' element={<Home />} />
                        <Route path='/room-messages' element={<RoomMessages />} />
                        <Route path='/favorite-room' element={<FavoriteChatRoom />} />
                        <Route path='/room/:id' element={<Messages />} />fav
                    </Routes>
                </main>

                {user.email ? <OnlineBottomNav /> : <OfflineBottomNav />}
            </div>
        </ThemeProvider>
    )
}

export default App