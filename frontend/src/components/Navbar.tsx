import { Button, Flex, Link } from "@chakra-ui/react";

const Navbar = () => {
    return (
        <Flex>
            <Flex>
                <Flex>
                    <Link href='/'>
                        <Button variant='ghost'
                                aria-label='Domov'
                                my={5}
                                w='100%'>
                            Domov
                        </Button>
                    </Link>
                    <Link href='/register'>
                        <Button variant='ghost'
                                aria-label='Register'
                                my={5}
                                w='100%'>
                            Register
                        </Button>
                    </Link>
                    <Link href='/login'>
                        <Button variant='ghost'
                                aria-label='Login'
                                my={5}
                                w='100%'>
                            Login
                        </Button>
                    </Link>
                    <Link href='/naredi-sobo'>
                        <Button variant='ghost'
                                aria-label='Naredi Sobo'
                                my={5}
                                w='100%'>
                            Naredi Sobo
                        </Button>
                    </Link>
                    <Link href='/pridruzi-se-sobi'>
                        <Button variant='ghost'
                                aria-label='Pridruzi Se Sobi'
                                my={5}
                                w='100%'>
                            Pridruzi Se Sobi
                        </Button>
                    </Link>
                    <Link href='/pokazi-sobe'>
                        <Button variant='ghost'
                                aria-label='Seznam sob'
                                my={5}
                                w='100%'>
                            Seznam sob
                        </Button>
                    </Link>
                    <Link href='/logout'>
                        <Button variant='ghost'
                                aria-label='Izpisi se'
                                my={5}
                                w='100%'>
                            Izpisi se
                        </Button>
                    </Link>
                    <Link href='/soba/*'>
                        <Button variant='ghost'
                                aria-label='Soba'
                                my={5}
                                w='100%'>
                            Soba
                        </Button>
                    </Link>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default Navbar;