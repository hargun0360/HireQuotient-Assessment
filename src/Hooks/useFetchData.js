import {useState , useEffect} from 'react'

const useFetchData = (url) => {
    const [Data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          const fetchedData = await fetch(url);
          const data = await fetchedData.json();
          setData(data);
        };
        fetchData();
      }, []);

      return Data;
}

export default useFetchData