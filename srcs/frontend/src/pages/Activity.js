import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/Tabs";
import { Button } from "../components/ui/Button";
import InputField from "../components/InputField";
import TagsCard from "../components/TagsCard"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/Card";

const Activity = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <Tabs defaultValue="activity" className="w-full">
                <TabsList className="mb-6">
                    <TabsTrigger value="activity">Your Activity</TabsTrigger>
                    <TabsTrigger value="interests">Interested in You</TabsTrigger>
                    <TabsTrigger value="preferences">Views of Your Profile</TabsTrigger>
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
                        </CardContent>
                    </Card>
                </TabsContent>
                
            </Tabs>
        </div>
    )
};

export default Activity;
