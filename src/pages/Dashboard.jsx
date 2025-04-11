import { useEffect, useState } from "react"
import { AppBar } from "../components/AppBar.jsx"
import { Balance } from "../components/BalanceComponent.jsx"
import { Users } from "../components/UsersComponent.jsx"
import axios from "axios"

export const DashBoard = () => {
    // Instead of a hardcoded balance , we need to get the actual user balance 
    const [balance , setBalance] = useState(Number);
    useEffect( () => {
        axios.get("http://localhost:3000/api/v1/account/balance" , {
            headers : {
                Authorization : localStorage.getItem("token")
            }
        } ).then(response => {
            setBalance(response.data.balance)
        })
    },[] )

    useEffect( () => {
        axios.get("http://localhost:3000/api/v1/account/balance" , {
            headers : {
                Authorization : localStorage.getItem("token")
            }
        } ).then(response => {
            setBalance(response.data.balance)
        })
    },[balance] )

    
    

    return <div className="p-3">
        <AppBar />
        <Balance value = {balance.toFixed(2)} />
        <Users />
    </div>
}