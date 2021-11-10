import { Box, Button, Container, Flex, Grid, Heading, Link, Stack, Tooltip, useToast } from '@chakra-ui/react';
import { useEffect, useState }                                                         from 'react';
import axios                                                                           from 'axios';
import { RoomDataResponse, RoomDB }                                                    from '../../interfaces/RoomInterface';
import BaseHelper                                                                      from '../../helpers/BaseHelper';
import { useHistory, useLocation }                                                     from 'react-router-dom';
import { CopyIcon }                                                                    from '@chakra-ui/icons';
import Cookies                                                                         from 'js-cookie';

const Room = () => {
    const toast = useToast();
    const history = useHistory();

    const [getState, setState] = useState<RoomDB>({
        title: '',
        roomID: null,
        roomUrl: null,
        users: [],
        rules: '',
        dateOfExchange: null,
        maxAmount: null,
        pickedUser: null
    });

    const [isAdmin, setIsAdmin] = useState(false);

    const path = useLocation().pathname;

    const loadUsers = () => {
        const roomUrlMatch = path.match(/(?<=soba\/).[0-9]*/);

        if (!roomUrlMatch) {
            toast({
                title: 'Napačna koda sobe',
                status: 'error',
                duration: 3000
            });
            history.push('/');
            return;
        }

        const roomUrl = roomUrlMatch[0];
        const url = BaseHelper.generateUrl('room');
        const formData = new FormData();
        formData.append('roomUrl', roomUrl);

        axios.post(url, formData)
            .then((res: any) => {
                const roomData: RoomDataResponse = res.data;

                if (roomData.RoomUsers.length === getState.users.length && getState.title) {
                    return;
                }

                setState({
                    ...getState,
                    title: roomData.Title,
                    roomUrl: roomData.RoomUrl,
                    users: roomData.RoomUsers,
                    rules: roomData.Rules,
                    dateOfExchange: roomData.DateOfExchange,
                    maxAmount: roomData.MaxAmount,
                    roomID: roomData.RoomID,
                    pickedUser: roomData.PickedUser
                });

                setIsAdmin(Cookies.get('user-id') === `${roomData.UserID}`);
            })
            .catch((error: any) => {
                console.log(error);

                toast({
                    title: 'Could not get room data',
                    description: error.response.data,
                    status: 'error',
                    duration: 3000
                });
            });
    }

    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(`${getState.roomUrl}`);
            toast({
                title: 'Successfully copied to clipboard',
                status: 'success',
                duration: 3000
            });
        } catch (e: any) {
            toast({
                title: 'Could not copy to clipboard',
                description: e.message,
                status: 'error',
                duration: 3000
            });
        }
    }

    const generate = () => {
        if (getState.users.length < 3) {
            toast({
                title: 'Problem pri generiranju sobe',
                description: 'Vsaj 3 uporabniki morajo biti v sobi da lahko generirate',
                status: 'warning',
                duration: 3000
            });
            return;
        }

        const url = BaseHelper.generateUrl('generate-room');
        const formData = new FormData();
        formData.append('room-id', `${getState.roomID}`);

        axios.post(url, formData)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        loadUsers();
        setInterval(loadUsers, 10000);
    }, []);

    return (
        <div>
            <Flex align='center' h='100vh'>
                <Container className='room scroll'>
                    <Stack spacing={4}>
                        <Heading>{getState.title}</Heading>
                        <Grid templateColumns="repeat(2, 1fr)">
                            <Box>
                                <Tooltip label="Kopiraj">
                                    <Link color="teal"
                                          onClick={copyCode}
                                          _hover={{color: "teal.400"}}
                                    >
                                        {getState.roomUrl} <CopyIcon/>
                                    </Link>
                                </Tooltip>
                            </Box>
                            {
                                isAdmin && !getState.pickedUser && getState.users.length >= 3 &&
                                <Box>
                                    <Button colorScheme="teal"
                                            variant="outline"
                                            onClick={generate}
                                    >
                                        Generiraj
                                    </Button>
                                </Box>
                            }
                        </Grid>
                        {
                            getState.dateOfExchange &&
                            <h2>
                                Datum Obdarovanja: {getState.dateOfExchange}
                            </h2>
                        }
                        {
                            getState.maxAmount &&
                            <h2>
                                Max Denarja: {getState.maxAmount}
                            </h2>
                        }
                        {
                            getState.rules &&
                            <h2>
                                Pravila: {getState.rules}
                            </h2>
                        }
                        {
                            getState.pickedUser &&
                            <h2>
                                <b>
                                    Dobili ste: {getState.pickedUser.Name}
                                </b>
                            </h2>
                        }
                        <h2>
                            Seznam uporabnikov
                        </h2>
                        <div className='d-flex'>
                            <div className='seznam-uporabnikov'>
                                <ol className='list'>
                                    {
                                        getState.users.map((user: any) => {
                                            return (
                                                <li key={user.Name}>
                                                    {
                                                        user.Name
                                                    }
                                                </li>
                                            )
                                        })
                                    }
                                </ol>
                            </div>
                        </div>
                    </Stack>
                </Container>
            </Flex>
        </div>
    );
}

export default Room;