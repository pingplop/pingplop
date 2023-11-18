import { Text, Title } from '@tremor/react'

export function PublicPageIncidents() {
  return (
    <div className='py-5 sm:py-7 lg:py-9'>
      <div className='mx-auto max-w-2xl lg:max-w-none'>
        <div className='text-center'>
          <Title className='text-3xl font-bold tracking-tight sm:text-4xl'>
            Previous incidents
          </Title>
          <div className='mt-6 text-sm font-medium'>
            <Text className='leading-7 text-gray-600'>No incidents reported</Text>
          </div>
        </div>
        {/* Put main content here */}
      </div>
    </div>
  )
}
