import {BrowserRouter , Route , Routes } from "react-router-dom"
import { SignUpPage } from "./pages/SignUpPage.jsx"
import { SignInPage } from "./pages/SignInPage.jsx"
import { DashBoard } from "./pages/Dashboard.jsx"
import { SendMoney } from "./pages/SendMoney.jsx"
function App() {
return (
 <BrowserRouter>
 <Routes>
 <Route path="/signup" element={<SignUpPage />} />
 <Route path = "/signin" element = {<SignInPage />} />
 <Route path = "/dashboard" element = {<DashBoard />} />
 <Route path ="/send" element = {<SendMoney />} />
 </Routes>
 </BrowserRouter>
)

}

export default App