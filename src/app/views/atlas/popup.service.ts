import {Injectable} from '@angular/core';
import * as _ from 'lodash';

import {GeoLand} from 'src/app/shared/types/geolocation/GeoLand';

@Injectable({
    providedIn: 'root'
})
export class PopupService {
    public static getLayerPopupContent = (geoLand: GeoLand, counter: number) => {
        // TODO: backend values
        const countyName = _.get(geoLand, ['properties', 'name'], '');
        const areaType = _.get(geoLand, ['properties', 'areaType'], '');
        const auxVerb = counter === 1 ? 'is' : 'are';
        const object = counter === 1 ? 'museum' : 'museums';

        return `There ${auxVerb} ${counter} ${object} in ${countyName} ${areaType}`;
    };
}
