import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HtmlService {
    public createAnchor = (text: string, id?: string, className?: string, link?: string) => {
        const anchor = document.createElement('a');
        if (id) {
            anchor.id = id;
        }
        if (link) {
            anchor.href = link;
            anchor.target = '_blank';
        }
        anchor.className = className
            ? [CLASS_NAME.CLICKABLE, className].join(' ')
            : [CLASS_NAME.CLICKABLE].join(' ');
        anchor.innerText = text;
        return anchor;
    };
}

export const CLASS_NAME = {
    CLICKABLE: 'clickable'
};
