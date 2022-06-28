import { SET_INFO_USER, UNSET_INFO_USER } from "./constant"

function getCookie(cname) {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

const initState = {
    accessToken: getCookie('accessToken'),
    right: +getCookie('right'),
    phone: getCookie('phone')
}

function reducer (state, action) {
    switch(action.type) {
        case SET_INFO_USER: {
            const {phone, right} = action.payload
            document.cookie = 'accessToken=true; max-age=9000';
            document.cookie = `phone=${phone}; max-age=9000`;
            document.cookie = `right=${right}; max-age=9000`;
            return {
                accessToken: true,
                phone,
                right
            }
        }

        case UNSET_INFO_USER: {
            document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
            document.cookie = 'phone=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
            document.cookie = 'right=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
            return {
                ...state,
                accessToken: false,
                right:''
            }

        }
    }
}

export {initState}
export default reducer