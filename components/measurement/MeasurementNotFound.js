/* global process */
import React from 'react'
import NavBar from '../NavBar'
import { Container, Flex, Box, Heading, Text } from 'ooni-components'
import { useRouter } from 'next/router'

import OONI404 from '../../public/static/images/OONI_404.svg'

const MeasurementNotFound = () => {
  const { asPath } = useRouter()
  return (
    <React.Fragment>
      <NavBar />
      <Container>
        <Flex justifyContent='space-around' alignItems='center' my={5}>
          <OONI404 height='200px' />
          <Box width={1/2}>
            <Heading h={4}>Measurement Not Found</Heading>
            <Text color='gray8'>
              {`${process.env.NEXT_PUBLIC_EXPLORER_URL}${asPath}`}
            </Text>
          </Box>
        </Flex>
      </Container>
    </React.Fragment>
  )
}

export default MeasurementNotFound
