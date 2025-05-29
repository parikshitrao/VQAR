import {createContext, useContext} from "react"
import {useLocalStorage} from "../hooks/useLocalStorage"

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

function AuthProvider({children}) {
    const [auth, setAuth] = useLocalStorage("auth", {
        name: null
    })

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider