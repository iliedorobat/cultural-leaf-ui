import {BehaviorSubject, map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Museum} from '../types/museum/Museum';
import {MuseumSummary} from '../types/museum/MuseumSummary';
import {CHO_ENDPOINT, HTTP_OPTIONS, MUSEUM_ENDPOINT} from './backend.const';
import {CHOFilter} from '../types/cho/CHOFilter';
import {CHOSummary} from '../types/cho/CHOSummary';
import {Counter} from '../types/Counter';

@Injectable({
    providedIn: 'root'
})
export class BackendService {
    constructor(private http: HttpClient) {
        this.museumsSubscription(null);
        this.choCounterSubscription(null);
    }

    public museumsSummaries$: BehaviorSubject<MuseumSummary[]> = new BehaviorSubject<MuseumSummary[]>([]);
    private _choCount$: BehaviorSubject<Counter> = new BehaviorSubject<Counter>({count: 0} as Counter);
    private _chosSummaries$: BehaviorSubject<CHOSummary[]> = new BehaviorSubject<CHOSummary[]>([]);

    public retrieveChoCounter(payload: CHOFilter | any) {
        return this.http.post(CHO_ENDPOINT + "?aggr=count", payload, HTTP_OPTIONS);
    }

    public getCHOSummaries(payload: CHOFilter): Observable<any[]> {
        return this.http.post<CHOSummary[]>(CHO_ENDPOINT, payload, HTTP_OPTIONS);
    }

    public getMuseum(uri: string): Observable<Museum> {
        return this.http.post<Museum>(`${MUSEUM_ENDPOINT}?uri=${uri}`, null, HTTP_OPTIONS);
    }

    public getMuseums(payload: CHOFilter): Observable<MuseumSummary[]> {
        return this.http.post<MuseumSummary[]>(MUSEUM_ENDPOINT, payload, HTTP_OPTIONS);
    }

    private fetchMuseum(uri: string) {
        //
    }

    public choCounterSubscription(payload: CHOFilter | any) {
        this.retrieveChoCounter(payload)
            .subscribe((data: any) => {
                this._choCount$.next(data);
            });
    }

    public museumsSubscription(payload: CHOFilter | any) {
        this.getMuseums(payload)
            .subscribe((data: MuseumSummary[]) => {
                this.museumsSummaries$.next(data);
            });
    }

    public chosSubscription(payload: CHOFilter | any) {
        this.getCHOSummaries(payload)
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
