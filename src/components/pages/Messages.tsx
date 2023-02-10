import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import { Button, Tooltip } from '@mui/material';
import AOS from 'aos';
import { useParams, useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch';
import CircularProgress from '@mui/material/CircularProgress';
import { updateChats, newChat } from '../../store/reducers/chatsSlice';
import BasicSpeedDial from './others/BasicSpeedDial';
import { useSelector } from 'react-redux';
import { nameShorthand } from './others/NameShorthand';
import { useDispatch } from 'react-redux';
import { localGetOneRoomByIdEndPoint, localJoinRoomEndpoint } from './others/endpoints';
import axios from 'axios';
import { DividerText } from './others/DividerText';


//date format
import { formatDate } from './others/FormatDate';

//socket connection
import { socket } from '../hooks/useSocket';
import SimpleBackdrop from './others/SimpleBackdrop';


const Messages = () => {


    const { id } = useParams();

    const { data, error, loading } = useFetch(localGetOneRoomByIdEndPoint + id)
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [joinedUsersCount, setJoinedUsersCount] = React.useState<number>();

    //react-redux hook 
    const { user } = useSelector((state: any) => state.auth);
    const { chats } = useSelector((state: any) => state.chats);
    const dispatch = useDispatch();

    const [message, setMessage] = React.useState<string>()
    const [joinRoom, setJoinRoom] = React.useState<boolean>(false);

    const navigate = useNavigate();

    //submit handler
    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();


        //send chat details
        if (user && data && message) {
            socket.emit('roomchat', { username: user.username, message, timeStamp: Date(), roomID: data._id });
        }

        //clear input  & focus after message send    
        if (inputRef.current !== null) {
            inputRef.current.value = ''
            inputRef.current.focus();
            setMessage('')

        }

    }

    type dataType = {
        username: string,
        timeStamp: string,
        message: string
    }


    //received messages from the server
    socket.on('receivechat', (data: dataType) => {
        dispatch(updateChats(data))
    })


    React.useEffect(() => {
        AOS.init();
    }, [])

    socket.on('syncChats', (messages: any) => {
        // dispatch(updateChats(messages))
        console.log(messages)
    })


    React.useEffect(() => {
        inputRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chats])

    React.useEffect(() => {
        if (data && user) {
            if (data.joinedUsers.includes(user.username)) {
                setJoinRoom(true);
            }

            //update chatSlice after page rendered
            dispatch(updateChats(data.messages));
        }

        //update the joinedUsers length after data
        data && setJoinedUsersCount(data.joinedUsers.length)
    }, [user, data])

    const [joiningLoading, setJoiningLoading] = React.useState<boolean>(false);

    //join room async
    const joinRoomAsync = async () => {
        setJoiningLoading(true)
        try {
            const response = await axios.post(localJoinRoomEndpoint, { room_name: data.room_name, username: user.username })

            setJoiningLoading(false)
            setJoinRoom(true)
            setJoinedUsersCount(response.data.joinedUsers.length)
        } catch (err: any) {
            console.log(err);

            alert(err.response.data)
            setJoiningLoading(false)
        }

    }

    const [joinText, setJoinText] = React.useState<string>('');

    //join users
    React.useEffect(() => {
        if (joinRoom && user && data) {
            socket.emit('joinuser', { username: user.username, room_name: data.room_name })
        }
    }, [joinRoom])

    //received welcome join message
    socket.on('joinuser', (text: string) => {
        setJoinText(text)
    })

    React.useEffect(() => {
        if (data) {
            socket.emit('joinorleave', ({ type: 'join', roomID: data._id }))
            return () => {
                socket.emit('joinorleave', { type: 'leave', roomID: data._id });
            }
        }

    }, [data])



    return (
        <>
            {loading && <div className="w-full h-[60vh] flex justify-center items-center"><CircularProgress /></div>}

            {joiningLoading && <SimpleBackdrop text='Joining room now ...' />}

            {data &&

                <>
                    <div className='w-full'>
                        <div className='w-full flex flex-col space-y-4'>
                            <div className='p-2  flex justify-between  border-bottom border-gray-600 '>
                                <h1 className="text-3xl font-bold room-name-heading  bg-clip-text text-transparent bg-gradient-to-tr from-blue-600 to-emerald-400">{data.room_name}</h1>

                                <div className='flex flex-col items-center justify-center self-center'>
                                    <span className='font-bold text-emerald-800'>Join users ({joinedUsersCount})</span>
                                </div>

                            </div>

                            {chats.length > 0 && joinRoom && chats.map((chat: any, i: number) => {
                                return (
                                    <div className='flex flex-col space-y-9' key={i}>
                                        {chat.username == user.username ?
                                            (<div className='me min-w-fit flex self-end space-x-5'>
                                                <div className="flex flex-col">
                                                    <div className='p-2 relative self-center  text-white bg-blue-500 rounded-lg message-arrow-right'>{chat.message}</div>
                                                    <div className='text-[10px] text-emerald-900 self-start'>{formatDate(chat.timeStamp)}</div>
                                                </div>
                                                <div className="w-[40px] h-[40px] shrink-0 rounded-full self-start bg-blue-500 font-bold flex justify-center items-center text-white uppercase">{nameShorthand(chat.username)}</div>
                                            </div>)

                                            :

                                            (<div className='others min-w-fit flex self-start space-x-5'>
                                                <div className="w-[40px] h-[40px] shrink-0 rounded-full self-start mt-4 bg-blue-100 font-bold flex border-2 border-emerald-500/50 justify-center items-center text-emerald-900 uppercase">{nameShorthand(chat.username)}</div>
                                                <div className="flex flex-col">
                                                    <div className="font-bold text-emerald-900 ">{chat.username}</div>

                                                    <div className='message-arrow-left self-center  relative p-2 text-emerald-900 bg-blue-100 rounded-lg'>{chat.message}
                                                    </div>
                                                    <div className='text-[10px] text-emerald-900 self-end '>{formatDate(chat.timeStamp)}</div>
                                                </div>

                                            </div>)

                                        }
                                    </div>
                                )
                            })}

                            {/* {joinText && <DividerText text={joinText} />} */}

                        </div>

                        {joinRoom ? (
                            <form action="" onSubmit={handleSubmit} className='w-full  space-x-1 flex justify-center'>
                                <div className='p-3 bg-slate-100 rounded-md flex self-end space-x-4 w-full'>
                                    <input type="text" ref={inputRef} placeholder='Type a message ...' className=' bg-slate-100  grow rounded-md outline-none' onChange={(e: React.SyntheticEvent<HTMLInputElement>) => setMessage(e.currentTarget.value)} />
                                    <Tooltip title='Send message' placement='top' arrow>
                                        <button type='submit'>
                                            <SendIcon color='primary' fontSize='small' />
                                        </button>
                                    </Tooltip>
                                </div>

                                {/* SPEED DIAL */}
                                <BasicSpeedDial username={user.username} room={data} />

                            </form>
                        ) :
                            <div className='w-full h-[50vh] flex justify-center items-center'>
                                <div className='flex justify-center items-center space-y-4  flex-col'>
                                    <Button variant='contained' onClick={joinRoomAsync}>Join room now</Button>
                                    <Button variant='text' onClick={() => navigate('/home')}>Go back</Button>
                                </div>

                            </div>
                        }

                    </div>
                </>
            }
        </>
    )
}

export default Messages
