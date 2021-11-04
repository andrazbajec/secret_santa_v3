import { Container, Table, Thead, Tr, Th, Tbody, Button, Td } from '@chakra-ui/react';
import { Link }                                               from "react-router-dom";
import { useEffect, useState }                            from 'react';
import axios                                              from 'axios';
import BaseHelper                                         from '../../helpers/BaseHelper';
import { RoomListDB, RoomListDBElement }                  from '../../interfaces/RoomInterface';
import { LinkIcon }                                       from '@chakra-ui/icons';

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
            <Table>
                <Thead>
                    <Tr>
                        <Th textAlign="center">Ime</Th>
                        <Th textAlign="center">Avtor</Th>
                        <Th textAlign="center">Število uporabnikov</Th>
                        <Th/>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        getState.rooms.map(room => (
                            <Tr>
                                <Td w="30%">{room.Title}</Td>
                                <Td w="30%">{room.Author}</Td>
                                <Td w="30%" textAlign="center">{room.Users}</Td>
                                <Td textAlign="right">
                                    <Link to={`/soba/${room.RoomUrl}`}>
                                        <LinkIcon color="teal"
                                                  _hover={{color: 'teal.400'}}
                                        />
                                    </Link>
                                </Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </div>
    );
}

export default RoomList;