import axios from 'axios';
import { useEffect, useCallback, useState } from 'react';

const Home = () => {

    const [show, setShow] = useState(false);
    
    // Get Restaurant
    const [data, setData] = useState([]);
    const getData = useCallback(() => {
        axios.get("http://localhost:5000/api/restaurants/getAllRestaurants")
        .then((res) => {
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
            axios.delete(`http://localhost:5000/api/restaurants/${id}`);
        }
        window.location.reload(true);
    }

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [added_by, setAdded_by] = useState("");

    const [eleId, setEleId] = useState(null);
    // Open the edit form
    const openEditForm = (id) => {
        setShow(true);
        setEleId(id);
        axios.get(`http://localhost:5000/api/restaurants/${id}`)
        .then((res) => {
            setName(res.data.name);
            setAddress(res.data.address);
            setContact(res.data.contact);
            setAdded_by(res.data.added_by);
        })
        .catch((err) => console.log(err));
    }

    // Closing the edit form
    const closeModal = ()=>{
        setShow(false);
    }

    // Update request
    const updateDetails = () => {
        const newPayload = {
            name,
            address,
            contact,
            added_by
        }
        if(name === "" || address === "" || contact === ""){
            alert("Field can not be empty!");
        }else{
        axios.put(`http://localhost:5000/api/restaurants/${eleId}`, newPayload)
        .then((res) => {
            setShow(false);
        })
        .catch(err => console.log(err));
        window.location.reload(true);
        }
    }

    //Get users request
    const [userArr, setUserArr] = useState([]);
    const getUser = () => {
        axios.get('http://localhost:5000/api/restaurants/getAllUsers')
        .then((res) => {
            setUserArr(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <div>
            <div className="grid grid-cols-4 gap-4 p-10">
            {
                data.map((item) => {
                    return <div key={item.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col items-center pb-10 p-10">
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{item.name}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{item.address}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{item.contact}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Added By: {item.user.name}</span>
                    <div className="flex mt-4 space-x-3 md:mt-6">
                        <div className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-indigo-900 rounded-lg hover:bg-amber-500 hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-indigo-900 dark:hover:bg-amber-500 dark:focus:ring-blue-800 cursor-pointer"
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
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="col-span-2">
                                    <input type="text" className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
                                    name='address'
                                    value={address}
                                    onChange={(e) => {setAddress(e.target.value)}}
                                    />
                                </div>

                                <div className="col-span-2">
                                    <input type="text" pattern="[0-9]{5}[0-9]{5}" cols="30" rows="8" className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
                                    name='contact'
                                    value={contact}
                                    onChange={(e) => {setContact(e.target.value)}}
                                    />
                                </div>

                            <div className="col-span-2">
                                <select 
                                name='added_by' 
                                className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md"
                                value={added_by}
                                onChange={(e) => {setAdded_by(e.target.value)}}
                                >
                                    {userArr.map((user) => {
                                        return <option key={user.id} value={user.id}>
                                            {user.name}
                                            </option>
                                    })}
                                </select>
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


        </div>

    );
}

export default Home;