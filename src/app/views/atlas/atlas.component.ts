import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgbOffcanvas, NgbOffcanvasOptions} from '@ng-bootstrap/ng-bootstrap';
import {GeoJSON, Layer, Map} from 'leaflet';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {SidebarCHOFilter} from '../sidebar-filter/SidebarCHOFilter';
import {SidebarFilterComponent} from '../sidebar-filter/sidebar-filter.component';
import {AtlasService} from './atlas.service';
import {BackendService} from '../../shared/services/backend.service';
import {EventsService} from './events.service';
import {LayersService} from './layers.service';
import {MarkerModalService} from './marker-modal/marker-modal.service';
import {ModalPayload} from '../../shared/types/ModalPayload';
import {MuseumSummary} from '../../shared/types/museum/MuseumSummary';

import {COUNTIES} from 'src/app/shared/constants/geo.const';
import {ENTITY_TYPE} from 'src/app/shared/constants/entity.enum';
import {BASE_LAYER, LAYERS, MAP_OPTIONS} from 'src/app/shared/constants/map.const';

const INITIAL_LAYERS_LENGTH = 1;

@Component({
    selector: 'lmap-atlas',
    templateUrl: './atlas.component.html',
    styleUrls: ['./atlas.component.scss']
})
export class AtlasComponent implements OnInit {
    constructor(
        private atlasService: AtlasService,
        private backendService: BackendService,
        private changeDetector: ChangeDetectorRef,
        private eventsService: EventsService,
        private layersService: LayersService,
        private markerService: MarkerModalService,
        private offcanvasService: NgbOffcanvas
    ) {}

    MAP_OPTIONS = MAP_OPTIONS;
    // private readonly destroying$ = new Subject();
    private map: Map;
    layers: Layer[] | GeoJSON[] = [BASE_LAYER];
    layersControl = {
        baseLayers: {
            [LAYERS.OPEN_STREET_MAP.BASE.name]: LAYERS.OPEN_STREET_MAP.BASE.layer,
            [LAYERS.OPEN_STREET_MAP.CYCLE.name]: LAYERS.OPEN_STREET_MAP.CYCLE.layer,
            [LAYERS.OPEN_STREET_MAP.LAND.name]: LAYERS.OPEN_STREET_MAP.LAND.layer,
            [LAYERS.OPEN_STREET_MAP.TRANSPORT.name]: LAYERS.OPEN_STREET_MAP.TRANSPORT.layer
        },
        overlays: {
            // GeoJSON: this.layerGeoJSON
        }
    };
    atlasFilter: SidebarCHOFilter = new SidebarCHOFilter();
    // private modalPayload: ModalPayload = new ModalPayload(null, {});
    // private modalPayload$: Observable<ModalPayload> = this.markerService.payload$.pipe(takeUntil(this.destroying$));

    ngOnInit(): void {
        // this.modalPayload$
        //   .subscribe(value => {
        //     this.modalPayload = value;
        //     this.changeDetector.markForCheck();
        //     this.changeDetector.detectChanges();
        //   });
    }

    onLayersChanges = (map: Map, museumsSummaries: MuseumSummary[]) => {
        if (this.layers.length > INITIAL_LAYERS_LENGTH) {
            this.layers = [BASE_LAYER];
        }

        const layers = this.layersService.getGeoLayers(map, COUNTIES, museumsSummaries);
        this.layers.push(...layers);
    }

    onMapReady(map: Map) {
        this.map = map;
        this.eventsService.addMapEvents(map);

        this.backendService.museumsSummaries$
            .subscribe((museumsSummaries: MuseumSummary[]) => {
                this.onLayersChanges(map, museumsSummaries);
                this.atlasService.resetMarkers(map);
                this.layersService.addMarkers(map, museumsSummaries, ENTITY_TYPE.MUSEUM);
            });
    }

    open() {
        // const options = {
        //     panelClass: 'atlas-filter',
        //     scroll: true
        // } as NgbOffcanvasOptions;
        const offcanvasRef = this.offcanvasService.open(SidebarFilterComponent);
        offcanvasRef.componentInstance.filter = this.atlasFilter;
        offcanvasRef.componentInstance.name = 'Atlas Filter';
    }

    // ngOnDestroy(): void {
    //   this.destroying$.next();
    //   this.destroying$.complete();
    // }
}
