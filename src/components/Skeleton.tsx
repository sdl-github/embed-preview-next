export default function Skeleton() {
    return (
        <div className='rounded border border-solid border-blue-400 border-opacity-20 overflow-hidden'>
            <div className="flex text-base h-[120px] leading-6 duration-200 text-black-82 no-underline bg-white">
                <div className='flex-1 p-2.5 min-w-0 flex flex-col justify-around'>
                    <div className="h-5 w-full animate-pulse bg-gray-200 rounded"></div>
                    <div className="h-4 w-60 animate-pulse bg-gray-200 rounded"></div>
                    <div className="h-4 w-40 animate-pulse bg-gray-200 rounded"></div>
                </div>
                <div className="h-full max-w-230">
                    <div className="h-full w-60 animate-pulse bg-gray-200 rounded mb-4"></div>
                </div>
            </div>
        </div>
    );
}