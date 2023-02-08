// TODO: update accordingly to the backend response

export interface CHODetails {
    category: string[];         // dc:type
    description?: string[];     // dc:description
    fineness?: string[];        // odp:fineness
    id: string[];               // dc:identifier
    inventoryNumber: string;    // odp:inventoryNumber
    isRelatedTo?: string[];     // edm:isRelatedTo
    location?: string;          // edm:currentLocation // TODO:
    medium?: string[];          // dcterms:medium
    size?: string[];            // dbp:size
    subject?: string[];         // dc:subject
    summary?: string[];         // odp:overallDescription
    title: string[];            // dc:title
    type?: string[];            // edm:hasType
    wasPresentAt?: string[];    // edm:wasPresentAt
    weight?: string[];          // dbo:weight

    uri: string;                // edm:aggregatedCHO
}
