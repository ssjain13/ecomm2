import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

export const OrderItems = ({label, value}) => {
  return (
    <Flex justifyContent={"space-between"}>
    <Text>{label}</Text>
    <Text>{value}</Text>
  </Flex>
  )
}
