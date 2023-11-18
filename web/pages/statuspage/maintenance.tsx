import { Text, Title } from '@tremor/react'

export function PublicPageMaintenance() {
  return (
    <div className='py-5 sm:py-7 lg:py-9'>
      <div className='mx-auto max-w-2xl lg:max-w-none'>
        <div className='text-center'>
          <Title className='text-3xl font-bold tracking-tight sm:text-4xl'>
            Scheduled maintenance
          </Title>
          <div className='mt-6 text-sm font-medium'>
            <Text className='leading-7 text-gray-600'>No maintenance scheduled</Text>
          </div>
        </div>
        {/* Put main content here */}
      </div>
    </div>
  )
}
