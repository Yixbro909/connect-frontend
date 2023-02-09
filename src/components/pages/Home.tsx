import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Error from '@mui/icons-material/Error';
import FavChatAds from './ads/FavChatAds';
import RecentChatAds from './ads/RecentChat';
import SearchResult from './others/SearchResult';
import useFetch from '../hooks/useFetch';
import axios from 'axios';
import { localGetAllRoomsEndPoint, localGetOneRoomByRooNameEndPoint } from './others/endpoints';
import DisplayNetworkErr from '../pages/others/DisplayNetworkErr';

const Home = () => {

    const { data, loading, error } = useFetch(localGetAllRoomsEndPoint);

    // error && console.log(error)

    const [searchValue, setSearchValue] = React.useState<string>('');
    const [searchResult, setSearchResult] = React.useState<any[]>([]);
    const [searchErr, setSearchErr] = React.useState<string>('');

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchErr('');
        searchAsync();

        if (searchValue === '' && data) {
            setSearchResult(data);
        }

    }

    //search for room async
    const searchAsync = async () => {

        if (searchValue) {
            try {
                const room = await axios.get(localGetOneRoomByRooNameEndPoint + searchValue?.trim());
                setSearchResult([room.data]);
            } catch (err: any) {
                if (err.response.status === 400) {
                    setSearchErr(searchValue + " is not found")
                }
            }
        }

    }

    React.useEffect(() => {
        setSearchResult(data);
    }, [data]);

    return (
        <>
            <div className='row'>
                <form className='flex flex-col mb-2 w-full' onSubmit={handleSubmit}>
                    <h6 className="text-muted font-bold">Search for Room</h6>
                    <div className='flex bg-slate-100 py-2 px-3 rounded-md'>
                        <input type="search" placeholder='Enter room name' className='grow border-0 outline-none bg-transparent' onChange={(e) => setSearchValue(e.currentTarget.value)} />
                        <button className='self-center text-center' role="button" type="submit">
                            <SearchIcon />
                        </button>
                    </div>
                </form>
                <div className='col-md-7'>

                    <div className='flex flex-col space-y-3'>

                        <SearchResult searchResult={searchResult} loading={loading} searchErr={searchErr} error={error} />

                    </div>
                </div>
                <div className="d-none d-md-flex col-md-5 w-full">
                    <div className="w-full flex-col space-y-8 flex items-end">
                        {!loading && !error ?
                            <>
                                <FavChatAds />

                                <RecentChatAds />
                            </>
                            :
                            ''
                        }
                    </div>

                </div>


            </div>
            {/* DISPLAY NETWORK ERROR */}
            {error && <DisplayNetworkErr text={error} />}
        </>
    )
}

export default Home
