import { Flex } from '@chakra-ui/react';

export default function ActionButton({ children, ...props }) {
  return (
    <Flex
      as="button"
      align="center"
      minW="280px"
      color="white"
      h="40px"
      px="25px"
      flex={props.flex || null}
      justify={props?.justify || 'center'}
      bgColor={props?.bgColor || 'black'}
      onClick={props?.onClick}
    >
      {children}
    </Flex>
  );
}
