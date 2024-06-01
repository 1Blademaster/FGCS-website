'use client'

import tailwindConfig from '@/tailwind.config.js'
import { Button, Card, Group, Image, SimpleGrid } from '@mantine/core'
import NextImage from 'next/image'
import 'swiper/css'
import resolveConfig from 'tailwindcss/resolveConfig'

const tailwindColors = resolveConfig(tailwindConfig).theme.colors

const carouselSlides = [
  {
    text: 'View real-time data plotted on graphs',
    image: '/graphs.png',
  },
  {
    text: 'Fetch and set all the parameters on your flight controller',
    image: '/params.png',
  },
  {
    text: 'Configure and test different aspects of your setup',
    image: '/config.png',
  },
  {
    text: 'View and analyse Dataflash and FGCS telemetry logs',
    image: '/fla.png',
  },
]

export default function Home() {
  return (
    <>
      <div className='w-full flex items-center justify-center mt-4 gap-2'>
        <NextImage
          src='/logo_dark_nobg_white_icon.svg'
          alt='Project Falcon logo'
          className=''
          height={40}
          width={40}
        />
        <h1 className='text-3xl font-bold'>
          FGCS <span className='text-sm font-normal align-super'>alpha</span>
        </h1>
      </div>
      <main className='flex min-h-screen flex-col items-center justify-between px-24 pb-24 pt-12 gap-28'>
        <div className='flex flex-row w-full items-center justify-center gap-10'>
          <div className='flex flex-col w-1/3'>
            <p className='font-bold text-4xl'>
              A <span className='text-falconred'>modern</span> ground control
              station for your ArduPilot aircraft
            </p>
            <p className='my-2'>
              Enjoy a refreshed look to your standard GCS software, with a focus
              on user experience and ease of use.
            </p>
            <Group className='my-6'>
              <Button
                color={tailwindColors.falconred[100]}
                component={'a'}
                href='https://github.com/Project-Falcon/FGCS/releases/latest'
                target='_blank'
              >
                Download
              </Button>
              <Button
                color={tailwindColors.falconred[80]}
                variant='outline'
                component={'a'}
                href='https://github.com/Project-Falcon/FGCS/'
                target='_blank'
              >
                GitHub
              </Button>
            </Group>
          </div>
          <div className='w-3/4'>
            <Image
              src='/dashboard.png'
              alt='A screenshot of the dashboard'
              radius='md'
              className='shadow-hero-image hover:shadow-hero-image-hover transition-shadow duration-500'
            />
          </div>
        </div>
        <SimpleGrid
          cols={2}
          spacing='xl'
          verticalSpacing='xl'
          className='w-10/12'
        >
          {carouselSlides.map((slide, index) => (
            <Card key={index} shadow='sm' padding='none' radius='md'>
              <Card.Section>
                <Image src={slide.image} alt={slide.text} />
              </Card.Section>
              <p className='text-center m-4 text-lg'>{slide.text}</p>
            </Card>
          ))}
        </SimpleGrid>
      </main>
    </>
  )
}
