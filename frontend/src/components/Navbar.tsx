import { Button, DrawerBody, DrawerContent, DrawerHeader, Link, Drawer, useDisclosure } from "@chakra-ui/react";

function Navbar(props: any) {
    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
        <>
            <Button colorScheme="black"
                    onClick={onOpen}
                    id="open-navbar"
            >
                {
                    !isOpen
                        ? <i className="fal fa-bars"/>
                        : null
                }
            </Button>
            <Drawer placement='left'
                    onClose={onClose}
                    isOpen={isOpen}
            >
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">
                        Secret Santa
                    </DrawerHeader>
                    <DrawerBody>
                        {
                            !props.authenticated
                                ? <div>
                                    <p>
                                        <Link href='/register'>
                                            <i className="fal fa-user-plus"/> Registriraj se
                                        </Link>
                                    </p>
                                    <p>
                                        <Link href='/login'>
                                            <i className="fal fa-sign-in"/> Vpiši se
                                        </Link>
                                    </p>
                                </div>
                                : <div>
                                    <p>
                                        <Link href='/'>
                                            <i className="fal fa-home-lg-alt"/> Domov
                                        </Link>
                                    </p>
                                    <p>
                                        <Link href='/naredi-sobo'>
                                            <i className="fal fa-plus-square"/> Naredi Sobo
                                        </Link>
                                    </p>
                                    <p>
                                        <Link href='/pridruzi-se-sobi'>
                                            <i className="fal fa-arrow-square-right"/> Pridruzi Se Sobi
                                        </Link>
                                    </p>
                                    <p>
                                        <Link href='/pokazi-sobe'>
                                            <i className="fal fa-list-ul"/> Seznam Sob
                                        </Link>
                                    </p>
                                    <p>
                                        <Link href='/navodila'>
                                            <i className="fal fa-info-square"/> Navodila
                                        </Link>
                                    </p>
                                    <p>
                                        <Link href='/logout'>
                                            <i className="fal fa-sign-out"/> Izpisi se
                                        </Link>
                                    </p>
                                </div>
                        }
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Navbar;