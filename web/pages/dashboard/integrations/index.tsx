import { Text, Title } from '@tremor/react'

import EmptySlot from '@/components/empty-slot'

export default function Page() {
  return (
    <>
      <Title>Integrations</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>
      <div className='mt-6'>
        <EmptySlot />
      </div>
    </>
  )
}
