import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Lokesh Expense Tracker',
    short_name: 'Expense Tracker',
    description: 'Track household expenses, categories, and grand totals.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#f5f3ed',
    theme_color: '#315c4c',
    categories: ['finance', 'productivity'],
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png', purpose: 'any' },
    ],
  }
}

export const dynamic = 'force-static'
