import {useState} from 'react';

const Register = () => {

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const RestaurantPayload = {
            address,
            contact,
            name
        }
        // console.log(VendorPayload);
        // Send Data to Server
       
        setAddress("");
        setContact("");
        setName("");
    }
    return (
        <div className="max-w-2xl bg-white px-5 m-auto w-full">
            <div className="text-3xl mb-6 text-center ">Add Restaurant</div>
            <form>
                <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">

                    <div className="col-span-2">
                        <input type="text" value={name} onChange={({ target }) => setName(target.value)} className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md" id="vendorName" placeholder="Restaurant Name" required />
                    </div>

                    <div className="col-span-2">
                        <input type="text" value={address} onChange={({ target }) => setAddress(target.value)} className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md" id="bankName" placeholder="Address" required />
                    </div>

                    <div className="col-span-2">
                        <input type="number" value={contact} onChange={({ target }) => setContact(target.value)} cols="30" rows="8" className="border-solid border-gray-400 border-2 p-3 md:text-xl w-full rounded-md" id="accNumber" placeholder="Contact Number" required />
                    </div>

                    <div className="col-span-2 text-right">
                        <button className="py-3 px-6  rounded-md bg-green-500 text-white font-bold w-full sm:w-32" type="submit" onClick={handleSubmit}>CREATE</button>
                    </div>
                </div>
            </form>

        </div>
    );
}

export default Register;