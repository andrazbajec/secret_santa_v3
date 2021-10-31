import { Container, Stack, useToast } from '@chakra-ui/react';
import { useEffect, useState }        from 'react';
import axios                          from 'axios';
import BaseHelper                     from '../helpers/BaseHelper';
import { RoomDB }                     from '../interfaces/RoomInterface';

const Room = () => {
    const toast = useToast();

    const [getState, setState] = useState<RoomDB>({
        title: '',
        roomUrl: '',
        users: [],
        isNamePicked: false,
        rules: '',
        dateOfExchange: '',
        maxAmount: ''
    });

    const location = window.location;

    useEffect(() => {
        const regex = new RegExp('(?<=soba\\/).[0-9]*');
        // @ts-ignore
        setState({...getState, roomUrl: regex.exec(location)});
        const url = BaseHelper.generateUrl('room');

        // @ts-ignore
        const roomUrl: string = regex.exec(location);
        const formData = new FormData();
        formData.append('roomUrl', roomUrl);

        axios.post(url, formData)
            .then((res: any) => {
                setState({...getState, title: res.data.Title, roomUrl: res.data.RoomUrl, users: res.data.RoomUsers, rules: res.data.Rules, dateOfExchange: res.data.DateOfExchange, maxAmount: res.data.MaxAmount});
            })
            .catch((error: any) => {
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
            <Container>
                <Stack spacing={4}>
                    <h1>
                        Soba: {getState.title}
                    </h1>
                    <h2>
                        Koda sobe: {getState.roomUrl}
                    </h2>
                    {
                        getState.dateOfExchange
                            ? <h2> Datum Obdarovanja: {getState.dateOfExchange}</h2>
                            : null
                    }
                    {
                        getState.maxAmount
                            ? <h2> Max Denarja: {getState.maxAmount}</h2>
                            : null
                    }
                    {
                        getState.rules
                            ? <h2> Pravila: {getState.rules}</h2>
                            : null
                    }
                    <h2>
                        Seznam uporabnikov
                    </h2>
                    <div>
                        <ol>
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
                    {
                        getState.isNamePicked
                            ? <h1>
                                Dobili ste: Andraž
                            </h1>
                            : null
                    }
                </Stack>
            </Container>
        </div>
    );
}

export default Room;