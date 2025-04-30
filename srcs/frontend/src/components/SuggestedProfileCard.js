import React, { useState, useEffect } from "react";
import { Avatar } from "./ui/Avatar";
import { Button } from "./ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/Card";
// import { Star } from "lucide-react"

const SuggestedProfileCard = ({
    avatarUrl,
    name,
    bio,
    fame,
    gender,
    sharedInterests = 0,
    onLike,
}) => {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader className="flex-row items-center space-y-0 gap-4">
            <img
                src={avatarUrl}
                alt={name}
                className="w-14 h-14 rounded-full object-cover border"
            />
            <div>
                <CardTitle className="text-lg">{name}</CardTitle>
                <CardDescription className="text-sm">{bio}</CardDescription>
            </div>
            </CardHeader>
    
            <CardContent className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
                {/* <Star className="w-4 h-4 text-yellow-500" /> */}
                <span className="font-medium">{fame}</span>
                <span className="text-muted-foreground">Fame</span>
            </div>
            <div className="text-sm text-muted-foreground">Gender: {gender}</div>
            <div className="text-sm text-muted-foreground">
                Shared interests: {sharedInterests}
            </div>
            </CardContent>
    
            <CardFooter className="justify-end">
            <Button onClick={onLike}>Like</Button>
            </CardFooter>
        </Card>
    )
}

export default SuggestedProfileCard;
