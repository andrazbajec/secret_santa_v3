import { Container, Button, InputGroup, Grid, Flex, GridItem } from '@chakra-ui/react';
import { Link }                                                from "react-router-dom";
import { useEffect, useState }                                 from 'react';
import axios                                                   from 'axios';
import BaseHelper                                              from '../../helpers/BaseHelper';
import { RoomListDB, RoomListDBElement }                       from '../../interfaces/RoomInterface';

const RoomList = () => {
    const [getState, setState] = useState<RoomListDB>({
        rooms: []
    });

    useEffect(() => {
        const url = BaseHelper.generateUrl('room-list');

        axios.get(url)
            .then((res: any) => {
                const rooms: RoomListDBElement[] = res.data;
                setState({...getState, rooms: rooms});
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <Flex align='center' h='100vh'>
                <Container className='scroll roomList-container'>
                    <Grid templateColumns={{
                        base: "repeat(2, 1fr)",
                        sm: "repeat(3, 1fr)",
                        lg: "repeat(4, 1fr)",
                        xl: "repeat(5, 1fr)"
                    }} gap={3}>
                        {
                            getState.rooms.map(room => (
                                <GridItem className="card"
                                          key={room.RoomUrl}
                                >
                                    <div className="face back">
                                        <div className="card-content">
                                            <h2>
                                                {room.Author}
                                            </h2>
                                            <p>
                                                <i className="fas fa-users"/> {room.Users}
                                            </p>
                                            <p>
                                                <i className="fas fa-lock"/>
                                            </p>
                                        </div>
                                        <Link to={`/soba/${room.RoomUrl}`} className="open-room">
                                            <Button colorScheme="green"
                                                    variant="outline"
                                                    w="100%"
                                            >
                                                Odpri sobo
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className="face front">
                                        <h2>
                                            {room.Title}
                                        </h2>
                                    </div>
                                </GridItem>
                            ))
                        }
                    </Grid>
                </Container>
            </Flex>
        </div>
    );
}

export default RoomList;