import { use } from "react"
import { Authcontext } from "../Context/AuthContext"

export const useAuth = ()=>{
    const AuthInfo = use(Authcontext)
    return AuthInfo
}