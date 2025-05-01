import { useEffect, useState, useMemo } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { getProfileData, updateProfileData, getAllTags, associateTags } from '../services/profile';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/Tabs";
import { Button } from "../components/ui/Button";
import InputField from "../components/InputField";
import TagsCard from "../components/TagsCard"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";

const ProfileSettings = () => {
    const axiosPrivate = useAxiosPrivate();
    const [profile, setProfile] = useState({ username: "", email: "", first_name: "", last_name: "", bio: ""})
    const [userTags, setUserTags] = useState(null);
    const [availableTags, setAvailableTags] = useState([]);

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
                setUserTags(data.tags);
            } catch (err) {
                console.error('Error fetching profile:', err);
            }
        };
        fetchProfile();
    }, [axiosPrivate]);

    useEffect(() => {
        const fetchAvailableTags = async () => {
            try {
                const tags = await getAllTags(axiosPrivate);
                setAvailableTags(tags); // [{ id: 1, name: 'travel' }, ...]
            } catch (err) {
                console.error('Error fetching available tags:', err);
            }
        };
        fetchAvailableTags();
    }, [axiosPrivate]);

    const handlePersonalInfoSubmit = async (e) => {
        e.preventDefault();
        const updatedProfile = {
            username: profile.username,
            email: profile.email,
            first_name: profile.first_name,
            last_name: profile.last_name,
            bio: profile.bio,
        };
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

    const handleProfileChange = (e) => {
        const { id, value } = e.target
        setProfile((prev) => ({
            ...prev,
            [id]: value,
        }))
    }

    const handleAddTag = async (name) => {
        try {
            await associateTags(axiosPrivate, { tag_name: name });
        } catch (err) {
            console.error("Error associating tag:", err);
        }
        const newTag = { id: Date.now(), name }; // You can adjust this for backend
        setUserTags([...userTags, newTag]);
    };

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
        {/* <Button variant="secondary">
            <Link to="/profile">Back to Profile</Link>
        </Button>
       <br></br><br></br> */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="interests">Interests</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Info</CardTitle>
              <CardDescription>
                Make changes to your personal information here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <InputField
                  label="Username"
                  type="text"
                  id="username"
                  value={profile.username}
                  onChange={handleProfileChange}
              />
              <InputField
                  label="Email"
                  type="email"
                  id="email"
                  value={profile.email}
                  onChange={handleProfileChange}
              />
              <InputField
                  label="First Name"
                  type="text"
                  id="first_name"
                  value={profile.first_name}
                  onChange={handleProfileChange}
              />
              <InputField
                  label="Last Name"
                  type="text"
                  id="last_name"
                  value={profile.last_name}
                  onChange={handleProfileChange}
              />
              <InputField
                  label="Bio"
                  type="text"
                  id="bio"
                  value={profile.bio}
                  onChange={handleProfileChange}
              />
            </CardContent>
            <CardFooter>
              <Button onClick={handlePersonalInfoSubmit}>Save Personal Info</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="interests">
          <TagsCard title="Interests" tags={userTags} onAddTag={handleAddTag} suggestions={availableTags} />
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Your Preferences</CardTitle>
              <CardDescription>
                Make changes to your preferences here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              
            </CardContent>
            <CardFooter>
              <Button onClick={handlePreferencesSubmit}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Make changes to your notification settings here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              
            </CardContent>
            <CardFooter>
              <Button onClick={handleNotificationsSubmit}>Save Notification Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileSettings;
