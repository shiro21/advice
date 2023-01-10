import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ProfileComponent from "./ProfileComponent";


const Profile = () => {
    console.log('profile');
    
    const location = useLocation();
    const user = location.state.user;

    const [userData, setUserData] = useState(user)

    useEffect(() => {
        setUserData(location.state.user)
    }, [location])

    return (
        <article id="profile_page">
            {
                location.state ? (
                    <ProfileComponent userData={userData} />
                ) : null
            }
        </article>
    );
};

export default Profile;