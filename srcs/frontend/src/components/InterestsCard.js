import React from "react";
import Tag from "./ui/Tag"; // adjust the path if needed

const InterestsCard = ({ tags }) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-dark">Interests</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Tag key={tag.id} label={tag.name} />
        ))}
      </div>
    </div>
  );
};

export default InterestsCard;

/*
USAGE:
import InterestsCard from "@/components/InterestsCard";

<InterestsCard tags={userTags} />

Make sure userTags is an array like:
[
  { id: 1, name: "vegan" },
  { id: 2, name: "geek" },
  { id: 3, name: "piercing" },
]
*/
