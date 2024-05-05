import { useState, useEffect } from 'react';

type DataSetFunction = () => Promise<Response>;

const useFetchData = (dataSetFunction: DataSetFunction) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dataSetFunction();
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dataSetFunction]);

  return data;
};

export default useFetchData;