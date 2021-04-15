import {init} from './appFetch';
import {getToken, move, sendPassword, getOut} from './service';

export {default as NetworkError} from './NetworkError';

export default {init, getToken, move, sendPassword, getOut};