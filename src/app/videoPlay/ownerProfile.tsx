import React from "react";
import DisplayInfo from "../../components/common/displayInfo";
import { useParams } from "react-router-dom";

const OwnerProfile = () => {
    const {username} = useParams();
    console.log("username in owner profile",username);
    return (
        <div>
            <DisplayInfo username={username} />
        </div>
    )
}   

export default OwnerProfile;