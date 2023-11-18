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
            <Text className='leading-7 text-gray-600'>Next update in 35 sec</Text>
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
            <Title>Marketing Website</Title>
            <Text color='gray'>example.com &mdash; Operational</Text>
            <Flex justifyContent='end' className='mt-4'>
              <Text color='green'>Uptime 92%</Text>
            </Flex>
            <Tracker data={data} className='mt-2' />
          </Card>

          <Card>
            <Title>Public API</Title>
            <Text color='gray'>api.example.com &mdash; Operational</Text>
            <Flex justifyContent='end' className='mt-4'>
              <Text color='green'>Uptime 92%</Text>
            </Flex>
            <Tracker data={data} className='mt-2' />
          </Card>
        </div>
      </div>
    </div>
  )
}
