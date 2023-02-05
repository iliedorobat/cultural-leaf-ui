const SECTIONS_ORDER = ['mainInfo', 'building', 'collection', 'description', 'location', 'publications'];

const ITEMS_ORDER = [
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
    ITEMS_ORDER,
    SECTIONS_ORDER
};
