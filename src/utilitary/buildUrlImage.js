import {BASE_URLIMAGE} from "../constants/base-url.js";

export const buildUrlImage = (path, size = 'w500/') => {
    return `${BASE_URLIMAGE}${size}${path}`;
}