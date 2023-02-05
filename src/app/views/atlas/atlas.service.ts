import {Injectable} from '@angular/core';
import {LatLng, Map, Marker} from 'leaflet';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class AtlasService {
    private markers: Array<Marker> = [];
    private markerStatus: string = MARKERS_STATUS.DISPLAY_ALL;

    public addMarker = (marker: Marker) => {
        this.markers.push(marker);
    };

    public resetMarkers = (map: Map) => {
        this.removeMarkersFrom(map);
        this.markers = [];
    }

    public setMarkerStatus = (markerStatus: string) => {
        this.markerStatus = markerStatus;
    };

    public getMarkerStatus = () => {
        return this.markerStatus;
    };

    public resetMarkersTo = (map: Map, filters: Array<LatLng> = []) => {
        this.removeMarkersFrom(map);

        const markers = filters.length === 0
            ? this.markers
            : this.markers.filter(marker => {
                const markerPos = marker.getLatLng();

                for (const pos of filters) {
                    if (_.isEqual(pos as LatLng, markerPos)) {
                        return true;
                    }
                }

                return false;
            });

        markers.forEach(marker => {
            marker.addTo(map);
        });

        this.setMarkerStatus(MARKERS_STATUS.DISPLAY_ALL);
    };

    public removeMarkersFrom = (map: Map) => {
        this.markers.forEach(marker => {
            marker.removeFrom(map);
        });
        this.setMarkerStatus(MARKERS_STATUS.DISPLAY_NONE);
    };
}

export const MARKERS_STATUS = {
    DISPLAY_ALL: 'all',
    DISPLAY_NONE: 'none',
    DISPLAY_FILTERED: 'filtered'
};
