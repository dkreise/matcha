import React, { useState, useEffect } from "react";
import { Avatar } from "./ui/Avatar";
import { Button } from "./ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/Card";
// import { Star } from "lucide-react"

const SuggestedProfileCard = ({ profile, match, onLike, onSkip }) => {
    const avatarUrl = "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1906669723.jpg";//"https://github.com/dkreise.png";
    const name = profile.first_name;
    const bio = profile.bio;
    const fame = profile.fame_rating;
    const gender = "female";
    // const match = 0;

    const distance = 4; // km (optional)

    // onLike;

    return (
        <Card className="w-full max-w-sm rounded-2xl shadow-lg">
            <CardHeader className="flex-row items-center space-y-0">
            {/* <img
                src={avatarUrl}
                alt={name}
                className="w-14 h-14 rounded-full object-cover border"
            /> */}
                <img src={avatarUrl} alt="Profile" className="w-full h-64 object-cover rounded-lg mb-3" />
                <CardTitle className="text-2xl font-semibold">{name}</CardTitle>
            </CardHeader>
                
            <CardContent className="space-y-4">
            {/* <CardTitle className="text-2xl font-semibold">{name}</CardTitle> */}
            <p className="text-sm text-muted-foreground">{bio}</p>
            <div className="bg-background rounded-xl p-3 mt-4">
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div className="text-center">
                        <span className="font-medium text-dark">fame: {fame}</span>
                    </div>
                    <div className="text-center">
                        <span className="font-medium text-dark">{gender}</span>
                    </div>
                    <div className="text-center">
                        <span className="font-medium text-dark">matched interests: {match}</span>
                    </div>
                    <div className="text-center">
                        <span className="font-medium text-dark">{distance} km away</span>
                    </div>
                </div>
            </div>

            </CardContent>
    
            <CardFooter className="flex justify-around pb-6 pt-0">
                <Button variant="secondary" onClick={onSkip}>Skip</Button>
                <Button onClick={onLike}>I'm interested</Button>
            </CardFooter>
        </Card>
    )
}

export default SuggestedProfileCard;
