import './globals.css' // Needs to be at the top of the file

import '@mantine/core/styles.css'

import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { Analytics } from '@vercel/analytics/react'
export const metadata = {
  title: 'FGCS',
  description: 'A modern ground control station for your ArduPilot aircraft',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />

        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://fgcs.projectfalcon.uk/' />
        <meta property='og:title' content='FGCS' />
        <meta
          property='og:description'
          content='A modern ground control station for your ArduPilot aircraft, with a focus on user experience and ease of use.'
        />
        <meta property='og:image' content='/og_image.png' />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://fgcs.projectfalcon.uk/' />
        <meta property='twitter:title' content='FGCS' />
        <meta
          property='twitter:description'
          content='A modern ground control station for your ArduPilot aircraft, with a focus on user experience and ease of use.'
        />
        <meta property='twitter:image' content='/og_image.png' />
      </head>
      <body>
        <MantineProvider defaultColorScheme='dark'>{children}</MantineProvider>
        <Analytics />
      </body>
    </html>
  )
}
