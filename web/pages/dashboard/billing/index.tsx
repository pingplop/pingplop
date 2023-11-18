import { Card, Grid, Tab, TabGroup, TabList, TabPanel, TabPanels, Text, Title } from '@tremor/react'

export default function Page() {
  return (
    <>
      <Title>Billing &amp; Invoices</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>
      <TabGroup className='mt-6'>
        <TabList>
          <Tab>Page 1</Tab>
          <Tab>Page 2</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={3} className='mt-6 gap-6'>
              <Card>
                {/* Placeholder to set height */}
                <div className='h-28' />
              </Card>
              <Card>
                {/* Placeholder to set height */}
                <div className='h-28' />
              </Card>
              <Card>
                {/* Placeholder to set height */}
                <div className='h-28' />
              </Card>
            </Grid>
            <div className='mt-6'>
              <Card>
                <div className='h-80' />
              </Card>
            </div>
          </TabPanel>
          <TabPanel>
            <div className='mt-6'>
              <Card>
                <div className='h-96' />
              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  )
}
