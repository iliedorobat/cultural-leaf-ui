const CHO_SECTIONS_ORDER = [
    'mainInfo',
    'details',
    'timespan',
    'features',
    'measurements'
];

const CHO_ITEMS_ORDER = [
    'details.comments',
    'details.description',
    'details.isRelatedTo',
    'details.obverseDescription',
    'details.reverseDescription',
    'details.subject',
    'details.summary',
    'details.usage',

    'features.biotope',
    'features.composition',
    'features.colour',
    'features.medium',
    'features.sealColour',
    'features.seam',
    'features.sex',
    'features.shape',

    'mainInfo.category',
    'mainInfo.id',
    'mainInfo.inventoryNumber',
    'mainInfo.location',
    'mainInfo.recordType',
    'mainInfo.state',
    'mainInfo.title',
    'mainInfo.type',
    'mainInfo.wasPresentAt',

    'measurements.baseDiameter',
    'measurements.carats',
    'measurements.conjugateDiameter',
    'measurements.diameter',
    'measurements.fineness',
    'measurements.handleDiameter',
    'measurements.height',
    'measurements.length',
    'measurements.maximalDiameter',
    'measurements.mouthDiameter',
    'measurements.sleeveWidth',
    'measurements.size',
    'measurements.thickness',
    'measurements.transverseDiameter',
    'measurements.weight',
    'measurements.width',

    'timespan.age',
    'timespan.created',
    'timespan.date',
    'timespan.found',
    'timespan.issued',
    'timespan.geologicalPeriod',
    'timespan.temporal'
];

const MUSEUM_SECTIONS_ORDER = [
    'mainInfo',
    'building',
    'collection',
    'description',
    'location',
    'publications'
];

const MUSEUM_ITEMS_ORDER = [
    'building.description',
    'building.lmiCode',

    'collection.category',
    'collection.importance',
    'collection.pictureList',
    'collection.profile',

    'contact.agent.name',
    'contact.agent.position',
    'contact.director',
    'contact.emailList',
    'contact.faxList',
    'contact.socialMediaList',
    'contact.phoneList',
    'contact.timetableList',
    'contact.virtualTourList',
    'contact.websiteList',

    'description.details',
    'description.historic',
    'description.summary',

    'location.access',
    'location.address',
    'location.administrative',
    'location.commune',
    'location.county',
    'location.geolocation.latitude',
    'location.geolocation.longitude',
    'location.geolocation.type',
    'location.locality.name',
    'location.locality.siruta',
    'location.postalCode',

    'mainInfo.accreditationList',
    'mainInfo.cimec',
    'mainInfo.cimecUriList',
    'mainInfo.entityType',
    'mainInfo.name',
    'mainInfo.founded',
    'mainInfo.partOf',
    'mainInfo.supervisedBy',
    'mainInfo.supervisorForList',

    'publications'
];

export {
    CHO_ITEMS_ORDER,
    CHO_SECTIONS_ORDER,
    MUSEUM_ITEMS_ORDER,
    MUSEUM_SECTIONS_ORDER
};
