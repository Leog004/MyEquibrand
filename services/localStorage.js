/*
    Leo Garza
    MyEquibrand 12-13-21

    *Goal - Permit the user to interact with persistent data.
     Example: When they return to a page, if they had selected filters. Those filters will remain in place.    

*/


// setting a local storage item with an expiration date.
// Can recieve three parameters, key[name], value, and time for the expiration
export const setLocalDataWithExpiry = (key, value, ttl) => {
    const now = new Date();

    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    };

    window.localStorage.setItem(key, JSON.stringify(item));
}

// This retrieves the local storage data by the key[name] it recieves. 
// If it is not expired it will return value, otherwise it will return null
export const getLocalDataWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);

    if(!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = new Date();

    if(now.getTime() > item.expiry){
        alert('Item is removed');
        localStorage.removeItem(key);
        return null;
    }

    return item.value;
}


// This function checks if it is a valid json, if so we will parse it so we can extract data
export const isJSON = (str) => {
    try {
        return (JSON.parse(str) && !!str)
    }catch(err){
        return false;
    }
}


/* 
    These functions are specifically for PAGE Products/index.js

    Goal: User will be given options to filter thr product page by brand or category. 
    Page State: These two functions will be called when the user loads the page in react hook useState(); if it has local storage data, it will use it; otherwise, it will be given the default filter, which is to show all products.
*/

export const hasLocalStorageCategory = () => {
    if (typeof window !== "undefined") {
        if (isJSON(window.localStorage.getItem('selectedCategory'))){
            return getLocalDataWithExpiry('selectedCategory') || 'All';
        }
    }

    return 'All'
}



export const hasLocalStorageBrand = (brands) => {
    if (typeof window !== "undefined") {
        if (isJSON(window.localStorage.getItem('selectedBrand'))){
            return getLocalDataWithExpiry('selectedBrand') || 'All';
        }else{
            return brands.length > 0 ? brands[0].brand : '';
        }   
    }

    return  brands.length > 0 ? brands[0].brand : '';
}