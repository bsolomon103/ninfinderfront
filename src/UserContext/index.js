import React, { createContext, useState, useContext } from 'react';


//Create a context with null as the default value 
const UserContext = createContext(null);

//Custom hook to use the UserContext
export const useUser = () => useContext(UserContext)

//Provider component to wrap the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
    )
};



//Call this provider component into the app.js