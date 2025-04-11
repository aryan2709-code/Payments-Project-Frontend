import { useEffect, useState } from "react"
import { Button } from "./Button.jsx";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
export const Users = () => {
    const [users , setUsers] = useState([]);
    const [filter , setFilter] = useState("");
  
    // Let me think the solution for this , the workflow according to me should be that initially , the user should see all the other users in the databse
    // And when he starts writing somthing in the search bar , then filtered users appear on the screen
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk",{
         headers : {
            Authorization : localStorage.getItem("token")
         }
        })
        .then(response => {
            setUsers(response.data.user)
        })
    },[])

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk" , {
            params : {
                filter : filter
            },
            headers : {
                Authorization : localStorage.getItem("token")
            }
        } ).then(response => {
            setUsers(response.data.user)
        })
    },[filter])

    return <>
    <div className="font-bold mt-6 text-lg">
        Users
    </div>
    <div className="my-2">
        <input onChange={e => {
            setFilter(e.target.value)
        }} type="text" placeholder="Search Users..." className="w-52 px-2 py-1 border rounded border-slate-200"></input>
    </div>
    <div className="flex justify-center">
    <div className="border w-fit flex flex-col " >
        {users.map(user => <User key = {user._id} user = {user}/> )}
    </div>
    </div>
   
    </>
}

function User({user})
{
    const navigate = useNavigate();
    return <div className="flex justify-between gap-8 items-center w-full p-2 ">
        <div className="flex items-center">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full" >
                   <div>
                    {user.firstName} {user.lastName}
                   </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-full">
            <Button onPress={() => {
               navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }} label={"Send Money"} />
        </div>
    </div>


}