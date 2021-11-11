import { Container, Flex, Grid, GridItem, Heading, useToast } from '@chakra-ui/react';
import { Link }                                               from "react-router-dom";
import { useEffect, useState }                                from 'react';
import axios                                                  from 'axios';
import BaseHelper                                             from '../../helpers/BaseHelper';
import { RoomListDB, RoomListDBElement, RoomStatus }          from '../../interfaces/RoomInterface';

const RoomList = () => {
    const toast = useToast();

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
                toast({
                    title: 'Could not get room data',
                    description: error.response.data,
                    status: 'error',
                    duration: 3000
                });
            });
    }, []);

    return (
        <div>
            <Flex align='center' h='100vh'>
                <Container className='scroll roomList-container' d='block'>
                    <Heading>
                        Seznam sob
                    </Heading>
                    <hr/>
                    <Heading size="md" padding='5px'>
                        Tu so prikazane javne sobe.
                    </Heading>
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
                                            <h2 className='room-text'>
                                                {room.Author}
                                            </h2>
                                            <p className='room-text'>
                                                <i className="fas fa-users room-icon"/> {room.Users}
                                            </p>
                                            <p>
                                                {
                                                    room.Status === RoomStatus.OPEN
                                                        ? <i className="fal fa-door-open room-icon open"/>
                                                        : room.Status === RoomStatus.IN_PROGRESS
                                                            ? <i className="fal fa-door-open room-icon in-progress"/>
                                                            : <i className="fal fa-door-open room-icon ended"/>
                                                }
                                            </p>
                                        </div>
                                        <Link to={`/soba/${room.RoomUrl}`} className="open-room">
                                            Odpri sobo
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