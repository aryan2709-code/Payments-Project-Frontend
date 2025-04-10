import { Heading } from "../components/heading.jsx"
import { Button } from "../components/Button.jsx"
import { InputBox } from "../components/inputbox.jsx"
import { Subheading } from "../components/subheading.jsx"
import { BottomWarning } from "../components/BottomWarning.jsx"
import { useState } from "react"
import axios from "axios"
export function SignUpPage() {
  const [firstName , setFirstName] = useState("");
  const [lastName , setLastName] = useState("");
  const [username  , setUsername] = useState("");
  const [password , setPassword] = useState("");

  

    return <div className="bg-slate-300 h-screen flex justify-center ">
           <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-auto px-4">
                <Heading label = {"Sign Up"} />
                <Subheading label={"Enter Your Information to create an account"} />
                <InputBox onChange = { e => {
                    setFirstName(e.target.value)
                } } placeholder={"Aryan"} label={"First Name"} />
                <InputBox onChange = {e => {setLastName(e.target.value)} } placeholder={"Sharma"} label={"Last Name"} />
                <InputBox onChange = {e => {setUsername(e.target.value)}} placeholder={"aryan@gmail.com"} label={"Username"} />
                <InputBox onChange = { e => {setPassword(e.target.value)}} placeholder={"123456"} label={"Password"} />
                <div className="pt-4">
                    <Button onPress={() => {
                        axios.post("http://localhost:3000/api/v1/user/signup" , {
                            username : username,
                            password : password,
                            firstName : firstName,
                            lastName : lastName
                        })
                    }} label={"Sign Up"} />
                </div>
                <BottomWarning label={"Already Have an Account?"} buttonText={"Sign In"} to = {"/signin"} />
            </div>
           </div>
    </div>
}