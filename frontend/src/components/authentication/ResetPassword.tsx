import { Button, Container, Flex, Heading, Input, InputGroup, Stack, useToast } from '@chakra-ui/react';
import BaseHelper                                                               from '../../helpers/BaseHelper';
import { Link }                                                                 from 'react-router-dom';
import { useEffect, useState }                                                  from 'react';
import { ResetPasswordProps, ResetPasswordState }                               from '../../interfaces/ResetPasswordInterface';
import axios                                                                    from 'axios';

const ResetPassword = (props: ResetPasswordProps) => {
    const [getState, setState] = useState<ResetPasswordState>({
        token: null,
        password: '',
        validatePassword: ''
    });

    const toast = useToast();

    const resetPassword = () => {
        if (!getState.password) {
            toast({
                title: 'Could not reset password',
                description: 'Invalid password',
                status: 'warning',
                duration: 3000
            });
            return;
        }

        if (getState.password !== getState.validatePassword) {
            toast({
                title: 'Could not reset password',
                description: 'Passwords do not match',
                status: 'warning',
                duration: 3000
            });
            return;
        }

        const url = BaseHelper.generateUrl('reset-password');
        const formData = BaseHelper.buildFormData(getState);

        axios.post(url, formData)
            .then(() => {
                window.location.pathname = '/';
            })
            .catch(error => {
                toast({
                    title: 'Could not reset password',
                    description: error?.response?.data,
                    status: 'error',
                    duration: 3000
                });
            })
    }

    useEffect(() => {
        const token: number = props.match.params.token;

        setState({...getState, token: token});
    }, []);

    return (
        <div>
            <Flex align="center" h="100vh">
                <Container>
                    <Stack spacing={4}>
                        <Heading>Ponastavi geslo</Heading>
                        <InputGroup>
                            <Input placeholder="Geslo"
                                   type="password"
                                   name="password"
                                   value={getState.password}
                                   onChange={event => BaseHelper.inputChange(event, setState, getState, 'password')}
                                   onKeyUp={event => BaseHelper.validateSubmit(event, resetPassword)}
                                   required
                            />
                        </InputGroup>
                        <InputGroup>
                            <Input placeholder="Ponovite geslo"
                                   type="password"
                                   name="validate-password"
                                   value={getState.validatePassword}
                                   onChange={event => BaseHelper.inputChange(event, setState, getState, 'validatePassword')}
                                   onKeyUp={event => BaseHelper.validateSubmit(event, resetPassword)}
                                   required
                            />
                        </InputGroup>
                        <Button colorScheme="green"
                                variant="outline"
                                onClick={resetPassword}
                        >
                            Ponastavi geslo
                        </Button>
                        <Link to="/login">
                            <Button colorScheme="red"
                                    variant="outline"
                                    w="100%"
                            >
                                Nazaj na prijavo
                            </Button>
                        </Link>
                    </Stack>
                </Container>
            </Flex>
        </div>
    );
}

export default ResetPassword;