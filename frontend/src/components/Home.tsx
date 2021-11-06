import { Container, Flex, Heading, Stack } from '@chakra-ui/react';

const Home = () => {
    return (
        <div>
            <Flex align='center' h='100vh'>
                <Container>
                    <Stack spacing={2}>
                        <Heading>
                            Dobrodošli na spletni strani Secret Santa
                        </Heading>
                    </Stack>
                </Container>
            </Flex>
        </div>
    );
}

export default Home;