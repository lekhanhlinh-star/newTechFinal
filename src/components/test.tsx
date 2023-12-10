import {useEffect} from "react";
import MajorAPI from "../api/MajorAPI";

function Test(){
    useEffect(() => {
        const fetchData= async ()=>{
            const params={
                page:1,
                limit:5

            }
            const data=await MajorAPI.getAllMajor(params)
            console.log(data.data)
        }

        fetchData()

    }, []);

    return(
        <>
        </>
    )
}
export default Test;