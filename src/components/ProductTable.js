import { useEffect, useContext } from 'react';
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
  Text,
  Box,
  Card
} from '@chakra-ui/react';
import { HiPlusSm, HiMinusSm } from 'react-icons/hi';
import { ProductQuantityContext } from '../store/productQuantity-context';

export default function ProductTable({
  productOptions,
  checkIcon,
  displayCurrency
}) {
  const { quantity, setQuantity } = useContext(ProductQuantityContext);

  useEffect(() => {
    setQuantity(productOptions?.map((item, index) => (index === 0 ? 1 : 0)));
  }, []);

  const productVariants = (productOption) => {
    const variant = productOption?.node?.options.map((option, index) => (
      <strong>{option?.value + (!index ? ' - ' : '')}</strong>
    ));
    return variant;
  };

  if (productOptions.length === 0) {
    return null;
  }

  const quantityIncrement = (index) => {
    const newQuantity = [...quantity];
    newQuantity[index] += 1;
    setQuantity(newQuantity);
  };

  const quantityDecrement = (index) => {
    const newQuantity = [...quantity];
    if (newQuantity[index] > 0) {
      newQuantity[index] -= 1;
    } else {
      newQuantity[index] = 0;
    }
    setQuantity(newQuantity);
  };

  return (
    <Card variant="unstyled">
      <TableContainer>
        <Table variant="unstyled">
          <Thead>
            <Tr>
              <Th>Quantity</Th>
              <Th>Variant</Th>
              <Th>Price</Th>
              <Th>MSRP</Th>
              <Th>Stock</Th>
            </Tr>
          </Thead>
          <Tbody>
            {productOptions.map((productOption, index) => (
              <Tr key={productOption?.node?.id}>
                <Td>
                  <Flex align="center" gap="5px">
                    <HiMinusSm
                      as="button"
                      color="gray"
                      size="20px"
                      cursor="pointer"
                      onClick={() => quantityDecrement(index)}
                    />
                    <Box
                      w="40px"
                      h="40px"
                      bg="transparent"
                      border="1px solid lightgray"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {quantity[index]}
                    </Box>
                    <HiPlusSm
                      as="button"
                      color="gray"
                      size="20px"
                      cursor="pointer"
                      onClick={() => quantityIncrement(index)}
                    />
                  </Flex>
                </Td>
                <Td minW="250px" whiteSpace="normal">
                  {productVariants(productOption)}
                </Td>
                <Td fontWeight="bold">
                  {displayCurrency}
                  {productOption?.node?.price}
                </Td>
                <Td>
                  <Flex direction="column">
                    <Text fontWeight="bold">
                      {displayCurrency}
                      {productOption?.node?.msrp}
                    </Text>
                    <Text color="gray">x17</Text>
                  </Flex>
                </Td>
                <Td textAlign={'-webkit-center'}>{checkIcon}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  );
}
