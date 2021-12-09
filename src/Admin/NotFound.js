import React from "react";
import { Link } from "react-router-dom";

const NotFound = () =>{
    return(
        <div>
        <h1>ERROR 404!!!<br/>PAGE NOT FOUND</h1>
        <Link className="nav-link" to="/admin">
            <button>Return To HomePage</button>
        </Link>
        </div>
    )
}

export default NotFound;