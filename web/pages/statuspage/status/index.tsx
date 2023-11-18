import { useEffect, useState } from 'react'
import { Card, Color, Flex, Text, Title, Tracker } from '@tremor/react'

interface Tracker {
  color: Color
  tooltip: string
}

const stats = [
  { id: 1, name: 'Last 24 hours', value: '100%' },
  { id: 2, name: 'Last 7 days', value: '100%' },
  { id: 3, name: 'Last 30 days', value: '99.9%' },
  { id: 4, name: 'Last 90 days', value: '99.9%' },
]

// Last 90 days
const data: Tracker[] = [
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'rose', tooltip: 'Downtime' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'rose', tooltip: 'Downtime' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'rose', tooltip: 'Downtime' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'gray', tooltip: 'Maintenance' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'yellow', tooltip: 'Degraded' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'yellow', tooltip: 'Degraded' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'rose', tooltip: 'Downtime' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'gray', tooltip: 'Maintenance' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'yellow', tooltip: 'Degraded' },
  { color: 'yellow', tooltip: 'Degraded' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
  { color: 'emerald', tooltip: 'Operational' },
]

export function PublicPageStatus() {
  return (
    <div className='py-5 sm:py-7 lg:py-9'>
      <div className='mx-auto max-w-2xl lg:max-w-none'>
        <div className='text-center'>
          <Title color='blue' className='text-3xl font-bold tracking-tight sm:text-4xl'>
            All system operational
          </Title>
          <div className='mt-6 text-sm font-medium'>
            <Text className='leading-7 text-gray-600'>Last updated on Nov 18 at 08:52pm UTC</Text>
            <CountdownTimer initialTime={60} />
          </div>
        </div>

        <dl className='mt-12 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4'>
          {stats.map((stat) => (
            <div key={stat.id} className='flex flex-col bg-blue-800/5 p-8'>
              <dt className='text-sm font-semibold leading-6 text-gray-600'>{stat.name}</dt>
              <dd className='order-first text-3xl font-semibold tracking-tight text-gray-900'>
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className='mt-8 flex flex-col gap-4'>
          <Card>
            <Title>Primary Website</Title>
            <Flex justifyContent='between' className='mt-2'>
              <Text color='gray'>pingplop.com &mdash; Operational</Text>
              <Text color='green'>Uptime 92%</Text>
            </Flex>
            <Tracker data={data} className='mt-2' />
          </Card>

          <Card>
            <Title>Public API</Title>
            <Flex justifyContent='between' className='mt-2'>
              <Text color='gray'>api.pingplop.com &mdash; Operational</Text>
              <Text color='green'>Uptime 92%</Text>
            </Flex>
            <Tracker data={data} className='mt-2' />
          </Card>
        </div>
      </div>
    </div>
  )
}

const CountdownTimer = ({ initialTime }: { initialTime: number }) => {
  const currTime = sessionStorage.getItem('countdownTime') as string
  const storedTime = parseInt(currTime) || initialTime
  const [time, setTime] = useState(storedTime)

  useEffect(() => {
    const interval = setInterval(() => {
      // Decrease the time by 1 second
      setTime((prevTime) => prevTime - 1)

      // Check if the countdown reaches 0, then reset to the initial time
      if (time === 0) {
        setTime(initialTime)
      }
    }, 1000)

    // Save the current time to sessionStorage
    sessionStorage.setItem('countdownTime', time.toString())

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval)
  }, [time, initialTime])

  // Convert seconds to minutes and seconds for display
  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  return (
    <Text className='leading-7 text-gray-600'>
      Next update in {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </Text>
  )
}
