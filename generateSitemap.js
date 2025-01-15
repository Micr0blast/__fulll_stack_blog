import dotenv from 'dotenv'
dotenv.config()

const baseUrl = process.env.FRONTEND_URL

function slug(title) {
  const re = '/[a-zA-Z0-9 ]/g'
  let slug = title.replace(re, '')
  slug = slug.replace(' ', '-')
  slug = slug.toLowerCase()
  return slug
}

export async function generateSitemap() {
  const postsRequest = await fetch(`${process.env.VITE_BACKEND_URL}/posts`, {
    method: 'GET',
  })
  const posts = await postsRequest.json()

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${baseUrl}</loc>
    </url>
    <url>
        <loc>${baseUrl}/login</loc>
    </url>
    <url>
        <loc>${baseUrl}/signup</loc>
    </url>
    ${posts
      .map(
        (post) => `
        <url>
            <loc>${baseUrl}/${post._id}/${slug(post.title)}</loc>
            <lastmod>${post.updatedAt ?? post.createdAt}</lastmod>
        </url>
        `,
      )
      .join('')}
</urlset>`
}
