export class CHOFilter {
    public county: COUNTIES | null = null;
    public creationInterval: FilterInterval = new FilterInterval();
    public displayState: CHO_DISPLAY_STATES | null = null;
    public epoch: RO_EPOCHS | null = null;
    public foundInterval: FilterInterval = new FilterInterval();
    public inventoryNumber: string | null = null;
    public locality: string | null = null;
    public title: string | null = null;
    public type: CHO_TYPES | null = null;

    // used only for inp-clasate-medalistica-2014-02-02.xml
    public medalFilter: MedalCHOFilter = new MedalCHOFilter();
    // used only for inp-clasate-stiintele-naturii-2014-02-03-7.xml
    public natureFilter: NatureCHOFilter = new NatureCHOFilter();

    // prevent passing useless data to the backend
    public prepareBackendData() {
        if (this.creationInterval?.isEmpty()) {
            // @ts-ignore
            this.creationInterval = null;
        }
        if (this.foundInterval?.isEmpty()) {
            // @ts-ignore
            this.foundInterval = null;
        }
        if (this.medalFilter?.isEmpty()) {
            // @ts-ignore
            this.medalFilter = null;
        }
        if (this.natureFilter?.isEmpty()) {
            // @ts-ignore
            this.natureFilter = null;
        }
    }
}

export class NatureCHOFilter {
    public age: NATURE_AGES | null = null;
    public epoch: NATURE_EPOCHS | null = null;
    public sex: NATURE_SEXES | null = null;

    public isEmpty() {
        return this.age === null && this.epoch === null && this.sex === null;
    }
}

export class MedalCHOFilter {
    public shape: MEDAL_FORMS | null = null;

    public isEmpty() {
        return this.shape === null;
    }
}

export class FilterInterval {
    public start: FilterTime = new FilterTime();
    public end: FilterTime = new FilterTime();

    public isEmpty() {
        return this.start.isEmpty() && this.end.isEmpty();
    }
}

export class FilterTime {
    public date: number | null = null;
    public range: DATE_RANGES | null = null;

    public isEmpty() {
        return this.date === null && this.range === null;
    }
}

export enum COUNTIES {
    ALBA = 'Alba',
    ARAD = 'Arad',
    ARGES = 'Argeș',
    BACAU = 'Bacău',
    BIHOR = 'Bihor',
    BISTRITA_NASAUD = 'Bistrița-Năsăud',
    BOTOSANI = 'Botoșani',
    BRASOV = 'Brașov',
    BRAILA = 'Brăila',
    BUCURESTI = 'București',
    BUZAU = 'Buzău',
    CARAS_SEVERIN = 'Caraș-Severin',
    CALARASI = 'Călărași',
    CLUJ = 'Cluj',
    CONSTANTA = 'Constanța',
    COVASNA = 'Covasna',
    DAMBOVITA = 'Dâmbovița',
    DOLJ = 'Dolj',
    GALATI = 'Galați',
    GIURGIU = 'Giurgiu',
    GORJ = 'Gorj',
    HARGHITA = 'Harghita',
    HUNEDOARA = 'Hunedoara',
    IALOMITA = 'Ialomița',
    IASI = 'Iași',
    ILFOV = 'Ilfov',
    MARAMURES = 'Maramureș',
    MEHEDINTI = 'Mehedinți',
    MURES = 'Mureș',
    NEAMT = 'Neamț',
    OLT = 'Olt',
    PRAHOVA = 'Prahova',
    SATU_MARE = 'Satu Mare',
    SALAJ = 'Sălaj',
    SIBIU = 'Sibiu',
    SUCEAVA = 'Suceava',
    TELEORMAN = 'Teleorman',
    TIMIS = 'Timiș',
    TULCEA = 'Tulcea',
    VASLUI = 'Vaslui',
    VALCEA = 'Vâlcea',
    VRANCEA = 'Vrancea',
}

export enum CHO_DISPLAY_STATES {
    VERY_GOOD = 'Very good',
    RELATIVELY_GOOD = 'Relatively good',
    GOOD = 'Good',
    MEDIOCRE = 'Mediocre',
    DAMAGED = 'Damaged',
    VERY_DAMAGED = 'Very Damaged'
}

export enum CHO_TYPES {
    BIOLOGICAL_OBJECT = 'Biological object',
    MAN_MADE_OBJECT = 'Man-made object',
    PHYSICAL_OBJECT = 'Physical object',
}
export enum DATE_RANGES {
    CENTURY = 'Century',
    MILLENNIUM = 'Millennium'
}

export enum MEDAL_FORMS {
    CIRCULAR = 'Circular',
    CROSS = 'Cross',
    QUADRILOBATE = 'Quadrilobate',
    RECTANGULAR = 'Rectangular',
    HEXAGONAL = 'Hexagonal',
    ALMOND_SHAPE = 'Almond Shape',
    OCTAGONAL = 'Octagonal',
    OVAL = 'Oval',
    SQUARE = 'Square',
    RHOMBUS_SHAPE = 'Rhombus Shape',
    ROUND_SHAPE = 'Round Shape',
    FOUR_POINTED_STAR = 'Four-pointed Star',
    STELLAR_SHAPE = 'Stellar Shape',
}

