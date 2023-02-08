import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

import {MuseumDetails} from '../../types/museum/MuseumDetails';

import {CHODetails} from '../../types/cho/CHODetails';
import {ENTITY_TYPE} from '../../constants/entity.enum';

@Pipe({name: 'DetailsScreenSectionPipe'})
export class DetailsScreenSectionPipe implements PipeTransform {
    transform(input: CHODetails | MuseumDetails, entityType: ENTITY_TYPE, ...args: any[]): any {
        const section = prepareSectionPayload(input, entityType);

        return Object.entries(section)
            .map(([key, value]) => ({
                subtitle: key,
                value
            }));
    }
}

@Pipe({name: 'DetailsScreenSectionTitlePipe'})
export class DetailsScreenSectionTitlePipe implements PipeTransform {
    transform(titleKey: string, i18nPrefix: string, ...args: any[]): any {
        return `${i18nPrefix}.section.title.${titleKey}`;
    }
}

@Pipe({name: 'DetailsScreenSectionSubtitlePipe'})
export class DetailsScreenSectionSubtitlePipe implements PipeTransform {
    transform(subtitleKey: string, titleKey: string, i18nPrefix: string, ...args: any[]): any {
        return `${i18nPrefix}.section.subtitle.${titleKey}.${subtitleKey}`;
    }
}

@Pipe({name: 'DetailsScreenSectionValuePipe'})
export class DetailsScreenSectionValuePipe implements PipeTransform {
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

const prepareSectionPayload = (input: CHODetails | MuseumDetails, entityType: ENTITY_TYPE): object => {
    if (entityType === ENTITY_TYPE.MUSEUM) {
        // @ts-ignore
        return prepareMuseumSectionPayload(input);
    } else if (entityType === ENTITY_TYPE.CHO) {
        // @ts-ignore
        return prepareCHOSectionPayload(input);
    }
    return prepareDefaultSectionPayload(input);
}

const prepareDefaultSectionPayload = (details: object): object => Object.entries(details)
    .reduce((acc: any, [key, value]: any) => {
        acc[key] = value;

        return acc;
    }, {});

const prepareCHOSectionPayload = (choDetails: CHODetails): object => Object.entries(choDetails)
    .reduce((acc: any, [key, value]: any) => {
        acc[key] = value;

        return acc;
    }, {});

const prepareMuseumSectionPayload = (museumDetails: MuseumDetails): object => Object.entries(museumDetails)
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
