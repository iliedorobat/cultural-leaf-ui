import {BehaviorSubject, map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {MuseumDetails} from '../types/museum/MuseumDetails';
import {MuseumSummary} from '../types/museum/MuseumSummary';
import {CHO_ENDPOINT, HTTP_OPTIONS, MUSEUM_ENDPOINT} from './backend.const';
import {CHOFilter} from '../types/cho/CHOFilter';
import {CHOSummary} from '../types/cho/CHOSummary';
import {Counter} from '../types/Counter';
import {CHODetails} from '../types/cho/CHODetails';

@Injectable({
    providedIn: 'root'
})
export class BackendService {
    constructor(private http: HttpClient) {
        this.museumsSummariesSubscription(null);
        this.choCounterSubscription(null);
    }

    public museumsSummaries$: BehaviorSubject<MuseumSummary[]> = new BehaviorSubject<MuseumSummary[]>([]);
    // private _museumDetails$: BehaviorSubject<Museum> = new BehaviorSubject<Museum>({} as Museum);
    private _choCount$: BehaviorSubject<Counter> = new BehaviorSubject<Counter>({count: 0} as Counter);
    private _choDetails$: BehaviorSubject<CHODetails> = new BehaviorSubject<CHODetails>({} as CHODetails);
    private _chosSummaries$: BehaviorSubject<CHOSummary[]> = new BehaviorSubject<CHOSummary[]>([]);

    public retrieveChoCounter(payload: CHOFilter | null): Observable<Counter> {
        return this.http.post<Counter>(CHO_ENDPOINT + "?aggr=count", payload, HTTP_OPTIONS);
    }

    public getCHODetails(uri: string): Observable<CHODetails> {
        return this.http.get<CHODetails>(`${CHO_ENDPOINT}?uri=${uri}`, HTTP_OPTIONS);
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
            .subscribe((data: any) => {
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
                this.museumsSummaries$.next(data);
            });
    }

    public choDetilsSubscription(uri: string) {
        this.getCHODetails(uri)
            .subscribe((data: CHODetails) => {
                this._choDetails$.next(data);
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

    get chosSummaries$() {
        return this._chosSummaries$.asObservable();
    }
}
