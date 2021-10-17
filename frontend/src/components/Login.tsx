import { Button, Container, Flex, Heading, Input, InputGroup, Stack, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import BaseHelper from "../helpers/BaseHelper";

const Login = () => {
    const toast = useToast();

    const [getState, setState] = useState({
        username: '',
        password: ''
    });

    const login = () => {
        const url = BaseHelper.generateUrl('login');
        const formData = BaseHelper.buildFormData(getState);

        axios.post(url, formData)
            .then(response => {

            })
            .catch((error: any) => {
                toast({
                    title: 'Could not log in',
                    description: error.message,
                    status: 'error',
                    duration: 3000
                })
            });
    }

    return (
        <div>
            <Flex align="center" h="100vh">
                <Container>
                    <Stack spacing={4}>
                        <Heading>Vpiši se</Heading>
                        <InputGroup>
                            <Input placeholder="Uporabniško ime"
                                   type="text"
                                   name="username"
                                   value={getState.username}
                                   onChange={event => BaseHelper.inputChange(event, setState, getState, 'username')}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Input placeholder="Geslo"
                                   type="password"
                                   name="password"
                                   value={getState.password}
                                   onChange={event => BaseHelper.inputChange(event, setState, getState, 'password')}
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
                    </Stack>
                </Container>
            </Flex>
        </div>
    );
}

export default Login;