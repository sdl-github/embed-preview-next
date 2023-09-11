import LinkDataCard from '@/components/LinkDataCard';
import GithubRepoCard from '@/components/GithubRepoCard';
import GithubCode from '@/components/GithubCode';
import { useRouter } from 'next/router';

function getLinkType(link: string) {
  const repoRegex = /^https?:\/\/(?:www\.)?github\.com\/([^/]+\/[^/]+)(?:\/|$)/;
  const codeRegex = /^https?:\/\/(?:www\.)?github\.com\/([^/]+\/[^/]+)\/blob\/[^/]+\/([^/]+)(?:\/|$)/;
  if (repoRegex.test(link)) {
    return <GithubRepoCard />;
  } else if (codeRegex.test(link)) {
    return <GithubCode />;
  } else {
    return <LinkDataCard />;
  }
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


