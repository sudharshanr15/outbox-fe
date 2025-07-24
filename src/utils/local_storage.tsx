'use client';

export async function get_item(name: string){
    let result = localStorage.getItem(name);
    
    if(result != null){
        return {
            "success": true,
            "data": JSON.parse(result)
        }
    }

    return {
        "success": false
    }
}

export async function set_item(key: string, value: string){
    localStorage.setItem(key, value);

    return {
        "success": true
    }
}