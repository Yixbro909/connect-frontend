import React from 'react'
import axios from 'axios';

interface IData {
  createdAt: string,
  room_name: string,
  updatedAt: string,
  _id: string,
  creator: string
}

const useFetch = (url: string) => {
  const [data, setData] = React.useState<any>()
  const [error, setError] = React.useState<any>()
  const [loading, setLoading] = React.useState<boolean>(true)


  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data)
        setLoading(false);
      } catch (err: any) {
        if (err.code === 'ERR_NETWORK') {
          setError(err.message)
          // console.log(err.message)
        }
        else if (err.response.status === 404) {
          setError(err.message);
          // console.log(err)
        } else {
          setError(err.response.data);
          // console.log(err)
        }
        setLoading(false);
      }
    }
    fetchData();
  }, [])

  return { data, error, loading };
}

export default useFetch
