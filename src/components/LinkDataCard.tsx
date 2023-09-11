import { useRouter } from 'next/router';
import { LinkData } from '@/pages/api/link-data';
import useSWR from "swr";
import Skeleton from './Skeleton';


export default function LinkDataCard() {

    const router = useRouter();
    
    const { url } = router.query;

    const fetcher = (url: string) => fetch(url).then(r => r.json()) as Promise<LinkData>

    const { data, error, isLoading } = useSWR(() => url ? `/api/link-data?url=${url}` : null, fetcher)


    return (
        <>
            {(isLoading || error) ? <Skeleton /> : (
                <div className='rounded border border-solid border-blue-400 border-opacity-20 overflow-hidden'>
                    <a target='_blank' href={data?.url} className="flex text-base h-[120px] leading-6 duration-200 text-black-82 no-underline bg-white hover:bg-[rgba(239,246,251,.7)]">
                        <div className='flex-1 p-2.5 min-w-0 flex flex-col justify-around'>
                            <div className="text-[rgba(0,0,0,.82)] font-bold  line-clamp-2 select-none  break-words">
                                {data?.title}
                            </div>
                            <div className="text-[#77838c] text-sm line-clamp-1 max-h-5">
                                {data?.description}
                            </div>
                            <div className="text-xs flex items-center overflow-hidden whitespace-nowrap truncate">
                                {data?.icon && <img width={14} height={14} alt='url icon' className='w-[14px] h-[14px]' src={data?.icon} />}
                                <div className="ml-2">
                                    {data?.url}
                                </div>
                            </div>
                        </div>
                        {
                            data?.image && <div className="h-full max-w-230">
                                <img alt={`url thumbnail image`} className='w-full h-full object-cover' src={data.image} />
                            </div>
                        }
                    </a>
                </div>
            )}
        </>
    )
}