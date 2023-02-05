import {Injectable, Injector} from '@angular/core';
import {GeoJSON, LatLng, Map, Marker, PointTuple, PopupOptions} from 'leaflet';
import * as _ from 'lodash';

import {AtlasService, MARKERS_STATUS} from './atlas.service';
import {BackendService} from '../../shared/services/backend.service';
import {HtmlService} from 'src/app/shared/services/html.service';
import {PopupService} from './popup.service';
import {StrService} from 'src/app/shared/services/str.service';

import {GeoLand} from 'src/app/shared/types/geolocation/GeoLand';
import {MarkerModalService} from './marker-modal/marker-modal.service';
import {MuseumSummary} from '../../shared/types/museum/MuseumSummary';
import {ENTITY_TYPE} from '../../shared/constants/entity.enum';

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    constructor(
        private atlasService: AtlasService,
        private backendService: BackendService,
        private htmlService: HtmlService,
        private injector: Injector,
        private modalService: MarkerModalService,
        private strService: StrService
    ) {}

    public addLayerEvents = (map: Map, layer: GeoJSON, geoLand: GeoLand, entitiesSummaries: MuseumSummary[]) => {
        const counter = entitiesSummaries.filter(entity => entity.county === geoLand.properties.name).length;

        this.bindLayerPopup(layer, geoLand, counter);
        this.onLayerMouseOver(layer);
        this.onLayerMouseOut(layer);
        this.onLayerClick(map, layer, geoLand, entitiesSummaries);
    };

    public addMapEvents = (map: Map) => {
        this.onMapClick(map);
    };

    public addMarkerEvents = (marker: Marker, entitySummary: MuseumSummary, entityType: ENTITY_TYPE) => {
        const title = this.getTitle(entitySummary, entityType) || "";

        this.bindMarkerPopup(marker, title, entitySummary);
        // this.onMarkerClick(marker, title, entitySummary);
    };

    private bindLayerPopup = (layer: GeoJSON, geoLand: GeoLand, counter: number) => {
        layer.bindPopup(myLayer => {
            return PopupService.getLayerPopupContent(geoLand, counter);
        });
    };

    private bindMarkerPopup = (marker: Marker, title: string, entitySummary: MuseumSummary) => {
        const options = {
            offset: [0, -31] as PointTuple
        } as PopupOptions;

        const content = this.createPopupContent(title, entitySummary);
        marker.bindPopup(content, options);
    };

    private onLayerClick = (map: Map, layer: GeoJSON, geoLand: GeoLand, entitiesSummaries: MuseumSummary[]) => {
        layer.addEventListener(EVENTS_TYPE.CLICK, () => {
            const county = _.get(geoLand, ['properties', 'name']);
            const locations = this.filterLocations(entitiesSummaries, county);
            this.atlasService.resetMarkersTo(map, locations);
        });
    };

    private filterLocations = (entitiesSummaries: MuseumSummary[], county: string) => {
        return entitiesSummaries
            .filter(entitySummary => {
                return this.strService.sanitizeString(entitySummary.county) === this.strService.sanitizeString(county)
                    && entitySummary.geolocation.latitude
                    && entitySummary.geolocation.longitude;
            })
            .map(entitySummary => new LatLng(entitySummary.geolocation.latitude, entitySummary.geolocation.longitude));
    };

    private onLayerMouseOver = (layer: GeoJSON) => {
        layer.addEventListener(EVENTS_TYPE.MOUSE_OVER, () => {
            layer.setStyle({
                fillOpacity: 0.8,
                opacity: 1
            });
        });
    };

    private onLayerMouseOut = (layer: GeoJSON) => {
        layer.addEventListener(EVENTS_TYPE.MOUSE_OUT, () => {
            layer.setStyle({
                fillOpacity: 0.6,
                opacity: 0.8
            });
        });
    };

    private onMapClick = (map: Map) => {
        map.addEventListener(EVENTS_TYPE.CLICK, () => {
            const markersStatus = this.atlasService.getMarkerStatus();
            const visibleStatus = [MARKERS_STATUS.DISPLAY_ALL, MARKERS_STATUS.DISPLAY_FILTERED];

            if (visibleStatus.indexOf(markersStatus) !== -1) {
                this.atlasService.removeMarkersFrom(map);
            } else if (markersStatus === MARKERS_STATUS.DISPLAY_NONE) {
                this.atlasService.resetMarkersTo(map);
            }
        });
    };

    private onMarkerClick = (marker: Marker, title: string, payload: MuseumSummary) => {
        marker.addEventListener(EVENTS_TYPE.CLICK, () => {
            this.modalService.openSummary(title, payload);
        });
    };

    public createMoreInfoLink = (title: string, entitySummary: MuseumSummary) => {
        const moreInfo = this.htmlService.createAnchor('More Info', 'more-info-link');

        moreInfo.addEventListener(EVENTS_TYPE.CLICK, () => {
            this.modalService.openSummary(title, entitySummary);
        });

        return moreInfo;
    };

    public createPopupContent = (title: string, entitySummary: MuseumSummary) => {
        const anchor = this.createMoreInfoLink(title, entitySummary);
        const content = document.createElement('div');
        content.innerText = title + '\n';
        content.appendChild(anchor);
        return content;
    };

    private getTitle = (payload: MuseumSummary, entityType: ENTITY_TYPE): string | undefined => {
        if (entityType === ENTITY_TYPE.MUSEUM) {
            return payload.name;
        }

        // TODO: add more conditions as you need
        return;
    }
}

export const EVENTS_TYPE = {
    CLICK: 'click',
    MOUSE_OVER: 'mouseover',
    MOUSE_OUT: 'mouseout'
};
