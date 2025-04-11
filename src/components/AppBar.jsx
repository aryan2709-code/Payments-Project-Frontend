import axios from "axios";
import { useEffect, useState } from "react"

export const AppBar = () => {
    const[firstName , setFirstName] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/firstName",{
            headers : {
                Authorization : localStorage.getItem("token")
            }
        }).then(response => {
            setFirstName(response.data.firstName)
        })
    })

    return <div className=" shadow h-14 flex justify-between mb-1 bg-blue-200">
        <div className="flex font-semibold flex-col justify-center h-full ml-4 text-red-950 text-3xl text-left">
            PayMate
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                {firstName}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col h-full text-xl justify-center">
                  {firstName[0]}
                </div>
            </div>
        </div>
    </div>
}