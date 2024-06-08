import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { VITE_BACKEND_URL } from "../App";



const Resturent1 = ({resturent, getResturents }) => {

    const deleteResturent = async (id) => {
        const result = await Swal.fire({
            title: 'Do you really want to delete the resturent?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'

        })
        if(result.isConfirmed){
            try{
                await axios.delete(`${VITE_BACKEND_URL}/api/resturent/${id}`,);
                toast.success("Delete a resturent successfully");
                getResturents();
            }catch(error){
                toast.error(error.message);
            }
        }

    }
    
    return (
     
        <div className="bg-white rounded shadow-lg overflow-hidden">
            <img src={resturent.image} className="w-full h-28 object-cover" />
            <div className="px-4 pt-2 pb-4">
                <h2 className="text font-semibold">  {resturent.name}</h2>
                <div className="text-sm">Hotel Rate: {resturent.Detail}</div>
                <div className="text-sm">Location  : {resturent.Location}</div>
                <div className="text-sm">Room Price: LKR{resturent.Price}</div>
            

                <div className="mt-2 flex gap-4">
                    <Link to={`/edit/${resturent._id}`} className="inline-block w-full text-center shadow-md text-sm bg-gray-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-gray-600 hover:cursor-pointer">Edit</Link>
                    
                    <button onClick={() => deleteResturent(resturent._id)}  className="inline-block w-full text-center shadow-md text-sm bg-red-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-red-600 hover:cursor-pointer">Delete</button>
                   

                </div>


            </div>
         

        </div>
    )
}
export default Resturent1;