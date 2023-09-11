import LinkDataCard from '@/components/LinkDataCard';
import GithubRepoCard from '@/components/GithubRepoCard';
import GithubCodeCard from '@/components/GithubCodeCard';
import { useRouter } from 'next/router';

function getLinkType(link: string) {
  const repoRegex = /^https?:\/\/(?:www\.)?github\.com\/([^/]+\/[^/]+)(?:\/|$)/;
  const codeRegex = /^https?:\/\/(?:www\.)?github\.com\/([^/]+\/[^/]+)\/blob\/[^/]+\/([^/]+)(?:\/|$)/;
  
  const repoMatch = link.match(repoRegex);
  const codeMatch = link.match(codeRegex);

  let comp = <LinkDataCard />

  if (repoMatch) {
    comp = <GithubRepoCard />
  }

  if (codeMatch) {
    comp = <GithubCodeCard />
  }

  return comp
}

export default function Index() {
  const router = useRouter();
  const { url } = router.query as { url: string }

  if (!url) {
    return <></>
  }

  return (
    <>
      {getLinkType(url)}
    </>
  )
}


