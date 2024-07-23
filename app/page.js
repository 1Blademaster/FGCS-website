'use client'

import Header from '@/components/header'
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
import { IconBug, IconTool, IconUsers } from '@tabler/icons-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import NextImage from 'next/image'
import { useEffect, useState } from 'react'
import 'swiper/css'
import resolveConfig from 'tailwindcss/resolveConfig'
const tailwindColors = resolveConfig(tailwindConfig).theme.colors

dayjs.extend(relativeTime)

const features = [
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

const iconProps = {
  size: 18,
  className: 'inline align-[-2px]',
}

export default function Home() {
  const [contributors, setContributors] = useState([])
  const [repoStats, setRepoStats] = useState(null)

  useEffect(() => {
    async function getContributors() {
      const res = await fetch('/api/contributors', {
        cache: 'force-cache',
        next: { revalidate: 3600 },
      })

      if (!res.ok) {
        console.error('Failed to get contributors')
        return
      }

      const data = await res.json()

      setContributors(data.contributors)
    }

    async function getRepoStats() {
      const res = await fetch('/api/repo')

      if (!res.ok) {
        console.error('Failed to get repo stats')
        return
      }

      const data = await res.json()

      setRepoStats(data.repoStats)
    }

    getContributors()
    getRepoStats()
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
          FGCS <span className='text-xs font-normal align-super'>alpha</span>
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
                href='https://github.com/Avis-Drone-Labs/FGCS/releases/latest'
                target='_blank'
              >
                Download
              </Button>
              <Button
                color={tailwindColors.falconred[80]}
                variant='outline'
                component={'a'}
                href='https://github.com/Avis-Drone-Labs/FGCS/'
                target='_blank'
              >
                GitHub
              </Button>
            </Group>
          </div>
          <div className='w-full md:w-7/12 lg:w-3/4'>
            <Image
              src='/dashboard.webp'
              alt='A screenshot of the dashboard'
              radius='md'
              className='shadow-hero-image hover:shadow-hero-image-hover transition-shadow duration-500'
            />
          </div>
        </div>

        <div className='w-full'>
          <Header text='Features' icon={<IconTool {...iconProps} />} />
          <SimpleGrid
            cols={{ base: 1, sm: 2 }}
            spacing={{ base: 'md', sm: 'xl' }}
            verticalSpacing={{ base: 'md', sm: 'xl' }}
            className='w-full lg:w-10/12 mx-auto'
          >
            {features.map((feature, index) => (
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
                    src={feature.image}
                    alt={feature.text}
                    className='px-4 pt-4 bg-falcongray'
                  />
                </Card.Section>
                <p className='text-center m-4 text-md md:text-lg '>
                  {feature.text}
                </p>
              </Card>
            ))}
          </SimpleGrid>

          <p className='text-center mt-6 text-gray-400'>
            Note: Currently only{' '}
            <a
              href='https://ardupilot.org/'
              target='_blank'
              className='text-falconred-80 hover:underline'
            >
              ArduPilot
            </a>{' '}
            COPTER and PLANE devices are supported.
          </p>
        </div>

        {contributors.length > 0 && (
          <div className='w-full text-center'>
            <Header text='Contributors' icon={<IconUsers {...iconProps} />} />

            <div className='w-full flex flex-row flex-wrap justify-center gap-2'>
              {contributors.map((contributor, index) => (
                <Tooltip
                  key={index}
                  label={contributor.name}
                  color={tailwindColors.falcongray[80]}
                  transitionProps={{ transition: 'fade-up', duration: 100 }}
                >
                  <Avatar
                    src={contributor.avatar}
                    alt={contributor.name}
                    radius='sm'
                    component='a'
                    href={contributor.url}
                    target='_blank'
                    className='shadow-md hover:shadow-contributor-avatar-image-hover transition-shadow duration-500'
                  />
                </Tooltip>
              ))}
            </div>
          </div>
        )}

        <div className='w-full text-center'>
          <Header
            text='Found a bug or would like an extra feature?'
            icon={<IconBug {...iconProps} />}
          />

          <p className='w-full md:w-1/2 lg:w-1/3 mx-auto'>
            If you found a bug, have an idea for an improvement or want to ask
            us a question then please submit an issue on GitHub{' '}
            <a
              href='https://github.com/Avis-Drone-Labs/FGCS/issues/new/choose'
              target='_blank'
              className='text-falconred-80 hover:underline'
            >
              here
            </a>
            .
          </p>
        </div>
      </main>
      <footer className='w-full text-center py-4 bg-falcongray-90'>
        {repoStats !== null && (
          <a
            href={repoStats?.url}
            target='_blank'
            className='text-sm hover:underline'
          >
            Version {repoStats?.version} published{' '}
            {dayjs(repoStats?.publishedAt).fromNow()}
          </a>
        )}
      </footer>
    </>
  )
}
