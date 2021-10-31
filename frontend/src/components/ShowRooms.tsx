import { Container, Stack, Table, Thead, Tr, Th, Tbody, Button, useToast } from '@chakra-ui/react';

const ShowRooms = () => {
    return (
        <div>
            <Container>
                <Button>Odprte sobe</Button>
                <Button>Zaprte sobe</Button>
                <Button>Zgodovina sob</Button>
                <Stack spacing={4}>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Ime sobe</Th>
                                <Th>Status sobe</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr id='odprta'>
                                <Th>Testna soba</Th>
                                <Th>Odprta</Th>
                            </Tr>
                            <Tr className='zaprta'>
                                <Th>Testna soba1</Th>
                                <Th>Zaprta</Th>
                            </Tr>
                            <Tr id='odprta'>
                                <Th>Testna soba</Th>
                                <Th>Odprta</Th>
                            </Tr>
                            <Tr className='zaprta'>
                                <Th>Testna soba1</Th>
                                <Th>Zaprta</Th>
                            </Tr>
                            <Tr className='zaprta'>
                                <Th>Testna soba</Th>
                                <Th>Zaprta</Th>
                            </Tr>
                            <Tr className='zaprta'>
                                <Th>Testna soba1</Th>
                                <Th>Zaprta</Th>
                            </Tr>
                            <Tr id='odprta'>
                                <Th>Testna soba</Th>
                                <Th>Odprta</Th>
                            </Tr>
                            <Tr className='zaprta'>
                                <Th>Testna soba1</Th>
                                <Th>Zaprta</Th>
                            </Tr>
                            <Tr id='odprta'>
                                <Th>Testna soba</Th>
                                <Th>Odprta</Th>
                            </Tr>
                            <Tr className='koncana'>
                                <Th>Testna soba1</Th>
                                <Th>Končana</Th>
                            </Tr>
                            <Tr id='odprta'>
                                <Th>Testna soba</Th>
                                <Th>Odprta</Th>
                            </Tr>
                            <Tr className='zaprta'>
                                <Th>Testna soba1</Th>
                                <Th>Zaprta</Th>
                            </Tr>
                            <Tr id='odprta'>
                                <Th>Testna soba</Th>
                                <Th>Odprta</Th>
                            </Tr>
                            <Tr className='zaprta'>
                                <Th>Testna soba1</Th>
                                <Th>Zaprta</Th>
                            </Tr>
                            <Tr id='odprta'>
                                <Th>Testna soba</Th>
                                <Th>Odprta</Th>
                            </Tr>
                            <Tr id='odprta'>
                                <Th>Testna soba1</Th>
                                <Th>Odprta</Th>
                            </Tr>
                            <Tr id='odprta'>
                                <Th>Testna soba</Th>
                                <Th>Odprta</Th>
                            </Tr>
                            <Tr className='zaprta'>
                                <Th>Testna soba1</Th>
                                <Th>Zaprta</Th>
                            </Tr>
                            <Tr id='odprta'>
                                <Th>Testna soba</Th>
                                <Th>Odprta</Th>
                            </Tr>
                            <Tr className='koncana'>
                                <Th>Testna soba1</Th>
                                <Th>Končana</Th>
                            </Tr>
                            <Tr className='zaprta'>
                                <Th>Testna soba</Th>
                                <Th>Zaprta</Th>
                            </Tr>
                            <Tr className='zaprta'>
                                <Th>Testna soba1</Th>
                                <Th>Zaprta</Th>
                            </Tr>
                            <Tr id='odprta'>
                                <Th>Testna soba</Th>
                                <Th>Odprta</Th>
                            </Tr>
                            <Tr className='zaprta'>
                                <Th>Testna soba1</Th>
                                <Th>Zaprta</Th>
                            </Tr>
                        </Tbody>
                    </Table>
                </Stack>
            </Container>
        </div>
    );
}

export default ShowRooms;