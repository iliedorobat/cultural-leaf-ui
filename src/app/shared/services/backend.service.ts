import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Museum} from '../types/museum/Museum';
import {MuseumSummary} from '../types/museum/MuseumSummary';
import {CHO_ENDPOINT, HTTP_OPTIONS, MUSEUM_ENDPOINT} from './backend.const';
import {SidebarCHOFilter} from '../../views/sidebar-filter/SidebarCHOFilter';
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
    public choCount$: BehaviorSubject<Counter> = new BehaviorSubject<Counter>({count: 0} as Counter);

    public retrieveChoCounter(payload: SidebarCHOFilter | any) {
        return this.http.post(CHO_ENDPOINT + "?aggr=count", payload, HTTP_OPTIONS);
    }

    public filterCHO(payload: SidebarCHOFilter | any) {
        return this.http.post<any>(CHO_ENDPOINT, payload, HTTP_OPTIONS);
    }

    public getMuseum(uri: string): Observable<Museum> {
        return this.http.post<Museum>(`${MUSEUM_ENDPOINT}?uri=${uri}`, null, HTTP_OPTIONS);
    }

    public getMuseums(payload: SidebarCHOFilter): Observable<MuseumSummary[]> {
        return this.http.post<MuseumSummary[]>(MUSEUM_ENDPOINT, payload, HTTP_OPTIONS);
    }

    private fetchMuseum(uri: string) {
        //
    }

    public choCounterSubscription(payload: SidebarCHOFilter | any) {
        this.retrieveChoCounter(payload)
            .subscribe((data: any) => {
                this.choCount$.next(data);
            });
    }

    public museumsSubscription(payload: SidebarCHOFilter | any) {
        this.getMuseums(payload)
            .subscribe((data: MuseumSummary[]) => {
                this.museumsSummaries$.next(data);
            });
    }
}
