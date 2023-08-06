import axios from 'axios';
import { useEffect, useCallback, useState } from 'react';

const Home = () => {

    const [data, setData] = useState([]);

    const getData = useCallback(() => {
        axios.get("http://localhost:5000/")
        .then((res) => {
            // console.log(res.data);
            setData(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);
    
    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <div className="grid grid-cols-4 gap-4 p-10">
        {
        data.map((item) => {
        return <div key={item.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-10 p-10">
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{item.name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{item.address}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{item.contact}</span>
                <div className="flex mt-4 space-x-3 md:mt-6">
                    <div className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">
                        Delete
                    </div>
                    <div className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 cursor-pointer">
                        Edit
                    </div>
                </div>
            </div>
        </div>  
        })}      
        </div>

    );
}

export default Home;