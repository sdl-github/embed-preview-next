import { useRouter } from 'next/router';
import useSWR from "swr";
import { LinkData } from './api/link-data';
import Image from 'next/image';

export default function Index() {
  const router = useRouter();
  const { url } = router.query;

  const fetcher = (url: string) => fetch(url).then(r => r.json()) as Promise<LinkData>

  const { data, error, isLoading } = useSWR(() => url ? `/api/link-data?url=${url}` : null, fetcher)

  const Skeleton = () => {
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
  };

  return (
    <>
      {(isLoading || error) ? <Skeleton /> : (
        <div className='rounded border border-solid border-blue-400 border-opacity-20 overflow-hidden'>
          <a target='_blank' href={data?.url} className="flex text-base h-[120px] leading-6 duration-200 text-black-82 no-underline bg-white">
            <div className='flex-1 p-2.5 min-w-0 flex flex-col justify-around'>
              <div className="text-[rgba(0,0,0,.82)] font-bold text-base leading-tight line-clamp-2 max-h-9 select-none whitespace-normal break-words">
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
                <img alt={`${data?.image} url thumbnail image`} className='w-full h-full object-cover' src={data.image} />
              </div>
            }
          </a>
        </div>
      )}
    </>
  )
}


