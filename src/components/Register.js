import {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [newRestaurant, setNewRestaurant] = useState({
        name: '',
        address: '',
        contact: '',
        added_by: ''
    }); 
    
    const navigate = useNavigate();

    const handleInput = (event) => {
        setNewRestaurant({...newRestaurant, [event.target.name]: event.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Add new restaurant
        axios.post('http://localhost:5000/api/restaurants/addRestaurants', newRestaurant)
        .then(() => {
            setNewRestaurant({
                name: '',
                address: '',
                contact: '',
                added_by: ''
            });
            navigate("/");
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        getUser();
    }, [])

    // Get users request
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

    return (
        <div className="m-10">
            <div className="max-w-2xl bg-white px-5 m-auto w-full border border-gray-200 rounded-lg shadow-2xl flex flex-col p-16">
                <div className="text-3xl mb-6 text-center ">ADD RESTAURANT</div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">

                        <div className="col-span-2">
                            <input type="text" name='name' onChange={handleInput} className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md" id="restaurantName" placeholder="Restaurant Name" required />
                        </div>

                        <div className="col-span-2">
                            <input type="text" name='address' onChange={handleInput} className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md" id="restaurantAddress" placeholder="Address" required />
                        </div>

                        <div className="col-span-2">
                            <input type='text' pattern='[0-9]{5}[0-9]{5}' name='contact' onChange={handleInput} cols="30" rows="8" className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md" id="restaurantContact" placeholder="Contact Number(99999-99999)" required />
                        </div>

                        <div className="col-span-2">
                        <select className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md" defaultValue={'DEFAULT'}onChange={handleInput} name='added_by'>
                            <option value={'DEFAULT'} disabled>Choose user</option>
                        {userArr.map((user) => {
                            return <option key={user.id} value={user.id} onChange={(e) => {console.log(e.target.value)}}>{user.name}</option>})}
                        </select>
                        </div>

                        <div className="col-span-2 text-right">
                            <button className="py-3 px-6  rounded-md bg-green-500 text-white font-bold w-full sm:w-32">CREATE</button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default Register;