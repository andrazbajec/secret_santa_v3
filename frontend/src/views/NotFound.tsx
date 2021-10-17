import { Flex, Heading } from '@chakra-ui/react';

const NotFound = () => {
    return (
        <div>
            <Flex align="center"
                  justify="center"
                  h="100vh"
            >
                <Heading>Page not found</Heading>
            </Flex>
        </div>
    );
}

export default NotFound;