import type { NextApiRequest, NextApiResponse } from 'next'

export type RepoData = {
    owner: string,
    name: string,
    full_name: string,
    description: string,
    html_url: string,
    language: string,
    stargazers_count: number,
    forks_count: number
}
const Authorization = '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'
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<RepoData>
) {
    const { full_name } = req.query as { full_name: string | undefined }
    if (!full_name) {
        throw new Error("url is required")
    }
    const url = `https://api.github.com/repos/${full_name}`
    try {
        const result = await (await fetch(url, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Accept-Encoding': 'gizp,defale',
                'Authorization': Authorization,
            }
        })).json() as Repository
        const { name, full_name, description, html_url, language, stargazers_count, forks_count, owner } = result
        res.status(200).json({ name, full_name, description, html_url, language, stargazers_count, forks_count, owner: owner?.login })
    } catch (e) {
        console.log(e);
        throw new Error("query info error")
    }

}