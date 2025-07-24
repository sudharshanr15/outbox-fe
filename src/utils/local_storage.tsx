'use client';

export function get_item(name: string){
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

export function get_user_accounts(){
    return get_item("users")
}


export async function add_user_account(user: string, pass: string){
    let current_users: string | null = localStorage.getItem("users");

    let new_val: {
        [key: string]: {
            "user": string,
            "pass": string
        }
    }
    if(current_users == null){
        new_val = {}
    }else{
        new_val = JSON.parse(current_users)
    }

    new_val[user] = {user, pass}

    localStorage.setItem("users", JSON.stringify(new_val));
}