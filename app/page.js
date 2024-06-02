'use client'

import tailwindConfig from '@/tailwind.config.js'
import {
  Avatar,
  Button,
  Card,
  Group,
  Image,
  SimpleGrid,
  Tooltip,
} from '@mantine/core'
import NextImage from 'next/image'
import { useEffect, useState } from 'react'
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
  const [contributors, setContributors] = useState([])

  useEffect(() => {
    async function getContributors() {
      const res = await fetch('/github', {
        cache: 'force-cache',
        next: { revalidate: 3600 },
      })

      if (!res.ok) {
        console.error('Failed to get contributors')
        return
      }

      const data = await res.json()

      console.log(data)

      setContributors(data.contributors)
    }

    getContributors()
  }, [])
  return (
    <>
      <div className='flex items-center justify-center my-4 gap-2'>
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

      <main className='flex min-h-screen flex-col items-center justify-between px-8 md:px-14 lg:px-24 pb-24 pt-6 gap-12 sm:gap-16 md:gap-20 lg:gap-28'>
        <div className='flex flex-col md:flex-row w-full items-center justify-center gap-6 md:gap-10'>
          <div className='flex flex-col w-full md:w-1/3'>
            <p className='font-bold text-2xl sm:text-3xl md:text-4xl'>
              A <span className='text-falconred'>modern</span> ground control
              station for your ArduPilot aircraft
            </p>
            <p className='text-md md:text-lg my-2'>
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
          <div className='w-full md:w-7/12 lg:w-3/4'>
            <Image
              src='/dashboard.png'
              alt='A screenshot of the dashboard'
              radius='md'
              className='shadow-hero-image hover:shadow-hero-image-hover transition-shadow duration-500'
            />
          </div>
        </div>

        <SimpleGrid
          cols={{ base: 1, sm: 2 }}
          spacing={{ base: 'md', sm: 'xl' }}
          verticalSpacing={{ base: 'md', sm: 'xl' }}
          className='w-full lg:w-10/12'
        >
          {carouselSlides.map((slide, index) => (
            <Card
              className='border border-gray-700 hover:border-gray-600 duration-500 transition-colors'
              bg={tailwindColors.falcongray[100]}
              key={index}
              shadow='md'
              padding='none'
              radius='md'
            >
              <Card.Section>
                <Image
                  src={slide.image}
                  alt={slide.text}
                  className='p-4 bg-falcongray'
                />
              </Card.Section>
              <p className='text-center m-4 text-md md:text-lg '>
                {slide.text}
              </p>
            </Card>
          ))}
        </SimpleGrid>

        <div className='w-full'>
          {contributors.length > 0 ? (
            <div className='w-full flex flex-row flex-wrap justify-center gap-4'>
              {contributors.map((contributor, index) => (
                <Tooltip label={contributor.name} key={index}>
                  <Avatar
                    src={contributor.avatar}
                    alt={contributor.name}
                    radius='sm'
                  />
                </Tooltip>
              ))}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </main>
    </>
  )
}
