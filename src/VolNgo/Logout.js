import React from "react";
import { useEffect } from 'react';
const Logout =()=>{
    useEffect(() => {
        sessionStorage.setItem("email", "");
        sessionStorage.setItem("role", "");
        window.location.href = "/";
      }, []);
    return(
        <div>
            LOGOUT SUCCESSFULL
        </div>
    )
}

export default Logout;