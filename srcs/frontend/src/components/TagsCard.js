import React, { useState, useEffect } from "react";
import Tag from "./ui/Tag";
import { Input } from "./ui/Input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/Card";
// import { Button } from "./ui/button";

const TagsCard = ({ title = "Tags", tags, onAddTag, onRemoveTag, suggestions = [] }) => {
    const [showInput, setShowInput] = useState(false);
    const [newTag, setNewTag] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);

    useEffect(() => {
        if (newTag.trim()) {
            const input = newTag.toLowerCase();
            const matches = suggestions.filter(
                (tag) =>
                    tag.name.toLowerCase().startsWith(input) &&
                    !tags.some((t) => t.name.toLowerCase() === tag.name.toLowerCase())
            );
            setFilteredSuggestions(matches);
        } else {
            setFilteredSuggestions([]);
        }
    }, [newTag, suggestions, tags]);

    const handleSelectSuggestion = (name) => {
        onAddTag(name);
        setNewTag("");
        setFilteredSuggestions([]);
        setShowInput(false);
    };

    const handleAdd = () => {
        const trimmedTag = newTag.trim().toLowerCase();
        if (trimmedTag && !tags.some(tag => tag.name.toLowerCase() === trimmedTag)) {
          onAddTag(trimmedTag);
          setNewTag("");
        //   setShowInput(false);
        }
        setShowInput(false);
    };
    
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleAdd();
        } else if (e.key === "Escape") {
          setShowInput(false);
          setNewTag("");
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>You can add more interests here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
            <div className="flex flex-wrap gap-2 items-start">
                {tags.map((tag) => (
                    <div key={tag.id}>
                        <Tag key={tag.id} label={tag.name} />
                        <button
                            onClick={() => onRemoveTag(tag.name)}
                            className="mr-3 text-muted hover:text-red-500 focus:outline-none"
                            aria-label={`Remove ${tag.name}`}
                        > × </button>
                    </div>
                ))}

                {showInput ? (
                    <div >
                        <Input
                            autoFocus
                            className="w-32 h-auto inline-block bg-white text-primary text-xs font-medium mr-2 px-3 py-1 rounded-full"
                            placeholder="New tag"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onBlur={() => setTimeout(() => setShowInput(false), 200)} // Delay to allow suggestion click
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleAdd();
                                }
                            }}
                        />
                        {filteredSuggestions.length > 0 && (
                            <ul className="absolute z-10 bg-white border mt-1 rounded shadow-md text-sm w-full">
                                {filteredSuggestions.map((tag) => (
                                    <li
                                        key={tag.id}
                                        className="px-2 py-1 cursor-pointer hover:bg-gray-100"
                                        onMouseDown={() => handleSelectSuggestion(tag.name)}
                                    >
                                        {tag.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={() => setShowInput(true)}
                        className="inline-block bg-light text-primary text-xs font-medium mr-2 px-3 py-1 rounded-full"
                    >
                        +
                    </button>
                )}
            </div>
            </CardContent>
            <CardFooter className="flex justify-between">
            </CardFooter>
        </Card>
    );
};

export default TagsCard;
