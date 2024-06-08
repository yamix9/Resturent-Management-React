import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../App";

const EditResturent=() => {
  

    let { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [ resturent, setResturent] = useState({
        name: "",
        Detail: "",
        Price: "",
        image: "",
        Location:"",
    });

    const getResturent = async () => {
        setIsLoading(true);
        try{
            // const response = await axios.get(`${VITE_BACKEND_URL}/api/resturent/${id}`);
            const response = await axios.get(`http://localhost:3000/api/resturent/${id}`);
            setResturent({
                name: response.data.name,
                Detail: response.data.Detail,
                Price: response.data.Price,
                Location: response.data.Location,
                image: response.data.image,

            })
            setIsLoading(false);

        }catch(error){
            setIsLoading(false);
            toast.error(error.message);
        }
     

    }

    const updateResturent = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try{
            await axios.put(`${VITE_BACKEND_URL}/api/resturent/${id}`, resturent);
            // await axios.put(`http://localhost:3000/api/resturent/${id}`,resturent);
            toast.success("Update a Resturent successfully");
            navigate('/');
        }catch(error){
            setIsLoading(false);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getResturent();
    }, [])

    return(
       

        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
        <h2 className="font-semibold text-2xl mb-4 block text-center">
            Update Resturent 
        </h2>
        { isLoading ? ("Loading") : (
            <>
                <form onSubmit={updateResturent}>
                    <div className="space-y-2">
                        <div>
                            <label>Name</label>
                            <input type="text" value={resturent.name} onChange={(e) => setResturent({...resturent, name: e.target.value})}  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Name" />
                        </div>
                        <div>
                            <label>Hotel Rate</label>
                            <input type="text" value={resturent.Detail} onChange={(e) => setResturent({...resturent, Detail: e.target.value})}  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Hotel Rate" />
                        </div>
                        <div>
                            <label>Price</label>
                            <input type="number" value={resturent.Price} onChange={(e) => setResturent({...resturent, Price: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Price" />
                        </div>
                        <div>
                            <label>Location</label>
                            <input type="text" value={resturent.Location} onChange={(e) => setResturent({...resturent, quantity: e.target.value})}  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Quantity" />
                        </div>
                        <div>
                            <label>Image URL</label>
                            <input type="text" value={resturent.image} onChange={(e) => setResturent({...resturent, image: e.target.value})}  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Image URL" />
                        </div>
                        <div>
                            { !isLoading && ( <button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Update</button>)}         
                        </div>
                    </div>
                </form>
            </>
        )}

    </div>
    )
}

export default EditResturent;