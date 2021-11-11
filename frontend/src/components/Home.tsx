import { Container, Flex, Grid, GridItem, Heading, useToast } from '@chakra-ui/react';
import { useEffect, useState }                                from 'react';
import BaseHelper                                             from '../helpers/BaseHelper';
import axios                                                  from 'axios';
import { UserRoomListDB, RoomListDBElement, RoomStatus }      from '../interfaces/RoomInterface';
import { Link }                                               from 'react-router-dom';

const Home = () => {
    const toast = useToast();

    const [getState, setState] = useState<UserRoomListDB>({
        userRooms: []
    });

    useEffect(() => {
        const url = BaseHelper.generateUrl('user-rooms');

        axios.get(url)
            .then((res: any) => {
                const rooms: RoomListDBElement[] = res.data;
                setState({...getState, userRooms: rooms});
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
                <Container className='scroll'>
                    <Heading>
                        Dobrodošli na spletni strani Secret Santa
                    </Heading>
                    <hr/>
                    <Heading size="md" padding='5px'>
                        Tu so prikazane vaše sobe.
                    </Heading>
                    <Grid templateColumns={{
                        base: "repeat(2, 1fr)",
                        sm: "repeat(3, 1fr)",
                        lg: "repeat(4, 1fr)",
                        xl: "repeat(5, 1fr)"
                    }} gap={3}>
                        {
                            getState.userRooms.map(userRoom => (
                                <GridItem className="card"
                                          key={userRoom.RoomUrl}
                                >
                                    <div className="face back">
                                        <div className="card-content">
                                            <p className='room-text'>
                                                <i className="fas fa-users room-icon"/> {userRoom.Users}
                                            </p>
                                            <p>
                                                {
                                                    userRoom.Status === RoomStatus.OPEN
                                                        ? <i className="fal fa-door-open room-icon open"/>
                                                        : userRoom.Status === RoomStatus.IN_PROGRESS
                                                            ? <i className="fal fa-door-open room-icon in-progress"/>
                                                            : <i className="fal fa-door-open room-icon ended"/>
                                                }
                                            </p>
                                        </div>
                                        <Link to={`/soba/${userRoom.RoomUrl}`} className="open-room">
                                            Odpri sobo
                                        </Link>
                                    </div>
                                    <div className="face front">
                                        <h2>
                                            {userRoom.Title}
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

export default Home;