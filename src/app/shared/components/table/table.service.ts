import {Injectable} from '@angular/core';
import {SortColumn, SortDirection} from './sortable.directive';
import {BehaviorSubject, debounceTime, delay, Observable, of, Subject, switchMap, tap} from 'rxjs';
import {DecimalPipe} from '@angular/common';

interface SearchResult {
    data: any[];
    total: number;
}

interface State {
    rawData: any[],
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: SortColumn;
    sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(data: any[], column: SortColumn, direction: string): any[] {
    if (direction === '' || column === '') {
        return data;
    } else {
        return [...data].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}

// function matches(country: Country, term: string, pipe: PipeTransform) {
//     return (
//         country.name.toLowerCase().includes(term.toLowerCase()) ||
//         pipe.transform(country.area).includes(term) ||
//         pipe.transform(country.population).includes(term)
//     );
// }

@Injectable({
    providedIn: 'root'
})
export class TableService {
    private _data$ = new BehaviorSubject<any[]>([]);
    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    private _total$ = new BehaviorSubject<number>(0);

    private _state: State = {
        rawData: [],
        page: 1,
        pageSize: 10,
        searchTerm: '',
        sortColumn: '',
        sortDirection: '',
    };

    constructor(private pipe: DecimalPipe) {
        this._search$
            .pipe(
                tap(() => this._loading$.next(true)),
                debounceTime(200),
                switchMap(() => this._search()),
                delay(200),
                tap(() => this._loading$.next(false)),
            )
            .subscribe((result) => {
                this._data$.next(result.data);
                this._total$.next(result.total);
            });

        this._search$.next();
    }

    get rawData() {
        return this._state.rawData;
    }
    get data$() {
        return this._data$.asObservable();
    }
    get loading$() {
        return this._loading$.asObservable();
    }
    get total$() {
        return this._total$.asObservable();
    }
    get page() {
        return this._state.page;
    }
    get pageSize() {
        return this._state.pageSize;
    }
    get searchTerm() {
        return this._state.searchTerm;
    }

    set rawData(rawData: Array<any>) {
        this._set({ rawData });
    }
    set page(page: number) {
        this._set({ page });
    }
    set pageSize(pageSize: number) {
        this._set({ pageSize });
    }
    set searchTerm(searchTerm: string) {
        this._set({ searchTerm });
    }
    set sortColumn(sortColumn: SortColumn) {
        this._set({ sortColumn });
    }
    set sortDirection(sortDirection: SortDirection) {
        this._set({ sortDirection });
    }

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    private _search(): Observable<SearchResult> {
        const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

        // 1. sort
        let data = sort(this._state.rawData, sortColumn, sortDirection);

        // // 2. filter
        // countries = data.filter((country) => matches(country, searchTerm, this.pipe));
        const total = data.length;

        // 3. paginate
        data = data.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

        return of({
            data,
            total
        });
    }
}
