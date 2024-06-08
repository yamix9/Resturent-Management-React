import { useEffect, useState } from "react";
import axios from "axios";
import Resturent1 from "../component/Resturent1.jsx"
import { VITE_BACKEND_URL } from "../App";

const HomePage=() => {
    const [resturents,setResturents] = useState([]);
    const [isLoading,setIsLoading] = useState(false);

    const getResturents = async () =>{

        try {
            setIsLoading(true);
            const response = await axios.get(`${VITE_BACKEND_URL}/api/resturent/`);
            console.log(response.data);
            setResturents(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }


    }
    useEffect(() => {
        getResturents();
    },[])
    return(
        <div>
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt=5">
             {isLoading ? (
                "Loading"
             ): (
                <>
                    {
                        resturents.length > 0 ? (

                            <>
                            {
                                resturents.map((resturent, index) => {
                                    return (
                                       <Resturent1 key={index} resturent={resturent}getResturents={getResturents}/>
                                    )
                                })
                            }
                            </>
                        ) : (

                            <div>
                                There is no resturent
                            </div>
                        )
                        
                    }
                </>
             )}

             </div>
        </div>
    )
}

export default HomePage;