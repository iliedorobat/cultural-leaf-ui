import {Geolocation} from 'src/app/shared/types/geolocation/Geolocation';

export interface MuseumSummary {
    county: string;
    countyUri: string;
    geolocation: Geolocation;
    name: string;
    type: string;
    uri: string;
}
