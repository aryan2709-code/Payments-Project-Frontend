import { Heading } from "../components/heading.jsx"
import { Button } from "../components/Button.jsx"
import { InputBox } from "../components/inputbox.jsx"
import { Subheading } from "../components/subheading.jsx"
import { BottomWarning } from "../components/BottomWarning.jsx"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export function SignUpPage() {
  const [firstName , setFirstName] = useState("");
  const [lastName , setLastName] = useState("");
  const [username  , setUsername] = useState("");
  const [password , setPassword] = useState("");
  const [error , setError] = useState("");
  const [pin , setPin] = useState("");
  const [message , setMessage ] = useState("");
  const navigate = useNavigate();
  // Moving the backend hitting logic to a separate function in order to ensure better modularity
  const signup = async() => {
    try{
        
        if(!username || !password || !firstName || !lastName || !pin)
        {
             setError("One or more of required entries is missing");
             return;
        }

        await axios.post("http://localhost:3000/api/v1/user/signup" , {
            firstName : firstName,
            lastName : lastName,
            password : password,
            username : username,
            pin : pin
        } )
         // If the control still stays here , it means that the request we made is successful 
         setMessage("User Signed Up Successfully!");
         setError("");

         // Clear the inputs
         setFirstName("");
         setLastName("");
         setPassword("");
         setUsername("");
         setPin("")

         // Navigate the user to sign in page
         // Trying to add a setTimeout here , so that the user is able to see the message on the screen

         setTimeout(() => {
            navigate("/signin")
         },2000)

    }catch(err){
        // Handle the different possible error responses
        if(err.response)
        {
            switch(err.response.status)
            {
                case 403:
                setError("A User already exists with this username.");
                break;
                case 411:
                setError(err.response.data.errors[0]?.message || "Invalid Input");
                break;
                default:
                setError(err.response.data.message || "Something Went Wrong");

            }
        }
        else
        {
            setError("Network Error Occured");
        }
       setMessage("");
    }
  }

      
    return <div className="bg-slate-300 h-screen flex justify-center ">
           <div className="flex flex-col justify-center">
            {error.length > 0 && <div className="text-red-600 font-semibold text-center" > {error} </div>}
            {message.length > 0 && <div className="text-green-600 font-semibold text-center" > {message} </div>}
            <div className="rounded-lg bg-white w-80 text-center p-2 h-auto px-4">
                <Heading label = {"Sign Up"} />
                <Subheading label={"Enter Your Information to create an account"} />
                <InputBox onChange = { e => {
                    setFirstName(e.target.value)
                } } placeholder={"Aryan"} label={"First Name"} />
                <InputBox onChange = {e => {setLastName(e.target.value)} } placeholder={"Sharma"} label={"Last Name"} />
                <InputBox onChange = {e => {setUsername(e.target.value)}} placeholder={"aryan@gmail.com"} label={"Username"} />
                <InputBox onChange = { e => {setPassword(e.target.value)}} placeholder={"123456"} label={"Password"} />
                <InputBox onChange= {e => {setPin(e.target.value)}} placeholder={"Add a four digit pin."} label={"Payment Pin"} />
                <div className="pt-4">
                    <Button onPress = {signup} label={"Sign Up"} />
                </div>
                <BottomWarning label={"Already Have an Account?"} buttonText={"Sign In"} to = {"/signin"} />
            </div>
           </div>
    </div>
}