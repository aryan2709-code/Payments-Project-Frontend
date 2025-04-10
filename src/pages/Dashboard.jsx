import { AppBar } from "../components/AppBar.jsx"
import { Balance } from "../components/BalanceComponent.jsx"
import { Users } from "../components/UsersComponent.jsx"

export const DashBoard = () => {
    return <div className="p-3">
        <AppBar />
        <Balance value={"30000"} />
        <Users />
    </div>
}