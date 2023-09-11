// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { load } from 'cheerio'

export type LinkData = {
  title: string
  description?: string
  image?: string
  icon?: string
  url?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LinkData>
) {
  const { url } = req.query as { url: string | undefined }
  if (!url) {
    throw new Error("url is required")
  }
  try {
    const html = await (await fetch(url as string, {
      headers: {
        'Accept-Encoding': 'gizp,defale',
      }
    })).text()

    const $ = load(html);
    const title = $('head title').text();
    const description = $('meta[name="description"]').attr('content');
    const image = $('meta[property="og:image"]').attr('content');
    const icon = $(`link[rel*="icon"]`).attr('href')
    const data = { title, description, image, icon, url }
    res.status(200).json(data)
  } catch (e) {
    console.log(e);
    throw new Error("query oauth userinfo error")
  }
}
