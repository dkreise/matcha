import { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { getProfileData, updateProfileData } from '../services/profile';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/Tabs";
import { Button } from "../components/ui/Button";
import InputField from "../components/InputField";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";

const ProfileSettings = () => {
    const axiosPrivate = useAxiosPrivate();
    // Dummy initial profile
    const [profile, setProfile] = useState({ username: "", email: "", first_name: "", last_name: "", bio: ""})

    // Example of loading profile data (replace with real API call)
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfileData(axiosPrivate);
                setProfile({
                    username: data.username ?? "",
                    email: data.email ?? "",
                    first_name: data.first_name ?? "",
                    last_name: data.last_name ?? "",
                    bio: data.bio ?? "",
                });
            } catch (err) {
                console.error('Error fetching profile:', err);
            }
        };
        fetchProfile();
    }, [axiosPrivate]);

    const handlePersonalInfoSubmit = async (e) => {
        e.preventDefault();
        // Get values from form
        // const formData = new FormData(e.target);
        const updatedProfile = {
            username: profile.username,
            email: profile.email,
            first_name: profile.first_name,
            last_name: profile.last_name,
            bio: profile.bio,
        };
        // Save to backend
        console.log("Saving personal info:", updatedProfile);
        try {
            const response = await updateProfileData(axiosPrivate, updatedProfile);
            console.log("Profile update response:", response);
            alert("Profile updated successfully");
        } catch (err) {
            console.error("Error updating profile:", err);
            // alert("Error updating profile");
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const res = await handleLogin(username, password);
    //     if (res.success) {
    //         const data = res.data;
    //         localStorage.setItem('accessToken', data.accessToken);
    //         setAccessToken(data.accessToken);
    //         // console.log("Login successful, access token: ", data.accessToken);
    //         // alert(data.accessToken)
    //         navigate("/");
    //     } else {
    //         alert("Login failed: " + res.message);
    //         resetForm();
    //     }
    // };

    // User tags state
    const [userTags, setUserTags] = useState([])

    const handleChange = (e) => {
        const { id, value } = e.target
        setProfile((prev) => ({
            ...prev,
            [id]: value,
        }))
    }

    // const handlePersonalInfoSubmit = (e) => {
    //     e.preventDefault()
    //     // Get values from form
    //     const formData = new FormData(e.target)
    //     const updatedProfile = {
    //     username: formData.get("username"),
    //     email: formData.get("email"),
    //     }
    //     // Save to backend
    //     console.log("Saving personal info:", updatedProfile)
    // }

    const handleAddTag = (tagName) => {
        const normalized = tagName.trim().toLowerCase()
        if (!normalized) return

        const newTag = { id: Date.now(), name: normalized }
        setUserTags((prev) => [...prev, newTag])

        // Optionally send to backend
        console.log("Adding tag:", normalized)
    }

    const handlePreferencesSubmit = (e) => {
        e.preventDefault()
        console.log("Preferences saved")
    }

    const handleNotificationsSubmit = (e) => {
        e.preventDefault()
        console.log("Notifications settings saved")
    }

  return (
    <div className="max-w-4xl mx-auto p-6">
        <Button variant="secondary">
            <Link to="/profile">Profile</Link>
        </Button>
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="interests">Interests</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <form className="space-y-4" onSubmit={handlePersonalInfoSubmit}>
            <InputField
                label="Username"
                type="text"
                id="username"
                value={profile.username}
                onChange={handleChange}
            />
            <InputField
                label="Email"
                type="email"
                id="email"
                value={profile.email}
                onChange={handleChange}
            />
            <InputField
                label="First Name"
                type="text"
                id="first_name"
                value={profile.first_name}
                onChange={handleChange}
            />
            <InputField
                label="Last Name"
                type="text"
                id="last_name"
                value={profile.last_name}
                onChange={handleChange}
            />
            <InputField
                label="Bio"
                type="text"
                id="bio"
                value={profile.bio}
                onChange={handleChange}
            />
            <Button type="submit">Save Personal Info</Button>
          </form>
        </TabsContent>

        <TabsContent value="interests">
          {/* You can reuse your <TagsCard /> component here */}
          {/* <TagsCard tags={userTags} onAddTag={handleAddTag} /> */}
        </TabsContent>

        <TabsContent value="preferences">
          <form onSubmit={handlePreferencesSubmit}>
            {/* Your custom fields like language, theme, etc. */}
            <Button type="submit">Save Preferences</Button>
          </form>
        </TabsContent>

        <TabsContent value="notifications">
          <form onSubmit={handleNotificationsSubmit}>
            {/* Toggle switches or checkboxes */}
            <Button type="submit">Save Notification Settings</Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileSettings;
