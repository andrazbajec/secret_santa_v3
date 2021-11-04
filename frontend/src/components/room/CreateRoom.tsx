import {
    Button,
    Container,
    Flex,
    Heading,
    Input,
    InputGroup,
    Stack,
    Checkbox,
    FormLabel,
    useToast
}                          from "@chakra-ui/react";
import BaseHelper          from "../../helpers/BaseHelper";
import { useState }        from "react";
import axios               from "axios";
import { CreateRoomState } from "../../interfaces/RoomInterface";

const CreateRoom = () => {
    const toast = useToast();

    const [getState, setState] = useState<CreateRoomState>({
        title: '',
        password: '',
        shouldJoin: false,
        isPrivate: false,
        maxAmount: '',
        dateOfExchange: '',
        rules: ''
    });

    const createRoom = () => {
        const url = BaseHelper.generateUrl('create-room');
        const formData = BaseHelper.buildFormData(getState);

        axios.post(url, formData)
            .then((res: any) => {
                window.location.pathname = `/soba/${res.data.RoomUrl}`;
            })
            .catch((error: any) => {
                toast({
                    title: 'Could not create room',
                    description: error.response.data,
                    status: 'error',
                    duration: 3000
                });
            });

    }

    function checkKeyPress(event: any) {
        if (event.keyCode === 13) {
            createRoom();
        }
    }

    return (
        <div>
            <Flex align='center' h='100vh'>
                <Container>
                    <Stack spacing={2}>
                        <Heading>
                            Naredi Sobo
                        </Heading>
                        <FormLabel>
                            Ime Sobe *
                        </FormLabel>
                        <InputGroup>
                            <Input placeholder='Ime sobe'
                                   type='text'
                                   name='title'
                                   required
                                   value={getState.title}
                                   onChange={event => BaseHelper.inputChange(event, setState, getState, 'title')}
                                   onKeyUp={checkKeyPress}
                            />
                        </InputGroup>
                        <FormLabel>
                            Geslo
                        </FormLabel>
                        <InputGroup>
                            <Input placeholder='Geslo'
                                   type='password'
                                   name='password'
                                   value={getState.password}
                                   onChange={event => BaseHelper.inputChange(event, setState, getState, 'password')}
                                   onKeyUp={checkKeyPress}
                            />
                        </InputGroup>
                        <FormLabel>
                            Pravila
                        </FormLabel>
                        <InputGroup>
                            <Input placeholder='Pravila'
                                   type='text'
                                   name='rules'
                                   value={getState.rules}
                                   onChange={event => BaseHelper.inputChange(event, setState, getState, 'rules')}
                                   onKeyUp={checkKeyPress}
                            />
                        </InputGroup>
                        <FormLabel>
                            Datum Obdarovanja
                        </FormLabel>
                        <InputGroup>
                            <Input placeholder='Datum Obdarovanja'
                                   type='date'
                                   name='dateOfExchange'
                                   value={getState.dateOfExchange}
                                   onChange={event => BaseHelper.inputChange(event, setState, getState, 'dateOfExchange')}
                                   onKeyUp={checkKeyPress}
                            />
                        </InputGroup>
                        <FormLabel>
                            Max Denarja
                        </FormLabel>
                        <InputGroup>
                            <Input placeholder='Max Denarja'
                                   type='number'
                                   name='maxAmount'
                                   value={getState.maxAmount as number}
                                   onChange={event => BaseHelper.inputChange(event, setState, getState, 'maxAmount')}
                                   onKeyUp={checkKeyPress}
                            />
                        </InputGroup>
                        <Checkbox size="md"
                                  colorScheme="green"
                                  onChange={() => BaseHelper.toggleCheckbox(getState, setState, 'isPrivate')}
                        >
                            Privat soba
                        </Checkbox>
                        <Checkbox size="md"
                                  colorScheme="green"
                                  onChange={() => BaseHelper.toggleCheckbox(getState, setState, 'shouldJoin')}
                        >
                            Sodeluj
                        </Checkbox>
                        <Button colorScheme='green'
                                variant='outline'
                                onClick={createRoom}
                        >
                            Naredi sobo
                        </Button>
                    </Stack>
                </Container>
            </Flex>
        </div>
    );
}

export default CreateRoom;