import {HttpHeaders} from '@angular/common/http';

const HTTP_OPTIONS = {
    headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Headers': 'Accept, Origin, Content-Type, Referer'
    })
};

const ENDPOINT = 'http://localhost';
const PORT = '8090';
const CHO_ENDPOINT = `${ENDPOINT}:${PORT}/cho`;
const CHO_STATS_ENDPOINT = `${CHO_ENDPOINT}/stats`;
const MUSEUM_ENDPOINT = `${ENDPOINT}:${PORT}/museum`;

export {
    CHO_ENDPOINT,
    CHO_STATS_ENDPOINT,
    HTTP_OPTIONS,
    MUSEUM_ENDPOINT
};
