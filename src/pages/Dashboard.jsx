import { AppBar } from "../components/AppBar.jsx"
import { Balance } from "../components/BalanceComponent.jsx"
import { Users } from "../components/UsersComponent.jsx"

export const DashBoard = () => {
    return <div>
        <AppBar />
        <Balance />
        <Users />
    </div>
}