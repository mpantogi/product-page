import { useState, useEffect } from 'react';
import { Flex, Box, useMediaQuery } from '@chakra-ui/react';
import { ProductQuantityProvider } from '../store/productQuantity-context';
import ProductView from './ProductView';
import ProductDetailsList from './ProductDetailsList';

export default function ProductDetails() {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = () => {
    fetch('data.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setProductData(myJson);
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const [isLargeScreen] = useMediaQuery('(min-width: 1140px)');
  const productDetails = productData?.data?.storefrontBySlug;

  if (loading)
    return (
      <Box align="center" p="20px">
        Loading...
      </Box>
    );

  if (productData.length === 0)
    return (
      <Box align="center" p="20px">
        No product data available
      </Box>
    );

  return (
    <Flex
      w="100%"
      gap="30px"
      p="20px"
      direction={isLargeScreen ? 'row' : 'column'}
    >
      <ProductView
        id={productDetails?.id}
        description={productDetails?.listing?.description}
        images={productDetails?.listing?.images}
      />
      <ProductQuantityProvider>
        <ProductDetailsList
          id={productDetails?.id}
          name={productDetails?.name}
          minimumOrder={productDetails?.minimumOrderAmount}
          currency={productDetails?.listing?.currency}
          realAverageReviewScore={productDetails?.realAverageReviewScore}
          reviewScore={productDetails?.reviewScore}
          reviewTotalCount={productDetails?.reviews?.totalCount}
          title={productDetails?.listing?.title}
          productOptions={productDetails?.listing?.variants?.edges}
        />
      </ProductQuantityProvider>
    </Flex>
  );
}
