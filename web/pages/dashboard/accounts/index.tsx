import { Tab, TabGroup, TabList, TabPanel, TabPanels, Text, Title } from '@tremor/react'

import EmptySlot from '@/components/empty-slot'

export default function Page() {
  return (
    <>
      <Title>Account Settings</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>
      <TabGroup className='mt-6'>
        <TabList>
          <Tab>Profile</Tab>
          <Tab>Security</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <EmptySlot className='mt-6' />
          </TabPanel>
          <TabPanel>
            <EmptySlot className='mt-6' />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  )
}
