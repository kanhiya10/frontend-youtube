import React from "react";
import DisplayInfo from "../../components/common/displayInfo";
import { useParams } from "react-router-dom";
import { useTheme } from "../../context/themeContext";

const OwnerProfile = () => {
    const {username} = useParams();
    const { theme } = useTheme();
    return (
        <div style={{ backgroundColor: theme.background }} className="min-h-screen pt-4">
            <DisplayInfo username={username} />
        </div>
    )
}   

export default OwnerProfile;