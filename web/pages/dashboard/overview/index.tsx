import { Card, Col, Grid, Text, Title } from '@tremor/react'

export default function Page() {
  return (
    <div>
      <Title>Overview</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>

      <Grid numItemsLg={6} className='mt-6 gap-6'>
        {/* Main section */}
        <Col numColSpanLg={4}>
          <Card className='h-full'>
            <div className='h-60' />
          </Card>
        </Col>

        {/* KPI sidebar */}
        <Col numColSpanLg={2}>
          <div className='space-y-6'>
            <Card>
              <div className='h-24' />
            </Card>
            <Card>
              <div className='h-24' />
            </Card>
            <Card>
              <div className='h-24' />
            </Card>
          </div>
        </Col>
      </Grid>
    </div>
  )
}
