import {Injectable} from '@angular/core';

import {HtmlService} from './html.service';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor(public htmlService: HtmlService) {}

    public isValidHttp = (input: string): boolean => {
        const regex = new RegExp('^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$', 'i');
        return !!regex.exec(input);
    };

    // public createLink = (text: string, id?: string, className?: string, link?: string) => {
    //   const hyperlink = link || text;
    //   return this.isValidHttp(hyperlink)
    //     ? this.htmlService.createAnchor(text, id, className, hyperlink)
    //     : text;
    // };
}
