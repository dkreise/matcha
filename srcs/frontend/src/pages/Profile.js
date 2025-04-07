import { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate'; // your custom hook
import { getProfileData } from '../services/profile';

const Profile = () => {
    const axiosPrivate = useAxiosPrivate();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
        try {
            const data = await getProfileData(axiosPrivate);
            setProfile(data);
        } catch (err) {
            console.error('Error fetching profile:', err);
        }
        };

        fetchProfile();
    }, [axiosPrivate]);

    if (!profile) return <div>Loading...</div>;

    return (
        <div>
        <h2>Welcome, {profile.username}!</h2>
        <p>Email: {profile.email}</p>
        {/* render more data */}
        </div>
    );
};

export default Profile;
