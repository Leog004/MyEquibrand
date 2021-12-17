export const setLocalDataWithExpiry = (key, value, ttl) => {
    const now = new Date();

    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    };

    window.localStorage.setItem(key, JSON.stringify(item));
}

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


export const isJSON = (str) => {
    try {
        return (JSON.parse(str) && !!str)
    }catch(err){
        return false;
    }
}


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