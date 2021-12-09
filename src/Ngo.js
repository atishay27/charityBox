import React from "react";
import pushNotification from "./pushNotification";
import NavbarComp2 from "./VolNgo/newngopage";
const NgoDash = () => {
    return(
        <div className="App">
        <NavbarComp2/>
        <pushNotification/>      
        </div>
    );
};

export default NgoDash;