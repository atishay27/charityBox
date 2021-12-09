import React from "react";
import NavbarComp from'./VolNgo/Navbar';
import pushNotification from "./pushNotification";
import NavbarComp2 from "./VolNgo/newngopage";
const NVDash = () => {
    return(
        <div className="App">
        <NavbarComp/>
        <pushNotification/>      
        </div>
    );
};

export default NVDash;