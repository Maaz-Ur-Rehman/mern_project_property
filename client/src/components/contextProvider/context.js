import { useState } from "react";
import ClientIdContext from "./contextState";


 const Context = ({children}) => {

    const [clientId,setClientId] = useState("");
    // const state={
    //   "name":"Maaz"
    // }

  return (
   
    <ClientIdContext.Provider value={{clientId,setClientId}}>
        {children}
    </ClientIdContext.Provider>
  )
}

export default Context