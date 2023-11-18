import { Card, Color, Flex, Text, Title, Tracker } from '@tremor/react'

interface Tracker {
  color: Color
  tooltip: string
}

const stats = [
  { id: 1, name: 'Creators on the platform', value: '8,000+' },
  { id: 2, name: 'Flat platform fee', value: '3%' },
  { id: 3, name: 'Uptime guarantee', value: '99.9%' },
  { id: 4, name: 'Paid out to creators', value: '$70M' },
]

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
]

export function PublicPageStatus() {
  return (
    <div className='py-6 sm:py-8 lg:py-10'>
      <div className='mx-auto max-w-2xl lg:max-w-none'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            All system operational
          </h2>
          <p className='mt-4 text-sm font-medium leading-8 text-gray-600'>
            Last updated on Nov 18 at 08:52pm UTC
          </p>
        </div>

        <dl className='mt-14 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center shadow sm:grid-cols-2 lg:grid-cols-4'>
          {stats.map((stat) => (
            <div key={stat.id} className='flex flex-col bg-orange-900/5 p-8'>
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
            <Text>example.com &bull; Oct 2023</Text>
            <Flex justifyContent='end' className='mt-4'>
              <Text>Uptime 92%</Text>
            </Flex>
            <Tracker data={data} className='mt-2' />
          </Card>
          <Card>
            <Title>Public API</Title>
            <Text>api.example.com &bull; Oct 2022</Text>
            <Flex justifyContent='end' className='mt-4'>
              <Text>Uptime 92%</Text>
            </Flex>
            <Tracker data={data} className='mt-2' />
          </Card>
          <Card>
            <Title>Admin Dashboard</Title>
            <Text>admin.example.com &bull; Oct 2022</Text>
            <Flex justifyContent='end' className='mt-4'>
              <Text>Uptime 92%</Text>
            </Flex>
            <Tracker data={data} className='mt-2' />
          </Card>
        </div>
      </div>
    </div>
  )
}
