import {Injectable} from '@angular/core';
import {geoJSON, Icon, LatLngTuple, Map, Marker, MarkerOptions, PointTuple} from 'leaflet';
import * as _ from 'lodash';

import {AtlasService} from './atlas.service';
import {EventsService} from 'src/app/views/atlas/events.service';
import {GeoLand} from 'src/app/shared/types/geolocation/GeoLand';
import {GeoLandCollection} from 'src/app/shared/types/geolocation/GeoLandCollection';
import {GeoJsonObject} from 'geojson';
import {MuseumSummary} from '../../shared/types/museum/MuseumSummary';

import {ENTITY_TYPE} from '../../shared/constants/entity.enum';
import {ICONS} from 'src/app/shared/constants/app.const';

@Injectable({
    providedIn: 'root',
})
export class LayersService {
    constructor(
        private atlasService: AtlasService,
        private eventsService: EventsService
    ) {}

    public addMarkers = (map: Map, entitiesSummaries: MuseumSummary[], entityType: ENTITY_TYPE) => {
        entitiesSummaries.forEach(entitySummary => {
            const location = [
                _.get(entitySummary, ['geolocation', 'latitude'], 0),
                _.get(entitySummary, ['geolocation', 'longitude'], 0)
            ] as LatLngTuple;

            this.addMarker(map, location, entitySummary, entityType);
        });
        this.atlasService.resetMarkersTo(map);
    };

    public addMarker = (map: Map, location: LatLngTuple, entitySummary: MuseumSummary, entityType: ENTITY_TYPE) => {
        const markerOptions: MarkerOptions = {
            county: entitySummary.county,
            icon: new Icon({
                iconUrl: ICONS.STANDARD,
                iconSize: [25, 41] as PointTuple,
                iconAnchor: [13, 41] as PointTuple
            })
        } as MarkerOptions;

        const marker: Marker = new Marker(location, markerOptions);
        this.eventsService.addMarkerEvents(marker, entitySummary, entityType);
        this.atlasService.addMarker(marker);
    };

    public getGeoLayers = (map: Map, collection: GeoLandCollection, entitiesSummaries: MuseumSummary[]) => {
        return _.get(collection, 'features', [])
            .map(county => this.getGeoLayer(map, county as GeoLand, entitiesSummaries));
    };

    public getGeoLayer = (map: Map, geoLand: GeoLand, entitiesSummaries: MuseumSummary[]) => {
        const geoJsonObject = geoLand.geometry as GeoJsonObject;
        // const counter = entitiesSummaries.filter(entity => entity.county === geoLand.properties.name).length;
        const options = {
            style: () => ({
                color: this.getColor(geoLand.properties.stats),
                fillColor: this.getColor(geoLand.properties.stats),
                fillOpacity: 0.6,
                opacity: 0.8,
                weight: 3
            })
        };

        const layer = geoJSON(geoJsonObject, options);
        this.eventsService.addLayerEvents(map, layer, geoLand, entitiesSummaries);

        return layer;
    };

    private getColor = (stats: object) => {
        const value = _.get(stats, ['museums', 0, 'total']) || 0;

        switch (true) {
            case value > 50: return '#002080';
            case value > 40: return '#002db3';
            case value > 30: return '#0039e6';
            case value > 20: return '#1a53ff';
            case value > 10: return '#4d79ff';
            case value > 5: return '#809fff';
            case value > 1: return '#b3c6ff';
            default: return '#e6ecff';
        }
    };
}
