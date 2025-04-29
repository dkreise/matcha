import { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { getProfileData } from '../services/profile';
import { Link } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/Input"
import { Label } from "../components/ui/Label"
import { Avatar } from "../components/ui/Avatar"
import InterestsCard from "../components/InterestsCard"
import TagsCard from "../components/TagsCard"

const Profile = () => {
    const axiosPrivate = useAxiosPrivate();
    const [profile, setProfile] = useState(null);
    const [userTags, setUserTags] = useState(null);
    const tags = [
        { "id": 1, "name": "vegan" },
        { "id": 2, "name": "art" },
        { "id": 3, "name": "travel" }
    ];

    useEffect(() => {
        const fetchProfile = async () => {
        try {
            const data = await getProfileData(axiosPrivate);
            setProfile(data);
            if (data.tags) {
                setUserTags(data.tags);
            } else {
                setUserTags(tags);
            }
        } catch (err) {
            console.error('Error fetching profile:', err);
        }
        };

        fetchProfile();
    }, [axiosPrivate]);

    if (!profile) return <div>Loading...</div>;         
    
    const handleAddTag = (name) => {
        const newTag = { id: Date.now(), name }; // You can adjust this for backend
        setUserTags([...userTags, newTag]);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Profile Header */}
            <div className="flex items-center space-x-4">
                <Avatar src="https://github.com/dkreise.png" size="lg" />
                <div>
                    <h1 className="text-2xl font-bold">{profile.username}</h1>
                    <p className="text-gray-500">{profile.email}</p>
                </div>
            </div>
            {/* Profile Interests (Tags) */}
            {/* <InterestsCard tags={userTags} /> */}
            <TagsCard title="Interests" tags={userTags} onAddTag={handleAddTag} />
            {/* Profile Form */}
            {/* <div className="space-y-4">
                <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="Your Name" />
                </div>
                <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>
                <Button>Update Profile</Button>
            </div> */}
            <Button variant="secondary">
                <Link to="/">Home</Link>
            </Button>
            <div className="mb-4">
                <LogoutButton />
            </div>
        </div>
    );
};

export default Profile;
