import React, { useState } from "react";
import Tag from "./ui/Tag";
import { Input } from "./ui/Input";
// import { Button } from "./ui/button";

const TagsCard = ({ title = "Tags", tags, onAddTag }) => {
    const [showInput, setShowInput] = useState(false);
    const [newTag, setNewTag] = useState("");

    // const handleAdd = (e) => {
    //     e.preventDefault();
    //     const trimmed = newTag.trim();
    //     if (trimmed) {
    //     onAddTag(trimmed);
    //     setNewTag("");
    //     }
    // };
    const handleAdd = () => {
        const trimmedTag = newTag.trim().toLowerCase();
        if (trimmedTag && !tags.some(tag => tag.name.toLowerCase() === trimmedTag)) {
          onAddTag(newTag.trim());
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
        <div className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-xl text-dark font-semibold mb-4">{title}</h2>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <Tag key={tag.id} label={tag.name} />
                ))}
        
                {showInput ? (
                <Input
                    autoFocus
                    className="w-32 h-auto inline-block bg-white text-primary text-xs font-medium mr-2 px-3 py-1 rounded-full"
                    placeholder="New tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onBlur={handleAdd}
                    onKeyDown={handleKeyDown}
                />
                ) : (
                <button
                    onClick={() => setShowInput(true)}
                    className="inline-block bg-light text-primary text-xs font-medium mr-2 px-3 py-1 rounded-full"
                >
                    +
                </button>
                )}
            </div>
        </div>
    );
};

export default TagsCard;
