import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Card,
  CardBody,
  Image,
  Stack
} from '@chakra-ui/react';
import { useState } from 'react';

export default function ProductView({ id, description, images }) {
  const noOfLines = 4;
  const [expandedCount, setExpandedCount] = useState(noOfLines);
  const [currentImage, setCurrentImage] = useState(
    images?.edges[0]?.node?.small
  );

  const handleToggle = () =>
    setExpandedCount(expandedCount ? undefined : noOfLines);

  return (
    <Card variant="unstyled">
      <CardBody>
        <Flex gap="20px">
          <Stack direction="column" spacing="20px">
            <Box display="block">
              {images?.edges?.map((image) => (
                <Image
                  m="0px 10px 10px 0px"
                  h="100px"
                  w="100px"
                  minH="100px"
                  minW="100px"
                  key={image?.id}
                  src={image?.node?.small}
                  borderRadius="15px"
                  cursor="pointer"
                  onClick={(e) => setCurrentImage(e.target.src)}
                  border={
                    currentImage === image?.node?.small
                      ? '1px solid gray'
                      : '1px solid lightgray'
                  }
                  _hover={{ border: '1px solid gray' }}
                />
              ))}
            </Box>
          </Stack>
          <Flex direction="column">
            <Box maxW="700px" minW="540px">
              <Image
                px="20px"
                src={currentImage}
                w="100%"
                h="100%"
                border="1px solid lightgray"
              />
            </Box>
            <Box textAlign="left" mt="20px" maxW="700px">
              <Heading as="h4" size="md" py="5px">
                Information
              </Heading>
              <Text noOfLines={expandedCount}>{description}</Text>
              <Button
                size="sm"
                variant="link"
                fontWeight="bold"
                textDecoration="none"
                _hover={{ textDecoration: 'none' }}
                onClick={handleToggle}
              >
                {!expandedCount ? 'Show less' : 'Read more'}
              </Button>
            </Box>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
}
