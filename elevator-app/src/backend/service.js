import { appFetch, config, setServiceToken } from './appFetch';

export const getFloors = (id, onSucess=console.log, onError) => {
    appFetch(`/elevator/${id}`, config('GET'), s => {
        onSucess(s.floors.sort((a,b) => b-a));
    }, onError);
}

export const sendPassword = (otp, floor, onSucess, onError) => {
    appFetch('/password', config('POST', {
        otp, floor
    }), onSucess, onError);
}

export const getOut = (floor, onSuccess, onError) => {
    appFetch('/getOut', config('POST', {
        floor
    }), onSuccess, onError);
}
export const getToken = (id, otp, onSucess=console.log, onError) => {
    appFetch(`/elevator/${id}/access`, config('POST', {otp}), ({token}) => {
        setServiceToken(token);
        onSucess(token);
    }, onError);
}
export const move = (floor, onSucess=console.log, onErrors) => {
    appFetch('/elevator/move',
        config('POST', {floor}),
        onSucess,
        onErrors)
}
