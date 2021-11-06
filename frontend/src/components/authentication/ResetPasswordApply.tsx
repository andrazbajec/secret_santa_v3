import { Button, Container, Flex, Heading, Input, InputGroup, Stack, useToast } from '@chakra-ui/react';
import BaseHelper                                                               from '../../helpers/BaseHelper';
import { Link }                                                                 from 'react-router-dom';
import { useState }                                                             from 'react';
import axios                                                                    from 'axios';
import { ResetPasswordApplyState }                                              from '../../interfaces/ResetPasswordInterface';

const ResetPasswordApply = () => {
    const [getState, setState] = useState<ResetPasswordApplyState>({
        email: ''
    });

    const toast = useToast();

    const sendResetPasswordEmail = () => {
        if (!getState.email) {
            toast({
                title: 'Could not submit',
                description: 'Email can not be blank!',
                status: 'warning',
                duration: 3000
            });
            return;
        }

        const url = BaseHelper.generateUrl('send-reset-password-email');
        const formData = BaseHelper.buildFormData(getState);

        axios.post(url, formData)
            .then(() => {
                toast({
                    title: 'Email sent!',
                    status: 'success',
                    duration: 3000
                });
            })
            .catch(error => {
                toast({
                    title: 'Could not send email',
                    description: error?.response?.data,
                    status: 'error',
                    duration: 3000
                });
            });
    }

    return (
        <div>
            <Flex align="center" h="100vh">
                <Container>
                    <Stack spacing={4}>
                        <Heading>Vpiši se</Heading>
                        <InputGroup>
                            <Input placeholder="Email"
                                   type="email"
                                   name="email"
                                   value={getState.email}
                                   onChange={event => BaseHelper.inputChange(event, setState, getState, 'email')}
                                   onKeyUp={event => BaseHelper.validateSubmit(event, sendResetPasswordEmail)}
                                   required
                            />
                        </InputGroup>
                        <Button colorScheme="green"
                                variant="outline"
                                onClick={sendResetPasswordEmail}
                        >
                            Pošlji povezavo na email
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

export default ResetPasswordApply;