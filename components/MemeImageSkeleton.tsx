

const MemeImageSkeleton = () => {
    return (
        <div>
            <div className="w-64 bg-white rounded shadow-2xl">

            <div className="h-32 bg-gray-200 rounded-tr rounded-tl animate-pulse"></div>
        
            <div className="p-5">
                <div className="h-6 rounded-sm bg-gray-200 animate-pulse mb-4"></div>
            </div>
        
            </div>
        </div>
    );
};


export default MemeImageSkeleton;
