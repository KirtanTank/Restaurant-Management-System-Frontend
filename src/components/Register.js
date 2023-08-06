import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [newRestaurant, setNewRestaurant] = useState({
        name: '',
        address: '',
        contact: ''
    }); 
    
    const navigate = useNavigate();

    const handleInput = (event) => {
        setNewRestaurant({...newRestaurant, [event.target.name]: event.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Post new restaurant
        // console.log(newRestaurant);
        axios.post('http://localhost:5000/addRestaurant', newRestaurant)
        .then(() => {
            // console.log(res);
            setNewRestaurant({
                name: '',
                address: '',
                contact: ''
            });
            navigate("/");
        })
        .catch(err => console.log(err));
    }
    return (
        <div className="max-w-2xl bg-white px-5 m-auto w-full">
            <div className="text-3xl mb-6 text-center ">Add Restaurant</div>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">

                    <div className="col-span-2">
                        <input type="text" name='name' onChange={handleInput} className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md" id="restaurantName" placeholder="Restaurant Name" required />
                    </div>

                    <div className="col-span-2">
                        <input type="text" name='address' onChange={handleInput} className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md" id="restaurantAddress" placeholder="Address" required />
                    </div>

                    <div className="col-span-2">
                        <input type="number" name='contact' onChange={handleInput} cols="30" rows="8" className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md" id="restaurantContact" placeholder="Contact Number" required />
                    </div>

                    <div className="col-span-2 text-right">
                        <button className="py-3 px-6  rounded-md bg-green-500 text-white font-bold w-full sm:w-32">CREATE</button>
                    </div>
                </div>
            </form>

        </div>
    );
}

export default Register;