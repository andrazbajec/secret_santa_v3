import { Button, DrawerBody, DrawerContent, DrawerHeader, Drawer, useDisclosure } from "@chakra-ui/react";
import { Link }                                                                   from 'react-router-dom';

const Navbar = (props: any) => {
    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
        <>
            <Button colorScheme="black"
                    onClick={onOpen}
                    id="open-navbar"
            >
                {
                    !isOpen && <i className="fal fa-bars"/>
                }
            </Button>
            <Drawer placement='left'
                    onClose={onClose}
                    isOpen={isOpen}
            >
                <DrawerContent className="navbar">
                    <DrawerHeader borderBottomWidth="1px">
                        Secret Santa
                    </DrawerHeader>
                    <DrawerBody>
                        {
                            !props.authenticated
                                ? <div>
                                    <p>
                                        <Link to='/register'>
                                            <i className="fal fa-user-plus"/> Registriraj se
                                        </Link>
                                    </p>
                                    <p>
                                        <Link to='/login'>
                                            <i className="fal fa-sign-in"/> Vpiši se
                                        </Link>
                                    </p>
                                </div>
                                : <div>
                                    <p>
                                        <Link to='/'>
                                            <i className="fal fa-home-lg-alt"/> Domov
                                        </Link>
                                    </p>
                                    <p>
                                        <Link to='/naredi-sobo'>
                                            <i className="fal fa-plus-square"/> Naredi sobo
                                        </Link>
                                    </p>
                                    <p>
                                        <Link to='/pridruzi-se-sobi'>
                                            <i className="fal fa-arrow-square-right"/> Pridruži se sobi
                                        </Link>
                                    </p>
                                    <p>
                                        <Link to='/seznam-sob'>
                                            <i className="fal fa-list-ul"/> Seznam sob
                                        </Link>
                                    </p>
                                    <p>
                                        <Link to='/navodila'>
                                            <i className="fal fa-info-square"/> Navodila
                                        </Link>
                                    </p>
                                    <p>
                                        <Link to='/nastavitve'>
                                            <i className="fal fa-cog"/> Nastavitve
                                        </Link>
                                    </p>
                                    <p>
                                        <Link to='/logout'>
                                            <i className="fal fa-sign-out"/> Izpiši se
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