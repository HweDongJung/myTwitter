import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";


const Navigation = ( { userObj, profileUrl} ) => ( 
<nav>
    <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <li>
            <Link to="/" style={ {marginRight: 10} }>
                <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="4x" />
            </Link>
        </li>
        <li>
            <Link to="/profile" style={{
            marginLeft: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 12,
          }}>
                <img src={userObj.photoURL} width={"55px"} height={"55px"} />
                <span style={{ marginTop: 10 }}>
                    {userObj.displayName
                    ? `${userObj.displayName}'s Profile`
                    : "Profile"}
                </span>
            </Link>
        </li>
    </ul>
</nav> 
)

export default Navigation;