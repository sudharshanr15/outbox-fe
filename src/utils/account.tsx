import { get_item } from "./local_storage";
import request from "./request";

export function add_user_account(user: string, pass: string){
    // let current_users: string | null = localStorage.getItem("users");

    // let new_val: {
    //     [key: string]: {
    //         "user": string,
    //         "pass": string
    //     }
    // }
    // if(current_users == null){
    //     new_val = {}
    // }else{
    //     new_val = JSON.parse(current_users)
    // }

    // new_val[user] = {user, pass}

    // localStorage.setItem("users", JSON.stringify(new_val));
}

export function get_user_accounts(){
    return get_item("users")
}

export function get_user_mails(user: string){
    let url: string = "http://localhost:5000"
    console.log("url: " + url)
    const path = "/mails/user/" + user

    url = url+path;

    return request({
        url    
    }).then(res => {
        return {
            "success": true,
            "data": res
        }
    }).catch(err => {
        return {
            "success": false,
            "error": err
        }
    })
}