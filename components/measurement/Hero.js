import React from 'react'
import PropTypes from 'prop-types'
import { Container, Flex, Box, Text } from 'ooni-components'
import { Tick, Cross } from 'ooni-components/dist/icons'
import {MdHelp, MdPriorityHigh} from 'react-icons/lib/md'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

const HeroContainer = styled(Box)`
  background-color: ${props => props.color};
  color: white;
`

const StatusLabel = styled(Text)`
  font-weight: 600;
`

const Hero = ({ status, color, icon, label, info }) => {
  let computedLabel = ''
  if (status) {
    switch (status) {
    case 'anomaly':
      computedLabel = <FormattedMessage id='Measurement.Hero.Status.Anomaly' />
      icon = <MdPriorityHigh />
      break
    case 'reachable':
      computedLabel = <FormattedMessage id='Measurement.Hero.Status.Reachable' />
      icon = <Tick />
      break
    case 'error':
      computedLabel = <FormattedMessage id='Measurement.Hero.Status.Error' />
      icon = <MdHelp />
      break
    case 'confirmed':
      computedLabel = <FormattedMessage id='Measurement.Hero.Status.Confirmed' />
      icon = <Cross />
      break
    case 'down':
      computedLabel = <FormattedMessage id='Measurement.Hero.Status.Down' />
      icon = <MdHelp />
      break
    default:
      icon = icon || <div/>
    }
  }

  if (!label) {
    label = computedLabel
  }

  return (
    <HeroContainer py={4} color={color}>
      <Container>
        <Flex pb={4} justifyContent='center'>
          <Box>
            <StatusLabel fontSize={4}>
              {icon} {label}
            </StatusLabel>
          </Box>
        </Flex>
        {info &&
          <Text fontSize={28} textAlign='center'>
            {info}
          </Text>
        }
      </Container>
    </HeroContainer>
  )
}

Hero.propTypes = {
  status: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.node,
  label: PropTypes.string,
  info: PropTypes.node
}
export default Hero
