import { Container, Flex, Heading, Stack } from '@chakra-ui/react';

const Instructions = () => {
    return (
        <div>
            <Flex align='center' h='100vh'>
                <Container className='scroll'>
                    <Stack spacing={4}>
                        <Heading>
                            Navodila
                        </Heading>
                        <hr/>
                        <div>
                            <Heading size="lg">
                                Naredi sobo
                            </Heading>
                            <div>
                                Sobo naredite tako da kliknete levo zgoraj na gumb da se vam odpre meni
                                in kliknete na "Naredi Sobo".
                                Odpre se vam stran na kateri je forum katerega izpolnete.
                                Ime sobe je obvezno, vse ostalo pa po vaši želji.
                                Lahko dodate geslo,
                                pravila (če želite sami delati ali pa kupiti, lahko dodate tudi česa ne smete narediti ali kupiti),
                                datum obdarovanja, če to ni nujno na božični dan
                                in pa koliko denarja največ lahko porabite za darilo.
                                Na koncu pa imate še dva gumbka katera označite če želite
                                v sobi tudi vi sodelovati ali samo spremljati neko skupino ljudi
                                (da lahko vidite da so vsi dobili darila in da ni bilo nič goljufanja)
                                ter možnost da je vaša soba privatna (drugi je ne bodo videli in
                                pridružite se lahko samo z kodo sobe in geslom (če ste ga dodali)).
                                Ko naredite sobo vas bo preusmerilo na sobo ki ste jo naredili.
                                Na vrhu je ime sobe, ki ste ga določili.
                                Pod imenom sobe imate kodo sobe,
                                ki jo posredujete naprej tistim,
                                ki želite da se vam pridružijo.
                                Ko se sobi pridružijo vsi, ki ste želeli kliknete na gumb "Generiraj".
                                Gumb se ne bo prikazal preden so v sobi vsaj trije osebe.
                                Ko je gumb pritisnjen se soba zapre in
                                se ni mogoče več pridružiti ali zapustiti sobo.
                            </div>
                            <Heading size="lg">
                                Pridruži se sobi
                            </Heading>
                            <div>
                                Sobi se lahko pridružite na dva načina (odvisno če je soba javna ali privat).
                                Če je soba privat se lahko pridružite le na en način.
                                Enako kot pri "Naredi sobo", kliknete levo zgoraj na gumb da
                                se vam odpre meni, kjer klinete na "Pridruži Se Sobi".
                                Tako kot pri "Naredi sobo" se vam odpre forum katerega izpolnete.
                                Da se sobi pridružite boste morali dobiti kodo sobe in pa geslo.
                                Koda sobe je za vstop obvezna, geslo pa je odvisno če ga soba ima.
                                Če pa je soba javna se lahko pridružite tudi na drug način.
                                Tako kot za privat sobo je najprej treba klikniti na gumb levo zgoraj, da se odpre meni.
                                Kliknete na "Seznam sob".
                                Tokrat pa se vam odpre tabela sob.
                                Poiščete sobo, ki je odprta in jo kliknete.
                            </div>
                            <Heading size="lg">
                                Seznam sob
                            </Heading>
                            <div>
                                Tako kot za "Naredi Sobo" in "Pridruži se sobi" kliknete levo zgoraj da se odpre meni
                                in izberete "Seznam sob".
                                Odpre se tabela sob.
                                Na vrhu tabel so trije gumbi.
                                Odprte sobe vam pokaže seznam vseh javnih odprtih sob.
                                Soba je odprta do trenutka ko se generirajo imena.
                                Ko sobo odprete imate možnost da se sobi pridružite (če še niste v sobi).
                                Če soba nima gesla vas bo takoj pridružilo sobi,
                                drugače vas bo preusmerilo na "Pridruži se sobi" stran,
                                kjer je koda sobe že izpolnjena, za geslo pa boste morali kontaktirati admina sobe.
                                Če ste se sobi pridružili po nesreči imate tudi možnost da sobo zapustite.
                                V poteku so sobe v katerih ste pridruženi in so imena že generirana.
                                Te sobe ne morete zapustiti.
                                Ko je soba v poteku se vam izpiše ime koga ste dobili.
                                Ko se izteče čas obdarovanja pa se soba zapiše v Zgodovino sob.
                            </div>
                        </div>
                    </Stack>
                </Container>
            </Flex>
        </div>
    );
}

export default Instructions;