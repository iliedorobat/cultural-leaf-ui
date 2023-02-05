import {Geometry} from 'geojson';
import {GeoLandProperty} from './GeoLandProperty';

export interface GeoLand {
    type: string;
    geometry: Geometry;
    properties: GeoLandProperty;
}
