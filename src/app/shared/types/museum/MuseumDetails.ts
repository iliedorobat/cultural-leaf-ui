import {Geolocation} from 'src/app/shared/types/geolocation/Geolocation';

export interface MuseumDetails extends Object {
    [index: string]: any;

    building?: Building;
    collection?: Collection;
    contact?: Contact;
    description?: Description;
    location?: Location;
    mainInfo: MainInfo;
    publications?: string[];
}

interface Agent {
    name: string;
    position?: string;
}

interface Building {
    description?: string;
    lmiCode?: string;
}

interface Collection {
    category?: string;
    importance?: string;
    pictureList?: string[];
    profile?: string;
}

interface Contact {
    agent?: Agent;
    director?: string;
    emailList?: string[];
    faxList?: string[];
    socialMediaList?: string[];
    phoneList?: string[];
    timetableList?: string[];
    virtualTourList?: string[];
    websiteList?: string[];
}

interface Description {
    details?: string;
    historic?: string;
    summary?: string;
}

interface Locality {
    name: string;
    siruta?: string;
}

interface Location {
    access?: string;
    address?: string;
    administrative?: string;
    commune?: string;
    county?: string;
    geolocation?: Geolocation;
    locality?: Locality;
    postalCode?: string;
}

interface MainInfo {
    accreditationList?: string[];
    cimc: string;
    cimecUriList: string[];
    entityType: string;
    name: string;
    founded?: string;
    partOf?: string;
    supervisedBy?: string;
    supervisorFor?: string[];
}
