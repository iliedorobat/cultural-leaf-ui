import {GeoLand} from './GeoLand';

export interface GeoLandCollection {
    type: string;
    features: Array<GeoLand>;
}
