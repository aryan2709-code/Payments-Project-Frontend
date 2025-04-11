import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/heading"
import { InputBox } from "../components/inputbox"
import { Subheading } from "../components/subheading"
import axios from "axios"
import { useNavigate } from "react-router-dom"


// I need to write the logic for hitting the backend from this page
export const SignInPage = () => {
    const [username , setUsername ] = useState("");
    const [password , setPassword] = useState("");
    const [error , setError] = useState("");
    const [message , setMessage ] = useState("");
    const navigate = useNavigate();

    async function signin() {

      try{
        if(!username || !password)
        {
          setError("Make sure you fill all the entries.")
          return;
        }

       const response =  await axios.post("http://localhost:3000/api/v1/user/signin" , {
            username : username,
            password : password
        })

        // If the control is still here , this means that the request we made is successful.
         const jwt = response.data.token;
         localStorage.setItem("token" , "Bearer " + jwt);

         // Handle successful SignIn
         setMessage("User signed in successfully.")
         setError("");

         //Clear Inputs
         setUsername("");
         setPassword("");

         // Navigate the user to the dashboard
         setTimeout( () => {
            navigate("/dashboard")
         },2000 );
         
      }catch(err){
        // handle the different possible error responses
        if(err.response)
        {
            switch(err.response.status)
            {
                case 411:
                    setError(err.response.data.errors[0]?.message || "Invalid Input")
                    break;
                default :
                    setError("Something went wrong.")

            }
        }
        else
        {
            setError("Network Error Occured");
        }
         setMessage("");
      }

    }

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
        {error.length > 0 && <div className="text-red-600 font-semibold text-center" > {error} </div>}
        {message.length > 0 && <div className="text-green-600 font-semibold text-center" > {message} </div>}
            <div className="rounded-lg bg-white w-80 text-center p-2 h-auto px-4">
            <Heading label={"Sign In"} />
            <Subheading label={"Enter your credentials to access your account"} />
            <InputBox onChange = { e => {
                setUsername(e.target.value)
            } } placeholder={"aryan2709"} label={"Username"} />
            <InputBox onChange = { e => {
                setPassword(e.target.value)
            }}  placeholder={"123456"} label={"Password"} />
            <div className="pt-4">
                <Button onPress={signin} label={"Sign In"} />
            </div>
            <BottomWarning label={"Don't Have an account?"} buttonText={"SignUp"} to={"/signup"} />
            </div>
        </div>
    </div>
}