import { Button, Container, Stack } from '@chakra-ui/react';
import { useState }                 from 'react';
import BaseHelper                   from '../helpers/BaseHelper';
import { HomeState }                from '../interfaces/HomeInterface';

const Home = () => {
    const [getState, setState] = useState<HomeState>({
        showInstructions: false
    })
    return (
        <div>
            <Container>
                <Stack spacing={2}>
                    <h1>
                        Dobrodošli na spletni strani Secret Santa
                    </h1>
                    <Button onClick={() => BaseHelper.toggleCheckbox(getState, setState, 'showInstructions')}>
                        <h1>
                            {
                                !getState.showInstructions
                                    ? <h1>Pokaži</h1>
                                    : <h1>Skrij</h1>
                            }
                            Navodila
                        </h1>
                    </Button>
                    {
                        getState.showInstructions
                            ? <div>
                                <h1>
                                    Naredi sobo
                                </h1>
                                <div>
                                    Da naredite sobo najprej kliknete na gumb ob strani da se vam pokaže meni in izberete "Naredi Sobo".
                                    To vam odpre stran na kateri je forum katerega izpolnete.
                                    Ime sobe je obvezno ostalo pa izpolnete po želji.
                                    Če želite lahko dodate geslo,
                                    pravila v katerih določite če želite delati sami ali kupiti in seveda ostale stvari ki jih želite dodati,
                                    lahko dodate datum obdarovanja, če to ne bo nujno na božični večer ali božič,
                                    in seveda lahko dodate tudi koliko denarja se lahko največ porabi za darilo.
                                    Na koncu pa imate še dva kvadratka katera lahko obkljukate če želite da je soba javna ali privat,
                                    če je soba javna jo lahko vidijo vsi na seznamu sob pod odprtimi sobami,
                                    če pa je vaša soba privat pa imajo dostop do nje samo osebe ki imajo kodo sobe in geslo (če ste ga dodali),
                                    drugi kvadratek pa je če želite tudi vi sodelovati ali samo spremljati kdo je dobil koga (če nadzorujete neko skupino) da kdo ne ostane brez.
                                </div>
                                <h1>
                                    Pridruži se sobi
                                </h1>
                                <div>
                                    Sobi se lahko pridružite na dva načina.
                                    Prvi je če je soba privat.
                                    Do sobe pridete tako da kliknete na gumb zgoraj levo da se vam odpre meni in izberete "Pridruži Se Sobi",
                                    kjer se vam odpre forum na katerem sta dva polja.
                                    Dodati morate kodo sobe, ki je obvezna in pa geslo če ga soba ima.
                                    Če pa je soba javna pa lahko do nje dostopate tudi preko "Pokaži Sobe".
                                    Ko odprete to stran imate seznam odprtih sob na katero lahko kliknete.
                                </div>
                                <h1>
                                    Pokaži sobe
                                </h1>
                                <div>
                                    Do sob pridete tako da kliknete levo zgoraj da se vam pokaže meni in izberete "Pokaži Sobe".
                                    Odpre se stran na kateri je seznam sob.
                                    Na vrhu so trije gumbi.
                                    Odprte sobe vam pokaže vse sobe, ki so odprte (in javne),
                                    V poteku so sobe kjer so vsi sodelujoči že v sobi in imajo določeno ime za koga priraviti darilo
                                    in na koncu je še gumb zgodovina sob, kjer so sobe ki so končane in v njih več ne morete nič spreminjati.
                                    Ko kliknte na odprto sobo lahko vidite kdo vse je v sobi.
                                    Imate tudi možnost da se sobi pridružite.
                                </div>
                            </div>
                            : null
                    }
                </Stack>
            </Container>
        </div>
    );
}

export default Home;