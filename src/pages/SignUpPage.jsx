import { Heading } from "../components/heading.jsx"
import { Button } from "../components/Button.jsx"
import { InputBox } from "../components/inputbox.jsx"
import { Subheading } from "../components/subheading.jsx"
import { BottomWarning } from "../components/BottomWarning.jsx"
export function SignUpPage() {
    return <div className="bg-slate-300 h-screen flex justify-center ">
           <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-auto px-4">
                <Heading label = {"Sign Up"} />
                <Subheading label={"Enter Your Information to create an account"} />
                <InputBox placeholder={"Aryan"} label={"First Name"} />
                <InputBox placeholder={"Sharma"} label={"Last Name"} />
                <InputBox placeholder={"aryan@gmail.com"} label={"Email"} />
                <InputBox placeholder={"123456"} label={"Password"} />
                <div className="pt-4">
                    <Button label={"Sign Up"} />
                </div>
                <BottomWarning label={"Already Have an Account?"} buttonText={"Sign In"} to = {"/signin"} />
            </div>
           </div>
    </div>
}