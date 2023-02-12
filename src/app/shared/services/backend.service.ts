import {BehaviorSubject, map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {MuseumDetails} from '../types/museum/MuseumDetails';
import {MuseumSummary} from '../types/museum/MuseumSummary';
import {CHOEventStats} from '../types/cho/stats/CHOEventStats';
import {CHOFilter} from '../types/cho/filter/CHOFilter';
import {CHOStatsFilter} from '../types/cho/stats/CHOStatsFilter';
import {CHOSummary} from '../types/cho/CHOSummary';
import {Counter} from '../types/Counter';
import {CHODetails} from '../types/cho/CHODetails';

import {CHO_ENDPOINT, CHO_STATS_ENDPOINT, HTTP_OPTIONS, MUSEUM_ENDPOINT} from './backend.const';
import {DATE_RANGES} from '../constants/filter.enum';
import {EVENT_TYPE} from '../constants/entity.enum';

@Injectable({
    providedIn: 'root'
})
export class BackendService {
    constructor(private http: HttpClient) {
        // this.museumsSummariesSubscription(); // get the list of all museums
        this.museumsSummariesSubscription(new CHOFilter()); // get the list of museums which hosts CHOs
        this.choCounterSubscription(null);
    }

    public _museumsSummaries$: BehaviorSubject<MuseumSummary[]> = new BehaviorSubject<MuseumSummary[]>([]);
    // private _museumDetails$: BehaviorSubject<Museum> = new BehaviorSubject<Museum>({} as Museum);
    private _choCount$: BehaviorSubject<Counter> = new BehaviorSubject<Counter>({count: 0} as Counter);
    private _choDetails$: BehaviorSubject<CHODetails> = new BehaviorSubject<CHODetails>({} as CHODetails);
    private _chosCollectingStats$: BehaviorSubject<CHOEventStats> = new BehaviorSubject<CHOEventStats>({} as CHOEventStats);
    private _chosFindingStats$: BehaviorSubject<CHOEventStats> = new BehaviorSubject<CHOEventStats>({} as CHOEventStats);
    private _chosProductionStats$: BehaviorSubject<CHOEventStats> = new BehaviorSubject<CHOEventStats>({} as CHOEventStats);
    private _chosSummaries$: BehaviorSubject<CHOSummary[]> = new BehaviorSubject<CHOSummary[]>([]);

    public retrieveChoCounter(payload: CHOFilter | null): Observable<Counter> {
        return this.http.post<Counter>(CHO_ENDPOINT + "?aggr=count", payload, HTTP_OPTIONS);
    }

    public getCHODetails(uri: string): Observable<CHODetails> {
        return this.http.get<CHODetails>(`${CHO_ENDPOINT}?uri=${uri}`, HTTP_OPTIONS);
    }
    public getCHOsStats(payload: CHOStatsFilter, eventType: EVENT_TYPE, timespanType: DATE_RANGES | null): Observable<CHOEventStats> {
        return this.http.post<CHOEventStats>(CHO_STATS_ENDPOINT + `?eventType=${eventType}&timespanType=${timespanType}`, payload, HTTP_OPTIONS);
    }

    public getCHOsSummaries(payload: CHOFilter): Observable<CHOSummary[]> {
        return this.http.post<CHOSummary[]>(CHO_ENDPOINT, payload, HTTP_OPTIONS);
    }

    public getMuseumDetails(uri: string): Observable<MuseumDetails> {
        return this.http.get<MuseumDetails>(`${MUSEUM_ENDPOINT}?uri=${uri}`, HTTP_OPTIONS);
    }

    public getMuseumsSummaries(payload: CHOFilter): Observable<MuseumSummary[]> {
        return this.http.post<MuseumSummary[]>(MUSEUM_ENDPOINT, payload, HTTP_OPTIONS);
    }

    public choCounterSubscription(payload: CHOFilter | null) {
        this.retrieveChoCounter(payload)
            .subscribe((data: Counter) => {
                this._choCount$.next(data);
            });
    }

    // public museumDetailsSubscription(uri: string) {
    //     this.getMuseumDetails(uri)
    //         .subscribe((data: Museum) => {
    //             this._museumDetails$.next(data);
    //         });
    // }

    public museumsSummariesSubscription(payload: CHOFilter | any) {
        this.getMuseumsSummaries(payload)
            .subscribe((data: MuseumSummary[]) => {
                this._museumsSummaries$.next(data);
            });
    }

    public choDetilsSubscription(uri: string) {
        this.getCHODetails(uri)
            .subscribe((data: CHODetails) => {
                this._choDetails$.next(data);
            });
    }

    public chosCollectingStatsSubscription(payload: CHOStatsFilter, timespanType: DATE_RANGES | null) {
        this.getCHOsStats(payload, EVENT_TYPE.COLLECTING, (timespanType || DATE_RANGES.CENTURY))
            .subscribe((data: CHOEventStats) => {
                this._chosCollectingStats$.next(data);
            });
    }

    public chosFindingStatsSubscription(payload: CHOStatsFilter, timespanType: DATE_RANGES | null) {
        this.getCHOsStats(payload, EVENT_TYPE.FINDING, (timespanType || DATE_RANGES.CENTURY))
            .subscribe((data: CHOEventStats) => {
                this._chosFindingStats$.next(data);
            });
    }

    public chosProductionStatsSubscription(payload: CHOStatsFilter, timespanType: DATE_RANGES | null) {
        this.getCHOsStats(payload, EVENT_TYPE.PRODUCTION, (timespanType || DATE_RANGES.CENTURY))
            .subscribe((data: CHOEventStats) => {
                this._chosProductionStats$.next(data);
            });
    }

    public chosSummariesSubscription(payload: CHOFilter | any) {
        this.getCHOsSummaries(payload)
            .subscribe((data: CHOSummary[]) => {
                this._chosSummaries$.next(data);
            });
    }

    get totalCHOs$() {
        return this._choCount$.asObservable().pipe(
            map(item => item.count)
        );
    }

    get chosCollectingStats$() {
        return this._chosCollectingStats$.asObservable();
    }

    get chosFindingStats$() {
        return this._chosFindingStats$.asObservable();
    }

    get chosProductionStats$() {
        return this._chosProductionStats$.asObservable();
    }

    get chosSummaries$() {
        return this._chosSummaries$.asObservable();
    }

    get museumsSummaries$() {
        return this._museumsSummaries$.asObservable();
    }
}
