import { RepoData } from "@/pages/api/github-repo";
import { useRouter } from "next/router";
import useSWR from "swr";
import Skeleton from "./Skeleton";
import GithubIcon from "./GithubIcon";
import { StarIcon } from "./StarIcon";
import ForkIcon from "./ForkIcon";
import { CodeIcon } from "./CodeIcon";

function getRepoFullName(link: string) {
    const repoRegex = /^https?:\/\/(?:www\.)?github\.com\/([^/]+\/[^/]+)(?:\/|$)/;
    const match = link.match(repoRegex);
    if (match && match[1]) {
        return match[1];
    } else {
        return null;
    }
}
export default function GithubRepoCard() {

    const router = useRouter();

    const { url } = router.query as { url: string }

    const full_name = getRepoFullName(url)

    const fetcher = (url: string) => fetch(url).then(r => r.json()) as Promise<RepoData>

    const { data, error, isLoading } = useSWR(() => full_name ? `/api/github-repo?full_name=${full_name}` : null, fetcher)

    return (
        <>
            {(isLoading || error) ? <Skeleton /> : (
                <div className='rounded border border-solid border-blue-400 border-opacity-20 overflow-hidden'>
                    <a target='_blank' href={url} className="flex text-base h-[120px] leading-6 duration-200 text-black-82 no-underline bg-white hover:bg-[rgba(239,246,251,.7)]">
                        <div className='flex-1 p-2.5 min-w-0 flex flex-col justify-around'>
                            <div className="text-[rgba(0,0,0,.82)] font-bold  line-clamp-2 select-none  break-words flex items-center">
                                <GithubIcon />
                                <div className="ml-2 text-[#0366d6]">
                                    <span>{data?.owner}</span>
                                    <span className="text-[#7b8288] mx-1">/</span>
                                    <span>{data?.name}</span>
                                </div>
                            </div>
                            <div className="text-[#77838c] text-sm line-clamp-1 max-h-5">
                                {data?.description || url}
                            </div>
                            <div className="text-xs flex items-center overflow-hidden whitespace-nowrap truncate text-[#7b8288]">
                                <div className="flex items-center">
                                    <div className="w-[16px] h-[16px] flex items-center">
                                        <StarIcon />
                                    </div>
                                    <div className="ml-1">
                                        {data?.stargazers_count}
                                    </div>
                                </div>

                                <div className="flex items-center ml-4">
                                    <div className="w-[16px] h-[16px] flex items-center">
                                        <ForkIcon />
                                    </div>
                                    <div className="ml-1">
                                        {data?.forks_count}
                                    </div>
                                </div>

                                <div className="flex items-center ml-4">
                                    <div className="w-[16px] h-[16px] flex items-center">
                                        <CodeIcon />
                                    </div>
                                    <div className="ml-1">
                                        {data?.language}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            )}
        </>
    )
}
