import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MuseumService {
    public isShowAllVisible: boolean = false;
    private showAll_aux: boolean = false;
    public showAll: boolean = false;

    setIsShowAllVisible = (isShowAllVisible: boolean) => {
        this.isShowAllVisible = isShowAllVisible;
    };

    toggleShowAll = () => {
        this.showAll_aux = this.showAll
            ? !this.showAll
            : !this.showAll_aux;
    };

    apply = () => {
        this.showAll = this.showAll_aux;
    };

    reset = () => {
        this.showAll_aux = false;
    };
}
