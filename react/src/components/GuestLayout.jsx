import {Outlet, Navigate} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx"

export default function Guestlayout() {

  const {token} = useStateContext()

  if(token) {
    return <Navigate to ="/" />
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}