// TODO: add edm:hasType
export interface CHOSummary {
    [index: string]: any;

    category: string;           // dc:type
    inventoryNumber: string;    // odp:inventoryNumber
    location: string;           // edm:currentLocation // TODO:
    summary: string;            // odp:overallDescription
    title: string;              // dc:title

    uri: string;                // edm:aggregatedCHO
}
