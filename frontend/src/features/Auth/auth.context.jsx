import { createContext,useState } from "react";

 export let Authcontext = createContext()

 export let Authprovider = ({children})=> {
    const [loading, setloading] = useState(true)
    const [user, setuser] = useState(null)



    return (
        <Authcontext.Provider value={{setloading,setuser,user,loading}}>
            {children}
        </Authcontext.Provider>
    )
 }




