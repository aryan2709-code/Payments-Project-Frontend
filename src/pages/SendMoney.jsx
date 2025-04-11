import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const inputref = useRef(null);
    const [message , setMessage] = useState("");
    const [error , setError] = useState("");
    const navigate  = useNavigate();

    const transfer = async() => {
      try{
        
        // Clear the previous messages 
        setError("");
        setMessage("");

        // Get The Id And Amount 
        const amount = inputref.current.value;
        const to = id;

        if(!amount)
        {
            setError("Enter The Amount Please");
            return;
        }

        // make the backend request
     const response =  await axios.post("http://localhost:3000/api/v1/account/transfer" , {
            amount : amount,
            to : to
        } , {
            headers : {
                Authorization : localStorage.getItem("token")
            }
        } )

        // If the control is still here , this means that the request is successful
       setMessage(response.data.message)

       // Navigate the user back to the dashboard after 2 seconds
       setTimeout(() => {
        navigate("/dashboard")
       },2000)


      }catch(err){
          if(err.response) // Server responded with a status code more than 2xx
          {
              setError(err.response.data.message)
          }else{
            // Network Error , there was no response from server
            setError("Something went wrong. Please try again later.")
          }
      }
         setMessage("");
    }
     
    return <div class="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                class="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div class="flex flex-col space-y-1.5 p-6">
                <h2 class="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div class="p-6">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span class="text-2xl text-white">{name[0]}</span>
                    </div>
                    <h3 class="text-2xl font-semibold">{name}</h3>
                </div>
                <div class="space-y-4">
                    <div class="space-y-2">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="amount"
                    >
                        Amount (in Rs)
                    </label>
                    <input
                        ref = {inputref}
                        type="number"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        placeholder="Enter amount"
                    />
                    </div>
 
                    {error && (
        <div className="text-red-600 text-sm font-medium">
            {error}
        </div>
    )}
    {message && (
        <div className="text-green-600 text-sm font-medium">
            {message}
        </div>
    )}

                    <button onClick={transfer} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                        Initiate Transfer
                    </button>
                </div>
                </div>
        </div>
      </div>
    </div>
}