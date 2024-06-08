import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { VITE_BACKEND_URL } from "../App";

const CreateResturent=() => {

    const [name, setName] = useState("");
    const [Detail, setDetail] = useState("");
    const [Price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [Location, setLocation]= useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const saveResturent = async(e) => {
        e.preventDefault();
        if(name === "" || Detail === "" || Price === "" || image === ""|| Location === ""){
            alert('Please fill out all input completely');
            return;
        }
        try{
            setIsLoading(true);
            const response = await axios.post(`${VITE_BACKEND_URL}/api/resturent`, {name: name, Detail: Detail, Price: Price, image: image, Location: Location});
            toast.success(`Save ${response.data.name} sucessfully`);
            setIsLoading(false);
            navigate("/");
        }catch (error){
            toast.error(error.message);
            setIsLoading(false);
        }
    }

    return(
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
        <h2 className="font-semibold text-2xl mb-4 block text-center">
            Create a Resturent
        </h2>
        <form onSubmit={saveResturent}> 
            <div className="space-y-2">
                <div>
                    <label>Name</label>
                     <input type="text" value={name} onChange={(e) => setName(e.target.value)}  
                    className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Name" />
                </div>
                <div>
                    <label>Hotel Rating</label>
                    <input type="text" value={Detail} onChange={(e) => setDetail(e.target.value)} 
                    className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Hotel Rate" />
                </div>
                <div>
                    <label>Price</label>
                    <input type="number" value={Price} onChange={(e) => setPrice(e.target.value)}  
                    className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Price" />
                </div>
                <div>
                    <label>Location</label>
                    <input type="text" value={Location} onChange={(e) => setLocation(e.target.value)}  
                    className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Location" />
                </div>
                <div>
                    <label>Image URL</label>
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} 
                    className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Image URL" />
                </div>
                <div>
                    { !isLoading && ( <button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Save</button>)}         
                </div>
            </div>
        </form>
    </div>
    )
}

export default CreateResturent;