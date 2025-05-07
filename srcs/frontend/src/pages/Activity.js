import { useEffect, useState } from "react";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/Tabs";
import { Button } from "../components/ui/Button";
import InputField from "../components/InputField";
import MatchSpan from "../components/MatchSpan";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/Card";
import { getUserActivity, getInterestedUsers } from "../services/matches";

const Activity = () => {
    const axiosPrivate = useAxiosPrivate();
    const [activity, setActivity] = useState([]);
    const [interestedUsers, setInterestedUsers] = useState([]);
    const [profileViews, setProfileViews] = useState([]);
    const [loading, setLoading] = useState(true);
    const formatter = new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'medium',
        timeStyle: 'short',
    });

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const data = await getUserActivity(axiosPrivate);
                setActivity(data);
            } catch (error) {
                console.error('Error fetching activity:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchActivity();
    }, [axiosPrivate]);

    useEffect(() => {
        const fetchInterestedUsers = async () => {
            try {
                const data = await getInterestedUsers(axiosPrivate);
                setInterestedUsers(data);
            } catch (error) {
                console.error('Error fetching interested users:', error);
            }
        };
        fetchInterestedUsers();
    }, [axiosPrivate]);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Tabs defaultValue="activity" className="w-full">
                <TabsList className="mb-6">
                    <TabsTrigger value="activity">Your Activity</TabsTrigger>
                    <TabsTrigger value="interested">Interested in You</TabsTrigger>
                    <TabsTrigger value="views">Views of Your Profile</TabsTrigger>
                </TabsList>

                <TabsContent value="activity">
                    <Card>
                        <CardHeader>
                            <CardTitle>Activity</CardTitle>
                            <CardDescription>
                                View your recent activity here.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {/* Activity content goes here */}
                            {loading ? (
                                <p>Loading...</p>
                            ) : activity.length > 0 ? (
                                activity.map((item) => (
                                    <div key={item.id} className="flex items-center space-x-4">
                                        <img src={item.target_profile_picture || "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1906669723.jpg"} alt={item.target_name} className="w-12 h-12 rounded-full" />
                                        <div>
                                            {item.action_type === 'like' ? (
                                                <h5 className="font-semibold text-like-dark">
                                                    Interested in <span className="font-semibold text-black">{item.target_name}</span>
                                                </h5>
                                            ) : item.action_type === 'skip' ? (
                                                <h5 className="font-semibold text-dark">
                                                    Skipped <span className="font-semibold text-black">{item.target_name}</span>
                                                </h5>
                                            ) : (
                                                <h5 className="font-semibold text-gray-700">??</h5>
                                            )}
                                            {/* <h3 className="text-lg font-semibold">{item.target_name}</h3> */}
                                            <p className="text-sm text-gray-500">{formatter.format(new Date(item.created_at))}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No recent activity found.</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="interested">
                    <Card>
                        <CardHeader>
                            <CardTitle>Interested in You</CardTitle>
                            <CardDescription>
                                See who has shown interest in you.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {/* Interested in you content goes here */}
                            {interestedUsers.length > 0 ? (
                                interestedUsers.map((user) => (
                                    <div key={user.id} className="flex items-center space-x-4">
                                        <img src={user.profile_picture  || "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1906669723.jpg"} alt={user.first_name} className="w-12 h-12 rounded-full" />
                                        <div>
                                            <div className="flex items-center gap-3">
                                            <h3 className="text-lg font-semibold">
                                                {user.first_name}
                                            </h3>
                                            {user.match && (<MatchSpan text="Match!" />)}
                                            </div>
                                            <p className="text-sm text-gray-500">{formatter.format(new Date(user.created_at))}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No one has shown interest in you yet.</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="views">
                    <Card>
                        <CardHeader>
                            <CardTitle>Views of Your Profile</CardTitle>
                            <CardDescription>
                                Check who has viewed your profile.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {/* Views content goes here */}
                        </CardContent>
                    </Card>
                </TabsContent>
                
            </Tabs>
        </div>
    )
};

export default Activity;
