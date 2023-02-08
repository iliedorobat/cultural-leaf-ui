// TODO: update accordingly to the backend response

export interface CHODetails extends Object {
    [index: string]: any;
    details: Details;
    features: Features;
    mainInfo: MainInfo;
    measurements: Measurements;
    timespan: Timespan;
}

interface Details {
    comments: Entity[];             // odp:comments
    description: Entity[];          // dc:description
    isRelatedTo: Entity[];          // edm:isRelatedTo
    obverseDescription: Entity[];   // odp:obverseDescription
    reverseDescription: Entity[];   // odp:reverseDescription
    subject: Entity[];              // dc:subject
    summary: Entity[];              // odp:overallDescription
    usage: Entity[];                // odp:use
}

interface Features {
    biotope: Entity[];              // odp:biotope
    composition: Entity[];          // odp:chemicalComposition
    colour: Entity[];               // dbo:colourName
    medium: Entity[];               // dcterms:medium
    sealColour: Entity[];           // odp:sealColour
    seam: Entity[];                 // odp:seam
    sex: Entity[];                  // dbo:sex
    shape: Entity[];                // odp:form
}

interface MainInfo {
    category: Entity[];             // dc:type
    id: Entity[];                   // dc:identifier
    inventoryNumber: string;        // odp:inventoryNumber
    location: string;               // edm:currentLocation // TODO:
    recordType: string;             // edm:type
    state: Entity[];                // odp:displayState
    title: Entity[];                // dc:title
    type: Entity[];                 // edm:hasType
    wasPresentAt: Entity[];         // edm:wasPresentAt

    hasMet: Entity[];               // edm:hasMet
    uri: string;
}

interface Measurements {
    baseDiameter: Entity[];          // odp:basediameter
    carats: Entity[];                // odp:carats
    conjugateDiameter: Entity[];     // odp:conjugatediameter
    diameter: Entity[];              // dbo:diameter
    fineness: Entity[];              // odp:fineness
    handleDiameter: Entity[];        // odp:handlediameter
    height: Entity[];                // dbo:height
    length: Entity[];                // dbo:length
    maximalDiameter: Entity[];       // odp:maximaldiameter
    mouthDiameter: Entity[];         // odp:mouthdiameter
    sleeveWidth: Entity[];           // odp:sleevewidth
    size: Entity[];                  // dbo:size
    thickness: Entity[];             // odp:thickness
    transverseDiameter: Entity[];    // odp:transversediameter
    weight: Entity[];                // dbo:weight
    width: Entity[];                 // dbo:width
}

interface Timespan {
    age: Entity[];                   // odp:age
    created: Entity[];               // dcterms:created
    date: Entity[];                  // dc:date
    found: Entity[];                 // odp:found
    issued: Entity[];                // dcterms:issued
    geologicalPeriod: Entity[];      // odp:geologicalPeriod
    temporal: Entity[];              // dcterms:temporal
}

interface Entity {
    value: string;
    lang: string;
    type: string;
}
