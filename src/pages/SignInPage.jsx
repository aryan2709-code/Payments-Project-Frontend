import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/heading"
import { InputBox } from "../components/inputbox"
import { Subheading } from "../components/subheading"



export const SignInPage = () => {
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-auto px-4">
            <Heading label={"Sign In"} />
            <Subheading label={"Enter your credentials to access your account"} />
            <InputBox placeholder={"aryan2709"} label={"Username"} />
            <InputBox placeholder={"123456"} label={"Password"} />
            <div className="pt-4">
                <Button label={"Sign In"} />
            </div>
            <BottomWarning label={"Don't Have an account?"} buttonText={"SignUp"} to={"/signup"} />
            </div>
        </div>
    </div>
}