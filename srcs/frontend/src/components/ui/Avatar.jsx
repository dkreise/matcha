const Avatar = ({ src, alt = "User avatar", size = "md" }) => {
    const sizes = {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-16 h-16",
    };
  
    return (
        <div className={`rounded-full overflow-hidden bg-gray-200 ${sizes[size]}`}>
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-500 text-sm">
                    ?
                </div>
            )}
        </div>
    );
};

// Avatar.displayName = "Avatar";
  
export { Avatar };
  