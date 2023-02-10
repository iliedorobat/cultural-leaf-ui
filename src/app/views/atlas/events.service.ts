import {Injectable, Injector, NgZone} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GeoJSON, LatLng, Map, Marker, PointTuple, PopupOptions} from 'leaflet';
import {BehaviorSubject, Observable} from 'rxjs';
import * as _ from 'lodash';

import {AtlasService, MARKERS_STATUS} from './atlas.service';
import {BackendService} from '../../shared/services/backend.service';
import {DetailsScreenComponent} from '../../shared/screens/details-screen/details-screen.component';
import {GeoLand} from 'src/app/shared/types/geolocation/GeoLand';
import {HtmlService} from 'src/app/shared/services/html.service';
import {MuseumDetails} from '../../shared/types/museum/MuseumDetails';
import {MuseumSummary} from '../../shared/types/museum/MuseumSummary';
import {PopupService} from './popup.service';
import {StrService} from 'src/app/shared/services/str.service';

import {ENTITY_TYPE} from '../../shared/constants/entity.enum';
import {MUSEUM_SECTIONS_ORDER} from '../../shared/screens/details-screen/details-screen.const';

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    constructor(
        private atlasService: AtlasService,
        private backendService: BackendService,
        private htmlService: HtmlService,
        private injector: Injector,
        private modalService: NgbModal,
        private strService: StrService,
        private zone: NgZone
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
            this.openSummary(title, payload);
        });
    };

    public createMoreInfoLink = (title: string, entitySummary: MuseumSummary) => {
        const moreInfo = this.htmlService.createAnchor('More Info', 'more-info-link');

        moreInfo.addEventListener(EVENTS_TYPE.CLICK, () => {
            this.openSummary(title, entitySummary);
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

    private openSummary = (title: string | null, summary: MuseumSummary): void => {
        if (title || !_.isEmpty(summary)) {
            this.backendService.getMuseumDetails(summary.uri)
                .subscribe((museumPayload: MuseumDetails) => {
                    const modalRef = this.modalService.open(DetailsScreenComponent, {scrollable: true});
                    modalRef.componentInstance.entityType = museumPayload.mainInfo.entityType;
                    modalRef.componentInstance.i18nPrefix = 'markerModal';
                    modalRef.componentInstance.sections = MUSEUM_SECTIONS_ORDER;
                    modalRef.componentInstance.title = title;
                    modalRef.componentInstance.payload = museumPayload;
                });
        }
    };

    // private subject = new BehaviorSubject<ModalPayload>(this.payload);
    // public payload$: Observable<ModalPayload> = this.subject.asObservable();

    // private openModal = () => {
    //     this.zone.run(() => {
    //         this.dialog.open(DetailsScreenComponent, {
    //             data: this.payload,
    //             width: '30%',
    //             maxHeight: '80%'
    //         });
    //     });
    // };
}

export const EVENTS_TYPE = {
    CLICK: 'click',
    MOUSE_OVER: 'mouseover',
    MOUSE_OUT: 'mouseout'
};
