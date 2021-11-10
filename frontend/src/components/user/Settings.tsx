import {
    Container,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightAddon,
    Stack,
    useToast
}                                              from '@chakra-ui/react';
import { useEffect, useState }                 from 'react';
import axios                                   from 'axios';
import BaseHelper                              from '../../helpers/BaseHelper';
import { SettingsState, SettingsStateLoading } from '../../interfaces/UserInterface';

const SaveIcon = ({loading}: { loading: boolean }) => {
    return (
        <>
            {
                loading
                    ? <i className="fal fa-sm fa-spinner fa-spin"/>
                    : <i className="fal fa-save"/>
            }
        </>
    );
}

const Settings = () => {
    const [getState, setState] = useState<SettingsState>({
        Name: '',
        Email: '',
        Password: '',
        Loading: {
            Name: false,
            Email: false,
            Password: false
        }
    });

    const toast = useToast();

    useEffect(() => {
        const url = BaseHelper.generateUrl('get-user-data');

        axios.get(url)
            .then((res: any) => {
                setState({
                    ...getState,
                    Name: res.data.Name,
                    Email: res.data.Email
                });
            });
    }, []);

    // @ts-ignore
    const triggerSave = (event: KeyboardEvent<HTMLInputElement>) => {
        const key = event?.target?.dataset?.key;

        if (!key) {
            return;
        }

        if (event.code !== 13) {
            return;
        }

        save(key);
    }

    const save = (key: keyof SettingsState) => {
        const value = getState[key];

        if (!value) {
            toast({
                title: 'Shranjevanje ni bilo možno',
                description: 'Polje ne sme biti prazno',
                status: 'warning',
                duration: 3000
            });
        }

        const formData = new FormData();
        formData.append('field', key);
        formData.append('value', value as string);

        const url = BaseHelper.generateUrl('save-user-data');

        setLoading(key as keyof SettingsStateLoading, true);

        axios.post(url, formData)
            .then(() => {
                toast({
                    title: 'Shranjeno',
                    status: 'success',
                    duration: 3000
                });
            })
            .catch(error => {
                toast({
                    title: 'Could save',
                    description: error?.response?.data ?? 'Unknown server error',
                    status: 'error',
                    duration: 3000
                });
            })
            .finally(() => {
                setLoading(key as keyof SettingsStateLoading, false);
            })
    }

    const setLoading = (key: keyof SettingsStateLoading, loading: boolean) => {
        const newState = {...getState};

        newState.Loading[key] = loading;

        setState({...newState});
    }
    
    return (
        <div>
            <Flex align="center" h="100vh">
                <Container>
                    <Stack spacing={4}>
                        <Heading>Nastavitve</Heading>
                        <FormControl>
                            <FormLabel>Ime</FormLabel>
                            <InputGroup className={getState.Loading.Name ? 'loading' : ''}>
                                <Input placeholder="Ime"
                                       type="text"
                                       name="name"
                                       value={getState.Name}
                                       onChange={event => BaseHelper.inputChange(event, setState, getState, 'Name')}
                                       onKeyUp={triggerSave}
                                       data-key="Name"
                                />
                                <InputRightAddon children={<SaveIcon loading={getState.Loading.Name}/>}
                                                 className="input-icon-right"
                                                 onClick={() => save('Name')}
                                />
                            </InputGroup>
                            <FormLabel>Email</FormLabel>
                            <InputGroup className={getState.Loading.Email ? 'loading' : ''}>
                                <Input placeholder="Email"
                                       type="email"
                                       name="email"
                                       value={getState.Email}
                                       onChange={event => BaseHelper.inputChange(event, setState, getState, 'Email')}
                                       onKeyUp={triggerSave}
                                       data-key="Email"
                                />
                                <InputRightAddon children={<SaveIcon loading={getState.Loading.Email}/>}
                                                 className="input-icon-right"
                                                 onClick={() => save('Email')}
                                />
                            </InputGroup>
                            <FormLabel>Geslo</FormLabel>
                            <InputGroup className={getState.Loading.Password ? 'loading' : ''}>
                                <Input placeholder="********"
                                       type="password"
                                       name="password"
                                       value={getState.Password}
                                       onChange={event => BaseHelper.inputChange(event, setState, getState, 'Password')}
                                       onKeyUp={triggerSave}
                                       data-key="Password"
                                />
                                <InputRightAddon children={<SaveIcon loading={getState.Loading.Password}/>}
                                                 className="input-icon-right"
                                                 onClick={() => save('Password')}
                                />
                            </InputGroup>
                        </FormControl>
                    </Stack>
                </Container>
            </Flex>
        </div>
    )
}

export default Settings;