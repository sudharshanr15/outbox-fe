'use client';

import { get_item } from "./local_storage";

export function add_user_account(user: string, pass: string){
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