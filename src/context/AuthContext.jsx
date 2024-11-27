import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";


const AuthContext = createContext();
export const useAuth = ()=>useContext(AuthContext);

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading]=useState(true)

    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            setLoading(false)
        })
        return ()=> unsubscribe()
    },[])
    const login = async ()=>{
        const provider = new GoogleAuthProvider()

        try {
            await signInWithPopup(auth, provider)
        } catch(error){
            console.error('erro ao fazer login', error)
        }
    }
    const logout = async ()=>{

        try {
            await signOut(auth);
            setUser(null)
        } catch(error){
            console.error('erro ao sair', error)
        }
    }
    return (
        <AuthContext.Provider value={{user, login, logout, loading}}>
            {!loading&& children}
        </AuthContext.Provider>
    )
}