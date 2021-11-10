import { Button, Container, Flex, FormLabel, Heading, Input, InputGroup, InputLeftElement, Stack, useToast } from "@chakra-ui/react";
import { Link }                                                                                              from "react-router-dom";
import axios                                                                                                 from "axios";
import { useState }                                                                                          from "react";
import BaseHelper                                                                                            from "../../helpers/BaseHelper";
import { LoginState }                                                                                        from "../../interfaces/LoginInterface";

const Login = () => {
    const toast = useToast();

    const [getState, setState] = useState<LoginState>({
        username: '',
        password: ''
    });

    const login = () => {
        const url = BaseHelper.generateUrl('login');
        const formData = BaseHelper.buildFormData(getState);

        if (!getState.username) {
            toast({
                title: 'Problem pri vpisovanju',
                description: 'Vpišite uporabniško ime.',
                status: 'warning',
                duration: 3000
            });
            return;
        }

        if (!getState.password) {
            toast({
                title: 'Problem pri vpisovanju',
                description: 'Vpišite geslo.',
                status: 'warning',
                duration: 3000
            });
            return;
        }

        axios.post(url, formData)
            .then(() => {
                window.location.reload();
            })
            .catch((error: any) => {
                toast({
                    title: 'Could not log in',
                    description: error.response.data,
                    status: 'error',
                    duration: 3000
                });
            });
    }

    const checkKeyPress = (event: any) => {
        if (event.keyCode === 13) {
            login();
        }
    }

    return (
        <div>
            <Flex align="center" h="100vh">
                <Container>
                    <Stack spacing={4}>
                        <Heading>Vpiši se</Heading>
                        <FormLabel>
                            Uporabniško ime *
                        </FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none"
                                              children={<i className="far fa-user"/>}
                            />
                            <Input placeholder="Uporabniško ime"
                                   type="text"
                                   name="username"
                                   required
                                   value={getState.username}
                                   onChange={event => BaseHelper.inputChange(event, setState, getState, 'username')}
                                   onKeyUp={checkKeyPress}
                            />
                        </InputGroup>
                        <FormLabel>
                            Geslo *
                        </FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none"
                                              children={<i className="far fa-lock"/>}
                            />
                            <Input placeholder="Geslo"
                                   type="password"
                                   name="password"
                                   required
                                   value={getState.password}
                                   onChange={event => BaseHelper.inputChange(event, setState, getState, 'password')}
                                   onKeyUp={checkKeyPress}
                            />
                        </InputGroup>
                        <Button colorScheme="green"
                                variant="outline"
                                onClick={login}
                        >
                            Vpis
                        </Button>
                        <Link to="/register">
                            <Button colorScheme="red"
                                    variant="outline"
                                    w="100%"
                            >
                                Nisi registriran?
                            </Button>
                        </Link>
                        <Link to="/send-reset-password">
                            <Button colorScheme="orange"
                                    variant="outline"
                                    w="100%"
                            >
                                Pozabljeno geslo
                            </Button>
                        </Link>
                    </Stack>
                </Container>
            </Flex>
        </div>
    );
}

export default Login;