export enum NATURE_AGES {
    _23_MIL = '23 MIL',
    _15_MIL = '15 MIL',
    AD = 'AD',
    EGG = 'EGG',
    JUV = 'JUV'
}

export enum NATURE_EPOCHS {
    MEZOZOIS_CRETACIC_MAASTRICHTIAN = 'Mezozois, Cretacic, Maastrichtian',
    NEOGEN = 'Neogen',
    NEOZOIC_NEOGEN_SFARSITUL_ETAJULUI_BADENIAN_CCA_11MA = 'Neozoic, Neogen, sfârșitul etajului Badenian (cca. 11MA)',
    PLEISTOCEN_MEDIU = 'Pleistocen mediu'
}

export enum NATURE_SEXES {
    MALE = 'Male',
    FEMALE = 'Female',
    MANCA = 'Manca',
    POSTMANCA = 'Postmanca',
    UNISEX = 'Unisex', // male & female
    UNKNOWN = 'Unknown'
}







// TODO:
export enum RO_EPOCHS {
    ANTICHITATE = 'Antichitate',
    CONSTANTIN_BRANCOVEANU = 'Constantin Brâncoveanu',
    CULTURA_SANTANA_DE_MURES_CERNEAHOV = 'Cultura Sântana de Mureș-Cerneahov',
    CULTURA_TUMULILOR_CARPATICI = 'Cultura Tumulilor carpatici',
    CULTURA_DACILOR_LIBERI = 'Cultura dacilor liberi',
    CULTURA_DACO_CARPICA = 'Cultura daco-carpică',
    CULTURA_SARMATICA_TIMPURIE = 'Cultura sarmatică timpurie',
    ENEOLITIC = 'Eneolitic',
    ENEOLITIC_DEZVOLTAT = 'Eneolitic dezvoltat',
    ENEOLITIC_MIJLOCIU = 'Eneolitic mijlociu',
    ENEOLITIC_TIMPURIU = 'Eneolitic timpuriu',
    ENEOLITIC_TARZIU = 'Eneolitic târziu',
    ENEOLITIC_ = 'Eneolitic?', // TODO:
    EPIPALEOLITIC = 'Epipaleolitic',
    EPOCA_PTOLEMAICA = 'Epoca Ptolemaică',
    EPOCA_TARZIE = 'Epoca Târzie',
    EPOCA_BRONZULUI = 'Epoca bronzului',
    EPOCA_BRONZULUI_HALLSTATT_A1 = 'Epoca bronzului - Hallstatt A1',
    EPOCA_BRONZULUI_ = 'Epoca bronzului ?', // TODO:
    EPOCA_DACICA = 'Epoca dacică',
    EPOCA_FIERULUI = 'Epoca fierului',
    EPOCA_GREACA = 'Epoca greacă',
    EPOCA_MEDIEVALA = 'Epoca medievală',
    EPOCA_MEDIEVALA_TIMPURIE = 'Epoca medievală timpurie',
    EPOCA_MEDIEVALA_TARZIE = 'Epoca medievală târzie',
    EPOCA_MIGRATIILOR = 'Epoca migrațiilor',
    EPOCA_MIGRATIILOR_TIMPURIE = 'Epoca migrațiilor timpurie',
    EPOCA_MODERNA = 'Epoca modernă',
    EPOCA_OTOMANA = 'Epoca otomană',
    EPOCA_POST_ROMANA = 'Epoca post-romană',
    EPOCA_PREMEDIEVALA = 'Epoca premedievală',
    EPOCA_ROMANA = 'Epoca romană',
    EPOCA_ROMANA_ = 'Epoca romană ?', // TODO:
    EPOCA_ROMANA_SAU_PERIOADA_MEDIEVALA_TIMPURIE = 'Epoca romană sau perioada medievală timpurie',
    GETO_DACICA = 'geto-dacică',
    HALLSTATT = 'Hallstatt',
    HALLSTATT_A = 'Hallstatt A',
    HALLSTATT_D = 'Hallstatt D',
    HALLSTATT_MIJLOCIU = 'Hallstatt mijlociu',
    HALLSTATT_TIMPURIU = 'Hallstatt Timpuriu',
    HALLSTATT_TIMPURIU_2 = 'Hallstatt timpuriu', // TODO:
    HALLSTATT_TARZIU = 'Hallstatt târziu',
    HELLADIC_TARZIU = 'Helladic târziu',
    IMPERIUL_MIJLOCIU = 'Imperiul Mijlociu',
    IMPERIUL_NOU = 'Imperiul Nou',
    INCEPUTUL_PERIOADEI_MIJLOCII_A_EPOCII_BRONZULUI = 'Începutul perioadei mijlocii a epocii bronzului',
    // tslint:disable-next-line:max-line-length
    JOHANN_HERMANN_I_ZIS_STUCKART_ACTIV_LA_SIBIU_INTRE_ANII_1646_1662 = 'Johann Hermann I, zis Stuckart, activ la Sibiu între anii 1646-1662',
    KLEMENS_AURIFABER_SENIOR_ACTIV_IN_BRASOV_INTRE_ANII_1555_1572 = 'Klemens Aurifaber senior, activ în Brașov între anii 1555-1572',
    LA_TENE = 'La Tène',
    LA_TENE_B1_B2 = 'La Tène B1 B2',
    LA_TENE_B2_C = 'La Tène B2-C',
    LA_TENE_D = 'La Tène D',
    LA_TENE_D1 = 'La Tène D1',
    LA_TENE_III = 'La Tène III',
    LA_TENE_GETO_DACIC = 'La Tène geto-dacic',
    LA_TENE_MIJLOCIU = 'La Tène mijlociu',
    LA_TENE_TIMPURIU = 'La Tène timpuriu',
    MILENIUL_I = 'Mileniul I',
    NEOLITIC = 'Neolitic',
    NEOLITIC_ENEOLITIC = 'Neolitic - Eneolitic',
    NEOLITIC_DEZVOLTAT = 'Neolitic dezvoltat',
    NEOLITIC_MIJLOCIU = 'Neolitic mijlociu',
    NEOLITIC_TIMPURIU = 'Neolitic timpuriu',
    NEOLITIC_TARZIU = 'Neolitic târziu',
    PALEOLITIC = 'Paleolitic',
    PALEOLITIC_INFERIOR = 'Paleolitic inferior',
    PALEOLITIC_MIJLOCIU = 'Paleolitic mijlociu',
    PALEOLITIC_SUPERIOR = 'Paleolitic superior',
    PERIOADA_BIZANTINA = 'Perioada bizantină',
    PERIOADA_BIZANTINA_TARZIE = 'Perioada bizantină târzie',
    PERIOADA_DACO_ROMANA = 'Perioada daco-romană',
    PERIOADA_DE_TRANZITIE_LA_EPOCA_BRONZULUI = 'Perioada de tranziție la epoca bronzului',
    PERIOADA_ELENISTICA = 'Perioada elenistică',
    PERIOADA_ELENISTICA_TARZIE = 'Perioada elenistică târzie',
    PERIOADA_ELENISTICA_TARZIE_SAU_ROMANA_TIMPURIE = 'Perioada elenistică târzie sau romană timpurie',
    PERIOADA_GETO_DACICA = 'Perioada geto-dacică',
    PERIOADA_MEDIEVALA_DEZVOLTATA = 'Perioada medievală dezvoltată',
    PERIOADA_MEDIEVALA_TIMPURIE = 'Perioada medievală timpurie',
    PERIOADA_MEDIEVALA_TARZIE = 'Perioada medievală târzie',
    PERIOADA_MEDIEVALA_TARZIE_PERIOADA_MODERNA = 'Perioada medievală târzie - perioada modernă',
    PERIOADA_MIJLOCIE_A_EPOCII_BRONZULUI = 'Perioada mijlocie a epocii bronzului',
    PERIOADA_PREMEDIEVALA = 'Perioada premedievală',
    PERIOADA_ROMANO_BIZANTINA = 'Perioada romano-bizantină',
    PERIOADA_ROMANA_TIMPURIE = 'Perioada romană timpurie',
    PERIOADA_ROMANA_TARZIE = 'Perioada romană târzie',
    PERIOADA_TIMPURIE_A_EPOCII_BRONZULUI = 'Perioada timpurie a epocii bronzului',
    PERIOADA_TARZIE_A_EPOCII_BRONZULUI = 'Perioada târzie a epocii bronzului',
    PERIOADA_TARZIE_A_EPOCII_BRONZULUI_HALLSTATT_A1 = 'Perioada târzie a epocii bronzului - Hallstatt A1',
    PERIOADA_TARZIE_A_EPOCII_BRONZULUI_HALLSTATT_TIMPURIU = 'Perioada târzie a epocii bronzului - Hallstatt timpuriu',
    PREISTORIE = 'Preistorie',
    TRACICA = 'Tracică'
}

// export enum NATURE_COMPOSITION {
//     Antimonit = 'Antimonit',
//     Aur = 'Aur',
//     CaSO4 = 'CaSO4',
//     Sb2S3 = 'Sb2S3',
//     Baritină = 'Baritină',
//     BaSO4 = 'BaSO4',
//     SiO2 = 'SiO2',
//     Sulfuri = 'Sulfuri',
//     Sulfați = 'Sulfați',
//     XS = 'XS'
// }
