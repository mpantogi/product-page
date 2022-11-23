import { useState, useContext } from 'react';
import {
  Box,
  Flex,
  Link,
  Stack,
  Text,
  Heading,
  IconButton
} from '@chakra-ui/react';
import {
  AiOutlineStar,
  AiFillStar,
  AiOutlineHeart,
  AiFillHeart
} from 'react-icons/ai';
import { BsCheck, BsShieldShaded } from 'react-icons/bs';
import { BiMessageDots } from 'react-icons/bi';
import { ProductQuantityContext } from '../store/productQuantity-context';
import ActionButton from './common/ActionButton';
import ProductTable from './ProductTable';

export default function ProductDetailsList({
  id,
  name,
  minimumOrder,
  currency,
  realAverageReviewScore,
  reviewScore,
  reviewTotalCount,
  title,
  productOptions
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { quantity } = useContext(ProductQuantityContext);
  let displayCurrency = currency === 'EUR' ? '€' : '$';

  const reviewsHandler = () => {
    let reviews = [];
    for (let i = 1; i <= reviewScore; i++) {
      if (i < realAverageReviewScore) {
        reviews = [...reviews, <AiFillStar color="gold" />];
      } else {
        reviews = [...reviews, <AiOutlineStar color="gold" />];
      }
    }
    return reviews;
  };

  const finalAmount = () =>
    productOptions?.reduce((acc, item, index) => {
      return acc + item?.node?.price * quantity[index];
    }, 0);

  return (
    <Stack direction="column">
      <Box>
        <Flex gap="5px" align="center">
          <Link textDecoration="underline" color="gray" href="#">
            {name}
          </Link>
          <Text color="gray">
            - {displayCurrency}
            {minimumOrder} Order minimum
          </Text>
        </Flex>
        <Flex gap="5px" align="center">
          <Flex>{reviewsHandler()}</Flex>
          <Text fontWeight="bold">
            {Number(realAverageReviewScore).toFixed(1)}
          </Text>
          <Link textDecoration="underline" color="gray" href="#">
            ({reviewTotalCount} Reviews)
          </Link>
        </Flex>
      </Box>
      <Heading as="h3" size="lg" textAlign="left">
        {title}
      </Heading>
      <ProductTable
        productOptions={productOptions}
        displayCurrency={displayCurrency}
        checkIcon={
          <Box
            bg="green"
            borderRadius="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="15px"
            h="15px"
          >
            <BsCheck color="white" />
          </Box>
        }
      />
      <Box>
        <Flex gap="5px" align="center">
          <BsCheck color="green" size="25px" />
          <Text color="green">Available</Text>
        </Flex>
        <Text textAlign="left" color="green">
          Ships directly from brand in 1-2 weeks
        </Text>
      </Box>
      <Flex gap="25px" py="15px" direction="column" w="100%" maxW="400px">
        <ActionButton
          justify="space-between"
          bgColor="green"
          onClick={() => alert('Product added to the cart')}
        >
          <Text fontWeight="bold">ADD TO CART</Text>
          <Text fontWeight="bold">
            {displayCurrency}
            {finalAmount().toFixed(2)}
          </Text>
        </ActionButton>
        <Flex direction="column" gap="10px">
          <Flex justify="space-between" gap="10px">
            <ActionButton onClick={() => setIsFavorite(!isFavorite)} flex="1">
              <Text fontWeight="bold" mr="10px">
                {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
              </Text>
              <Text fontWeight="bold">
                {isFavorite ? 'REMOVE FROM FAVORITES' : 'ADD TO FAVORITES'}
              </Text>
            </ActionButton>
            <IconButton
              aria-label="send message"
              icon={<BiMessageDots />}
              h="40px"
              variant="outline"
              borderRadius="0"
              border="1px solid lightgray"
              _hover={{ bg: 'lightgray' }}
              _active={{ bg: 'lightgray' }}
              onClick={() => alert('Send Message')}
            />
          </Flex>
          <Flex
            h="40px"
            bgColor="lightgray"
            align="center"
            p="10px"
            justify="flex-start"
            gap="10px"
          >
            <Box
              bgColor="white"
              w="30px"
              h="30px"
              borderRadius="5px"
              alignItems="center"
              justifyContent="center"
              display="flex"
            >
              <BsShieldShaded />
            </Box>
            <Text textAlign="left" fontSize="14px" lineHeight="18px">
              Learn about{' '}
              <Link textDecoration="underline" href="#">
                Buyer Protection and Secured Payments
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Stack>
  );
}
