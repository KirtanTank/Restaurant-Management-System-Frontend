import axios from 'axios';
import { useEffect, useCallback, useState } from 'react';

const Home = () => {

    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);

    // Get Restaurant
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




    // Delete Restaurant
    const deleteRestaurant = (id) => {
        if(window.confirm("Are you sure?")){
            axios.delete(`http://localhost:5000/${id}`);
        }
        window.location.reload(true);
    }

    
    const [state, setState] = useState({
        name: '',
        address: '',
        contact: ''
    }); 

    const { name, address, contact } = state;
    
    const handleInput = (event) => {
        setState({...state, [event.target.name]: event.target.value});
    }    
    const [eleId, setEleId] = useState(null);
    // Open the edit form
    const openEditForm = (id) => {
        setShow(true);
        setEleId(id);
        axios.get(`http://localhost:5000/${id}`)
        .then((res) => {
            // console.log(res.data[0]);
            setState({...res.data[0]})
        })
        .catch((err) => console.log(err));
    }

    const closeModal = ()=>{
        setShow(false);
    }
    const updateDetails = () => {
        axios.put(`http://localhost:5000/${eleId}`, {name, address, contact})
        .then((res) => {
            console.log(res);
            setShow(false);
        })
        .catch(err => console.log(err));
        window.location.reload(true);
    }

    return (
        <>
            <div className="grid grid-cols-4 gap-4 p-10">
            {
                data.map((item) => {
                    return <div key={item.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col items-center pb-10 p-10">
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{item.name}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{item.address}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{item.contact}</span>
                    <div className="flex mt-4 space-x-3 md:mt-6">
                        <div className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                        onClick={() => deleteRestaurant(item.id)}>
                            Delete
                        </div>
                        <div className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 cursor-pointer" onClick={() => openEditForm(item.id)}>
                            Edit
                        </div>
                    </div>
                </div>
            </div>  
            })}      
            </div>


            {show && <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
                <div className="max-w-2xl bg-indigo-900 px-5 m-auto w-fit p-5 rounded-lg">
                        <div className="text-3xl mb-6 text-center text-white">Edit Restaurant Details</div>
                        <form>
                            <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">

                                <div className="col-span-2">
                                    <input type="text" className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
                                    name='name'
                                    value={name || ""}
                                    onChange={handleInput}
                                    required />
                                </div>

                                <div className="col-span-2">
                                    <input type="text" className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
                                    name='address'
                                    value={address || ""}
                                    onChange={handleInput}
                                    required />
                                </div>

                                <div className="col-span-2">
                                    <input type="number" cols="30" rows="8" className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
                                    name='contact'
                                    value={contact || ""}
                                    onChange={handleInput}
                                    required />
                                </div>

                                <div className="col-span-2 lg:col-span-1">
                                    <button type='button' className="py-3 px-6 rounded-md bg-green-500 text-white font-bold w-full sm:w-32" onClick={() => closeModal()}>CANCEL</button>
                                </div>

                                <div className="col-span-2 lg:col-span-1">
                                    <button type='button' className="py-3 px-6 rounded-md bg-green-500 text-white font-bold w-full sm:w-32" onClick={() => updateDetails()} >UPDATE</button>
                                </div>
                            </div>
                        </form>

                    </div>
            </div>}


        </>

    );
}

export default Home;