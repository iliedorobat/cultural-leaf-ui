export interface GeoLandProperty {
    id: string;
    areaType: GeoLandProperty.AreaTypeEnum;
    code: string;
    countryCode: string;
    countryName: string;
    label: string;
    name: string;
    stats: object;
    uri: string;
}

export namespace GeoLandProperty {
    export type AreaTypeEnum = 'country' | 'county';
    export const AreaTypeEnum = {
        Country: 'country' as AreaTypeEnum,
        County: 'county' as AreaTypeEnum
    };
}
