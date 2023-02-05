import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({name: 'MuseumPayloadPipe'})
export class MarkerModalMuseumPayloadPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        return null;
    }
}

@Pipe({name: 'SectionPipe'})
export class MarkerModalSectionPipe implements PipeTransform {
    transform(input: object, ...args: any[]): any {
        const section = prepareSectionPayload(input);

        return Object.entries(section)
            .map(([key, value]) => ({
                subtitle: key,
                value
            }));
    }
}

@Pipe({name: 'SectionTitlePipe'})
export class MarkerModalSectionTitlePipe implements PipeTransform {
    transform(titleKey: string, ...args: any[]): any {
        return `markerModal.section.title.${titleKey}`;
    }
}

@Pipe({name: 'SectionSubtitlePipe'})
export class MarkerModalSectionSubtitlePipe implements PipeTransform {
    transform(subtitleKey: string, titleKey: string, ...args: any[]): any {
        return `markerModal.section.subtitle.${titleKey}.${subtitleKey}`;
    }
}

@Pipe({name: 'SectionValuePipe'})
export class MarkerModalSectionValuePipe implements PipeTransform {
    constructor(private domSanitizer: DomSanitizer) {}

    transform(value: string, ...args: any[]): any {
        if (Array.isArray(value)) {
            const template = value
                .map(generateUriTemplate)
                .join('</br>');

            return this.domSanitizer.bypassSecurityTrustHtml(template);
        }

        return generateUriTemplate(value);
    }
}

const generateUriTemplate = (value: any) => {
    if (typeof value === 'string' && value.startsWith('http')) {
        return `<a href="${value}" target="_blank">${value}</a>`;
    }

    return value;
};

const prepareSectionPayload = (input: object): object => Object.entries(input)
    .reduce((acc: any, [key, value]: any) => {
        if (key === 'geolocation') {
            acc.geolocation = `${value.latitude}, ${value.longitude}`;
        } else if (key === 'locality') {
            acc['locality.name'] = value.name;
            acc['locality.siruta'] = value.siruta;
        } else {
            acc[key] = value;
        }

        return acc;
    }, {});
