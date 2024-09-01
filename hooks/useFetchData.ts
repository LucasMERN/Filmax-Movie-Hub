import { useState, useEffect } from "react";

type DataSetFunction = (url: string) => Promise<any>;

const useFetchData = (dataSetFunction: DataSetFunction, url: string) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dataSetFunction(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dataSetFunction, url]);

  return data;
};

export default useFetchData;
