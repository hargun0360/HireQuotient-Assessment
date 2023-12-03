import React , {useEffect , useState} from 'react'
import useFetchData from '../Hooks/useFetchData'
import { FETCH_DATA_URL } from '../Constant';
const AdminPage = () => {
  const data = useFetchData(FETCH_DATA_URL);
  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    if (data) {
      setFetchData(data);
    }
  }, [data]);


  return (<>

  </>)
}

export default AdminPage